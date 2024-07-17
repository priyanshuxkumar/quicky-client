"use client";

import {useCallback, useEffect, useMemo, useRef, useState } from "react";
import { format } from 'date-fns';
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
import { usePathname } from "next/navigation";
import axios from "axios";
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
import Loading from "@/components/loading";
import Logout from "../Logout";
import { getSignedUrlOfChatQuery } from "../../../graphql/query/chat";

import socket from "@/lib/socket";
import UserProfileContainer from "../UserProfileContainer";
import React from "react";
import { groupMessagesByDate } from "@/config/TimeServices";
import SendButton from "../Button";
import { sendMessage } from "@/helpers/sendMessage";
import PopupSendMedia from "../PopupSendMedia";

interface QuickySidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

interface QuickyLayoutProps {
  children: React.ReactNode;
}

interface GroupedMessages {
  [date: string]: Message[];
};

export const QuickyLayout: React.FC<QuickyLayoutProps> = (props) => {
  const { user } = useCurrentUser();
  
  useEffect(()=> {
    socket.emit("setup", user?.id);
  },[user?.id])

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

  //route
  const pathname = usePathname();
  
  const [isMessageSending , setIsMessageSending] = useState(false);
  // const [isMediaSending , setIsMediaSending] = useState(false);

  //Message Code Starts Here
  const { selectedChatId, isChatBoxOpen, recipientUser , setIsChatBoxOpen}: any = useChatContext();


  //Lazzy-Loading
  const limit = 15;
  const [offset, setOffset] = useState(0);
  const [hasMoreMsg , setHasMoreMsg] = useState(false);

  //Fetch messages from hook
  const {isLoading, chatMessages} = useFetchChatMessages( selectedChatId , recipientUser?.id , limit , offset) ;
  // console.log(chatMessages)

  const [messageContent, setMessageContent] = useState('');
  const [messages, setMessages] = useState<Message[] >([]);
  
  //Grouped Msg's -
  const [groupedMessages, setGroupedMessages] = useState<GroupedMessages>({});

  //Send Image On chat as message
  const [imageURL , setImageURL] = useState('')
  const [isSendMediaPopupActive , setIsSendMediaPopupActive ] = useState(false);
  const [selectedMediaTempURL, setSelectedMediaTempURL] = useState(null);

  const handleSendMediaPopup = () => {
    setIsSendMediaPopupActive(!isSendMediaPopupActive)
    if(isSendMediaPopupActive){
      setSelectedMediaTempURL(null)
    }
  };

  //Get image file for sending
  const handleInputChangeFile = useCallback((input: HTMLInputElement)=> {
      return async(event:Event) => {
        event.preventDefault()

        const file:File | undefined | null |string = input.files?.item(0)
        if (!file)return
        if (file) {
          const tempUrl = URL.createObjectURL(file);
          setSelectedMediaTempURL(tempUrl);
          setIsSendMediaPopupActive(true)
        };

        const {getSignedUrlOfChat} = await graphqlClient.request( getSignedUrlOfChatQuery,{ 
          imageName: file.name,
          imageType: file.type
          }
        );

        if(getSignedUrlOfChat){
          await axios.put(getSignedUrlOfChat , file , {
            headers: {
              'Content-Type': file.type
            }
          })
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
      input.setAttribute('accept' , ".jpg, .jpeg, .png");

      const handlerFn = handleInputChangeFile(input)
      input.addEventListener('change' , handlerFn)

      input.click()
  },[handleInputChangeFile])

  useEffect(() => {
    if (chatMessages) {
      // setMessages(chatMessages as Message[]);
      setGroupedMessages(groupMessagesByDate(chatMessages as Message[]));      
    }else {
      // setMessages([]); // Ensure messages are reset if no chat messages are present
      setGroupedMessages({});
    }
  }, [chatMessages , selectedChatId , recipientUser]);

  //SocketIO
  useEffect(() => {
    socket.on("receivedMessage", (newMessage) => {
      if (newMessage?.chatId != selectedChatId) {
        // TODO - Give Notification
      };
      if (newMessage?.chatId === selectedChatId) {
        // Update groupedMessages with the new message
        setGroupedMessages((prevGroupedMessages: GroupedMessages) => {
          const newGroupedMessages = { ...prevGroupedMessages };

          // Convert createdAt to Date object
          const createdAtDate = new Date(parseInt(newMessage?.createdAt)); // Assuming newMessage.createdAt is in milliseconds as a string

          // Format date to 'yyyy-MM-dd' for grouping
          const messageDate = format(createdAtDate, "yyyy-MM-dd");

          // Check if this date exists in groupedMessages
          if (newGroupedMessages[messageDate]) {
            newGroupedMessages[messageDate] = [
              newMessage,
              ...newGroupedMessages[messageDate],
            ];
          } else {
            newGroupedMessages[messageDate] = [newMessage];
          }

          return newGroupedMessages;
        });
      }
    });
    return () => {
      socket.off("receivedMessage");
    };
  }, [selectedChatId]);

  //Typing Implementation
  const [isTyping, setIsTyping] = useState(false);

  const [typingIndicator, setTypingIndicator] = useState('');

  useEffect(() => {
    // Listen for typing events
    socket.on('typing', () => {
      setTypingIndicator(`typing...`);
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

  const handleSendMessage = async (e:any) => {
    e.preventDefault();
    await sendMessage({ 
      messageContent, 
      selectedChatId, 
      recipientUser, 
      setIsMessageSending, 
      setMessageContent, 
      shareMediaUrl: imageURL
    });
    if(isSendMediaPopupActive){
      handleSendMediaPopup()
      toast.success('Send successfully' , {id: '1'})
    }
  };
  // const handleSendMessage = async(e: { preventDefault: () => void }) => {
  //   setIsMessageSending(true)
  //   e.preventDefault();
  //   if (messageContent.trim() === '') {
  //     toast.error('Message cannot be empty');
  //     return;
  //   }
  //   try {
  //     const variables = {
  //       chatId: selectedChatId || null,
  //       content: messageContent,
  //       recipientId: recipientUser?.id,
  //     };
  //     const response = await sendMessageFn(variables)
  //     if(response){
  //       socket.emit("sendMessage", response);
  //     }else{
  //       toast.error("Error sending message");
  //     }
  //     setMessageContent("");
  //     setIsMessageSending(false)
  //   } catch (error) {
  //     console.error("Error occured while login:", error);
  //     setIsMessageSending(false)
  //     setMessageContent('')
  //   }
  // };

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
  }, [groupedMessages , typingIndicator]);

  

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
    <div className="whole-page grid grid-cols-12 h-screen w-screen bg-white dark:bg-dark-primary-bg overflow-hidden">
      {/* Column 1 */}
       {/* only visible sidebar when chatbox is not open on mobile view */}
      <div className={` sidebar ${isChatBoxOpen && 'hidden'} ${isChatBoxOpen && 'sm:inline-block'} px-2 rounded-2xl sm:rounded-none sm:px-0 bg-primary border sm:border-none sm:mx-0 sm:bg-white dark:bg-dark-primary-bg col-span-12 sm:inline sm:col-span-1 sm:static absolute bottom-0  sm:h-full h-fit w-full`}>
        <div className="flex flex-col justify-between items-center h-full sm:py-8">
          <Link href={'/chats'} className="hidden sm:inline-block font-bold text-xl tracking-tighter">Quicky</Link>  
          <div className="w-full sm:w-fit px-4 sm:mx-0">
            <ul className="flex sm:flex-col justify-between sm:justify-center items-center">
              {sidebarMenuItems.map((item) => (
                <li key={item.title}>
                  <Link
                    className="flex justify-start items-center gap-1 sm:my-3 rounded-full px-2 py-2"
                    href={item?.link}
                  >
                    <span className={`${item?.title == 'Search' && 'cursor-not-allowed' } ${pathname == item.link && 'bg-primary border-[1px]  dark:bg-dark-secondary'} transition duration-500 text-3xl cursor-pointer hover:ring-1 ring-black ring-offset-2 rounded-full p-2`}>
                      {item.icon} 
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            onClick={handleLogoutPageOpenState}
            className="hidden sm:inline-block bg-red-600 p-2 rounded-full cursor-pointer"
          >
            <CirclePower className="text-3xl text-white"/>
          </div>
        </div>
      </div>

      {/* Mid Column */}
      <div
        className={`main col-span-12 ${
          isChatBoxOpen && "hidden"
        } sm:inline sm:col-span-3  border-x-[0.5px] border-gray-300 dark:border-gray-800 h-screen`}
      >
        {props.children}
      </div>

      {/* Column 3 */}
      <div className={`${ isChatBoxOpen ? "inline col-span-12" : "hidden"} sm:inline sm:col-span-8 h-screen ${isUserInfoContainerActive  && "sm:flex"}  dark:bg-dark-primary-bg bg-[#F5F8FA] dark:bg-[radial-gradient(#26355D_1px,transparent_1px)] bg-[radial-gradient(#CCCCCC_1px,transparent_1px)] [background-size:40px_40px]`}>
        {isChatBoxOpen && (
          <>
          <div className="h-screen w-full">
            <div className="sticky left-0 top-0 right-0 z-5 bg-white dark:bg-dark-primary-bg border-b-[0.5px] border-gray-300 dark:border-gray-800">
              <div className="flex justify-between items-center px-4 py-1 mx-2">
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
                    {recipientUser && recipientUser?.avatar &&
                    <Image
                        priority= {false}
                        className="inline-block h-12 w-12 rounded-full"
                        src={recipientUser?.avatar}
                        alt="avatar"
                        height={30}
                        width={30}
                    />
                    }
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex gap-1">
                      <p className="text-[15px] font-semibold">
                        {recipientUser?.firstname}{" "} {recipientUser?.lastname}
                      </p>
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
                  <div className="transition duration-500 hover:bg-primary dark:hover:bg-[#303030] rounded-full p-2 cursor-pointer">
                    <Phone size={20} />
                  </div>
                  <div
                    onClick={handleMessageMenu}
                    className="transition duration-500 ease-in-out hover:bg-primary dark:hover:bg-[#303030] rounded-full p-2 cursor-pointer"
                  >
                    <EllipsisVertical size={20} />
                  </div>
                  {isMenuOpen && <Menu />}
                </div>
              </div>
            </div>
            
            {/* Render Chat Messages  */}
            <div  className="px-8 sm:px-20 h-[82%] overflow-y-scroll scrollbar-style">
              {/* Loading symbol for fetch more messages  */}
              {hasMoreMsg && 
              <div className="flex justify-center w-full">
                <Loading size={30} width={2}/>
              </div>}

              {/* Render chat messages  */}
              {Object?.keys(groupedMessages)?.reverse().map((date) => (
                <div key={date}>
                  <p className="my-3 text-sm text-center text-gray-500">{format(new Date(date), 'MMMM dd, yyyy')}</p>
                  {...[...groupedMessages[date]]?.reverse().map((msg:Message) => (
                    <MessageCard key={msg?.id} data={msg as Message} />
                  ))}
                </div>
              ))}

              {/* Message Loading State  */}
              { isLoading && 
                <div className="flex justify-center items-center h-full">
                    <Loading size={80} width={1}/>
                </div>
              }

              {/* Typing Indicator  */}
             {typingIndicator && <span className="text-xs p-2 dark:text-white text-black">{typingIndicator}</span> }
              <div ref={messagesEndRef}/>
            </div>


            {/* Textarea for message typing  */}
            <div className="input-container mx-8 sm:mx-20 message-input bg-white rounded-xl px-2 dark:bg-dark-secondary">
              <form onSubmit={handleSendMessage}>
                <div className="flex sm:min-h-[56px] items-center">
                  <div className="w-full flex gap-4 items-center justify-between">
                    <div className="w-full px-3 flex items-center rounded-xl gap-4">
                      <div className="w-[94%]">
                          <textarea rows={2}
                            required={true}
                            onChange={handleMessageContentOnChange}
                            className="no-scrollbar w-full bg-transparent resize-none flex px-1 text-sm placeholder:text-gray-600 dark:placeholder:text-white/70 focus:outline-none"
                            placeholder="Message!"
                            value={messageContent}
                            id="message"
                            name="message"
                          ></textarea>
                      </div>


                      {/* Select Media for send on chat  */}
                      <div className="w-[3%]">
                          <ImagePlus onClick={handleSelectImage} size={20} className="dark:text-gray-200 text-gray-600 cursor-pointer"/>
                      </div> 
                    </div>
                    {/* Sending Button Start */}
                      <SendButton messageContent={messageContent} isMessageSending={isMessageSending}/>

                    {/* <button
                      disabled={!messageContent?.length}
                      type="submit"
                      className=" p-2 rounded-full cursor-pointer"
                    >
                      {isMessageSending ? <Loading size={24} width={2}/> : <SendHorizontal className="text-[#3290EC] text-[1.6rem]" />}
                      
                    </button> */}

                    {/* Sending Button End */}

                  </div>
                </div>
              </form>
            </div>
          </div>

          {isUserInfoContainerActive &&
            <div className="transition duration-700 ease-in user-info-container sidebar w-2/3 bg-white dark:bg-dark-primary-bg">
              <UserProfileContainer handleUserInfoContainer={handleUserInfoContainer as React.FC} user={recipientUser as User}/>
            </div>
          }

          </>
        )}
      </div>

      
    </div>

    {/* Logout Page  */}
    {isLogoutPageOpen && 
    <div className="w-full h-full backdrop-blur-sm fixed top-0 left-0 flex justify-center items-center">
      <Logout handleLogout = {handleLogout} handleLogoutPageOpenState={handleLogoutPageOpenState}/>
    </div>
    }

    {/* Send Media Popup Container  */}
    {selectedMediaTempURL && isSendMediaPopupActive &&
    <div className="w-full h-full backdrop-blur-md fixed top-0 left-0 flex justify-center items-center">
      <PopupSendMedia handleSendMessage={handleSendMessage} handleSendMediaPopup={handleSendMediaPopup} mediaUrl={selectedMediaTempURL}/>
    </div>}
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


