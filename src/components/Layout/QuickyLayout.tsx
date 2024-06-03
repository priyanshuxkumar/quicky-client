"use client";

import {useCallback, useEffect, useMemo, useRef, useState } from "react";

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
  ImagePlus
} from "lucide-react";
import Link from "next/link";

import axios from "axios";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import MessageCard from "../MessageCard";
import Image from "next/image";
import { useRouter} from "next/navigation";

import toast from "react-hot-toast";
import {
  useCurrentUser,
  useFetchChatMessages,
} from "../../../hooks/user";
import { Message, SendMessageInput, User } from "../../../gql/graphql";
import { useChatContext } from "@/context/ChatContext";
import Menu from "../Menu";
import { graphqlClient } from "../../../clients/api";
import { sendMessageMutation } from "../../../graphql/mutation/chat";
import Loading from "@/app/loading";
import Logout from "../Logout";
import { getSignedUrlOfChatQuery } from "../../../graphql/query/chat";

import socket from "@/lib/socket";
import UserProfileContainer from "../UserProfileContainer";

interface QuickySidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

interface QuickyLayoutProps {
  children: React.ReactNode;
}

export const QuickyLayout: React.FC<QuickyLayoutProps> = (props) => {
  const {user } = useCurrentUser();

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
        link: `#`,
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

  const [isMessageSending , setIsMessageSending] = useState(false);

  //Message Code Starts Here
  const { selectedChatId, isChatBoxOpen, recipientUser , setIsChatBoxOpen}: any = useChatContext();
 
  // console.log("sel" , selectedChatId,"rec" ,  recipientUser?.id)

  // const openChat = useFetchChatMessages( selectedChatId , recipientUser?.id ) ;
  const { chatMessages } = useFetchChatMessages( selectedChatId , recipientUser?.id) ;

  // console.log("openchat" , openChat)
  const [messageContent, setMessageContent] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  //Send Image On chat as message
  const [imageURL , setImageURL] = useState('')

  //Get image file for sending
  const handleInputChangeFile = useCallback((input: HTMLInputElement)=> {
      return async(event:Event) => {
        event.preventDefault()

        const file:File | undefined | null |string = input.files?.item(0)
        if(!file)return

        const {getSignedUrlOfChat} = await graphqlClient.request( getSignedUrlOfChatQuery,{ 
          imageName: file.name,
          imageType: file.type
          }
        );

        if(getSignedUrlOfChat){
          toast.loading("Uploading Image...", { id: "1" });
          await axios.put(getSignedUrlOfChat , file , {
            headers: {
              'Content-Type': file.type
            }
          })
          toast.success('Send successfully' , {id: '1'})
          const url = new URL(getSignedUrlOfChat)
          const myFilePath = `${url.origin}${url.pathname}`
          setImageURL(myFilePath)
        }
      }
  },[]);


  //Handle select Image -
  const handleSelectImage = useCallback(()=>{
      const input = document.createElement('input')
      input.setAttribute('type' , 'file')
      input.setAttribute('accept' , 'image/*')

      const handlerFn = handleInputChangeFile(input)
      input.addEventListener('change' , handlerFn)

      input.click()
  },[handleInputChangeFile])

  useEffect(() => {
    if (chatMessages || recipientUser) {
      setMessages(chatMessages);
    }else {
      setMessages([]); // Ensure messages are reset if no chat messages are present
    }
  }, [chatMessages , selectedChatId , recipientUser]);

  //SocketIO
  useEffect(() => {
    socket.on('receivedMessage', (newMessage) => {
      if(newMessage?.chatId != selectedChatId) {
        // TODO - Give Notification
        // toast.success(`New Message ${newMessage?.content}`, {id: '1'})
      };
      
      if(newMessage?.chatId === selectedChatId){
      setMessages((prevMessages) => {
        if (!prevMessages) {
          return [newMessage];
        } else {
          return [...prevMessages, newMessage];
        }
      });
    }

    });
    return () => {
      socket.off('receivedMessage');
    };
  }, [selectedChatId , messages]);

  //Typing Implementation
  const [isTyping, setIsTyping] = useState(false);

  const [typingIndicator, setTypingIndicator] = useState('');

  useEffect(() => {
    // Listen for typing events
    socket.on('typing', (data) => {
      setTypingIndicator(`${data?.username} is typing...`);
    });

    // Listen for stop typing events
    socket.on('stop typing', () => {
      setTypingIndicator('');
    });

    // Cleanup on component unmount
    return () => {
      socket.off('typing');
      socket.off('stop typing');
    };
  }, []);

  
  //Message Content onChange
  let typingTimeout:any
  const handleMessageContentOnChange = (e:any) => {
      setMessageContent(e.target.value);
      if(!isTyping){
        setIsTyping(true)
        socket.emit("typing" , {username: recipientUser?.username})
      }
      clearTimeout(typingTimeout)
      typingTimeout = setTimeout(()=> {
        socket.emit("stop typing", {username: recipientUser?.username})
        setIsTyping(false)
      },5000)
  };

  const handleSendMessage = async(e: { preventDefault: () => void }) => {
    setIsMessageSending(true)
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
      setIsMessageSending(false)
    } catch (error) {
      console.error("Error occured while login:", error);
      setIsMessageSending(false)
      setMessageContent('')
    }
  };

  //Handle Message Component Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMessageMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Recipient User Info Container 
  const [isUserInfoContainerActive , setIsUserInfoContainerActive] = useState(false);
  const handleUserInfoContainer = () => {
    setIsUserInfoContainerActive(!isUserInfoContainerActive);
  };

  

    //Scroll to bottom when chat willopen
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView( {behavior: 'smooth'} );
    };

    scrollToBottom();
  }, [messages , typingIndicator]);

  

   //Logout page Open/Close state
   const [isLogoutPageOpen , setIsLogoutPageOpen] = useState(false);
   const handleLogoutPageOpenState = ()=> {
     setIsLogoutPageOpen(!isLogoutPageOpen)
   };
 
   //Logout Fn
   const handleLogout = () => {
     toast.loading("Logging out...", { id: "2" });
     localStorage.removeItem("__token__");
     toast.success("Logout successfull...", { id: "2" });
     router.push("/");
     setIsChatBoxOpen(false)
   };
  return (
    <>
    <div className="whole-page grid grid-cols-12 h-screen w-screen bg-[#F7FAFC] dark:bg-black overflow-hidden">
      {/* Column 1 */}
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
            onClick={handleLogoutPageOpenState}
            className="bg-red-600 p-2 rounded-full cursor-pointer"
          >
            <CirclePower className="text-3xl text-white" />
          </div>
        </div>
      </div>

      {/* Mid Column */}
      <div
        className={`main col-span-12 ${
          isChatBoxOpen && "hidden"
        } sm:inline sm:col-span-4 px-4 border-l-[0.5px] border-gray-300 dark:border-gray-800 h-screen`}
      >
        {props.children}
      </div>
      
      {/* Column 3 */}
      <div className={`${ isChatBoxOpen ? "inline col-span-12" : "hidden"} sm:inline sm:col-span-7 h-screen ${isUserInfoContainerActive  && "sm:flex"}`}>
        {isChatBoxOpen && (
          <>
          <div className="h-screen w-full">
            <div className="sticky left-0 top-0 right-0 z-10 bg-transparent">
              <div className="flex justify-between items-center border-gray-200 dark:border-gray-800 px-4 py-1 border-b-[1px] mx-4 dark:bg-black bg-opacity-50 backdrop-filter backdrop-blur-md">
                <div className="flex gap-2 items-center">
                  <Link href={"/chats"} className="inline sm:hidden mr-2">
                    <div className="cursor-pointer">
                      <ChevronLeft
                        size={24}
                        className="text-black dark:text-white"
                      />
                    </div>
                  </Link>
                  <div onClick={handleUserInfoContainer} className="w-14 h-14 flex flex-col justify-center cursor-pointer">
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

            {/* Render Chat Messages  */}
            <div  className="px-12 h-[82%] overflow-y-scroll scrollbar-style">
              {messages &&
                messages?.map((msg) => (
                  <MessageCard
                  key={msg?.id}
                  data={msg as Message}
                  />
                )) 
              }
              {/* : (<div className="w-full h-full flex justify-center items-center"><Loading size={40}/></div>) */}

              <span className="text-sm p-2 dark:text-white text-black italic">{typingIndicator}</span>
              <div ref={messagesEndRef}/>
            </div>

            <div className="mx-12 message-input bg-slate-200 rounded-xl px-2 dark:bg-[#212121]">
              <form onSubmit={handleSendMessage}>
                <div className="flex sm:min-h-[56px] items-center">
                  <div className="w-full flex gap-4 items-center justify-between">
                    <div className="w-full px-3 flex items-center rounded-xl ">
                      <div className="w-[97%]">
                        <textarea rows={2}
                          required={true}
                          onChange={handleMessageContentOnChange}
                          // onChange={(e) => setMessageContent(e.target.value)}
                          className="w-full bg-transparent resize-none flex px-1 text-sm placeholder:text-gray-600 dark:placeholder:text-white/70 focus:outline-none"
                          placeholder="Message!"
                          value={messageContent}
                        ></textarea>
                      </div>

                      <div className="w-[3%]">
                          <ImagePlus onClick={handleSelectImage} size={20} className="dark:text-gray-200 text-gray-600 cursor-pointer"/>
                      </div> 

                    </div>
                    <button
                      disabled={!messageContent}
                      type="submit"
                      className=" p-2 rounded-full cursor-pointer"
                    >
                      {isMessageSending ? <Loading size={24}/> : <SendHorizontal className="text-[#3290EC] text-[1.6rem]" />}
                      
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {isUserInfoContainerActive &&
            <div className="user-info-container sidebar w-2/3 dark:bg-[#212121]">
              <UserProfileContainer handleUserInfoContainer={handleUserInfoContainer} user={recipientUser as User}/>
            </div>
          }

          </>
        )}
      </div>

    </div>

    {/* Logout Page  */}
    {isLogoutPageOpen && 
    <div className="w-full h-full bg-[#262626] fixed top-0 left-0 flex justify-center items-center">
      <Logout handleLogout = {handleLogout} handleLogoutPageOpenState={handleLogoutPageOpenState}/>
    </div>
    }
    </>
  );
};


//Send Message Function
export const sendMessageFn = async (payload:SendMessageInput) => {
    try {
      const response = await graphqlClient.request(sendMessageMutation, { payload});
      return response.sendMessage as Message;
    } catch (error) {
      console.error("Error occured while sending message", error);
       return null;
    }
};