"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";

import {
  CircleUserRound,
  Bolt,
  MessageSquare,
  CirclePower,
  SendHorizontal,
  Search,
  Phone,
  EllipsisVertical,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import MessageCard from "../MessageCard";
import Image from "next/image";
import { useRouter} from "next/navigation";

import toast from "react-hot-toast";
import {
  useCurrentUser,
  useFetchChatMessages,
} from "../../../hooks/user";
import { Message, SendMessageInput } from "../../../gql/graphql";
import { useChatContext } from "@/context/ChatIdContext";
import Menu from "../Menu";
import socket from "@/lib/socket";
import { graphqlClient } from "../../../clients/api";
import { sendMessageMutation } from "../../../graphql/mutation/chat";
import Loading from "@/app/loading";


interface QuickySidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

interface QuickyLayoutProps {
  children: React.ReactNode;
}

export const QuickyLayout: React.FC<QuickyLayoutProps> = (props) => {
  const { user } = useCurrentUser();

  const router = useRouter();

  const sidebarMenuItems: QuickySidebarButton[] = useMemo(
    () => [
      {
        title: "Chats",
        icon: <MessageSquare />,
        link: "/chats",
      },
      {
        title: "Search",
        icon: <Search />,
        link: `/search`,
      },
      {
        title: "Setting",
        icon: <Bolt />,
        link: "/setting",
      },
      {
        title: "Profile",
        icon: <CircleUserRound />,
        link: `u/${user?.username}`,
      },
    ],
    [user?.username]
  );

  const handleLogout = () => {
    toast.loading("Logging out...", { id: "2" });
    localStorage.removeItem("__token__");
    toast.success("Logout successfull...", { id: "2" });
    router.push("/");
  };

  //Message Code Starts Here
  const { selectedChatId, isChatBoxOpen, recipientUser }: any = useChatContext();
  const openChat = useFetchChatMessages(selectedChatId);

  const [messageContent, setMessageContent] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);


    // -------------------------------

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      // Scroll to bottom when new messages arrive
      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView( {behavior: 'smooth'} );
      };
  
      scrollToBottom();
    }, [messages]);

    // -------------------------------

  useEffect(() => {
    if (openChat.chatMessages) {
      setMessages(openChat?.chatMessages);
    }
  }, [openChat.chatMessages]);

  
  useEffect(() => {
    socket.on('receivedMessage', (newMessage) => {
      setMessages((prevMessage) => [...prevMessage, newMessage.sendMessage]);
    });
    return () => {
      socket.off('receivedMessage');
    };
  }, [messages]);

  const handleSendMessage = async(e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (messageContent.trim() === '') {
      toast.error('Message cannot be empty');
      return;
    }
    try {
      const variables = {
        chatId: selectedChatId || null,
        content: messageContent,
        recipientId: recipientUser?.id,
      };
      const response = await sendMessageFn(variables)
      if(response){
        socket.emit("sendMessage", response);
      }else{
        toast.error("Error sending message");
      }
      setMessageContent("");
    } catch (error) {
      console.error("Error occured while login:", error);
    }
  };

  //Handle Message Component Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMessageMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="whole-page grid grid-cols-12 h-screen w-screen bg-[#F7FAFC] dark:bg-black overflow-hidden">
      <div className="sidebar hidden sm:inline sm:col-span-1 relative ">
        <div className="flex flex-col justify-between items-center h-full py-12">
          <div className="flex flex-col items-center">
            {user && user?.avatar && (
              <Image
                priority={false}
                className="inline-block h-12 w-12 rounded-full ring-1 ring-black dark:ring-white ring-offset-1"
                src={user?.avatar}
                alt="avatar"
                height={20}
                width={20}
              />
            )}
            <span className="flex flex-col mt-2">
              <span className="text-xs font-medium text-gray-900 dark:text-white">
                {user?.firstname}
              </span>
            </span>
          </div>

          <div>
            <ul className="flex flex-col justify-center items-center">
              {sidebarMenuItems.map((item) => (
                <li key={item.title}>
                  <Link
                    className="flex justify-start items-center gap-2 my-3 cursor-pointer rounded-full px-4 py-2"
                    href={item?.link}
                  >
                    <span className="transition duration-500 text-3xl hover:bg-white hover:dark:bg-[#303030] hover:ring-1 ring-black ring-offset-2 rounded-full p-2">
                      {item.icon}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            onClick={handleLogout}
            className="bg-red-600 p-2 rounded-full cursor-pointer"
          >
            <CirclePower className="text-3xl text-white" />
          </div>
        </div>
      </div>

      <div
        className={`main col-span-12 ${
          isChatBoxOpen && "hidden"
        } sm:inline sm:col-span-4 px-4 border-l-[0.5px] border-gray-300 dark:border-gray-800 h-screen`}
      >
        {props.children}
      </div>

      <div className={`${ isChatBoxOpen ? "inline col-span-12" : "hidden"} sm:inline sm:col-span-7 h-screen`}>
        {isChatBoxOpen && (
          <>
            <div className="sticky left-0 top-0 right-0 z-10 bg-transparent">
              <div className="flex justify-between items-center border-gray-200 dark:border-gray-800 px-4 py-1 border-b-[1px] mx-4 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md">
                <div className="flex gap-2 items-center">
                  <Link href={"/chats"} className="inline sm:hidden mr-2">
                    <div className="cursor-pointer">
                      <ChevronLeft
                        size={24}
                        className="text-black dark:text-white"
                      />
                    </div>
                  </Link>
                  <div className="w-14 h-14 flex flex-col justify-center">
                    <Avatar>
                      <AvatarImage
                        src={recipientUser?.avatar}
                        alt="user avatar"
                      />
                    </Avatar>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex gap-1">
                      <h5 className="text-[15px] font-medium">
                        {recipientUser?.firstname}{" "}
                      </h5>
                    </div>
                    <div>
                      {selectedChatId &&
                        recipientUser?.isActive && ( // if the chat with new user then user can't see online badge
                          <p className="text-sm text-gray-600">Online</p>
                        )}
                    </div>
                  </div>
                </div>

                <div className="icons flex gap-4">
                  <div className="transition duration-500 hover:bg-slate-100 dark:hover:bg-[#303030] rounded-full p-2 cursor-pointer">
                    <Phone size={20} />
                  </div>
                  <div
                    onClick={handleMessageMenu}
                    className="transition duration-500 ease-in-out hover:bg-slate-100 dark:hover:bg-[#303030] rounded-full p-2 cursor-pointer"
                  >
                    <EllipsisVertical size={20} />
                  </div>
                  {isMenuOpen && <Menu />}
                </div>
              </div>
            </div>

            <div className="px-12 h-[80%] overflow-y-scroll scrollbar-style">
            <Suspense fallback={<Loading/>}>
              {messages &&
                messages?.map((msg) => (
                  <MessageCard
                  key={msg?.id}
                  data={msg as Message}
                  />
                ))}
            </Suspense>
            <div ref={messagesEndRef}/>
            </div>

            <div className="mx-12 message-input sticky bottom-0 dark:bg-black">
              <form onSubmit={handleSendMessage}>
                <div className="flex sm:min-h-[56px] items-center">
                  <div className="w-full flex gap-4 items-center justify-between">
                    <div className="w-full">
                      <textarea
                        onChange={(e) => setMessageContent(e.target.value)}
                        className="resize-none align-middle flex sm:min-h-12 w-full bg-white dark:bg-[#303030] rounded-2xl px-8 py-3 text-sm placeholder:text-gray-600 dark:placeholder:text-white/70 focus:outline-none"
                        placeholder="Write your message!"
                        value={messageContent}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="bg-[#3290EC] p-3 rounded-full"
                    >
                      <SendHorizontal className="text-white text-[1.6rem]" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};


export const sendMessageFn = async (payload:SendMessageInput) => {
    try {
      const response = await graphqlClient.request(sendMessageMutation, { payload});
      return response;
    } catch (error) {
      console.error("Error occured while sending message", error);
       return null;
    }
};