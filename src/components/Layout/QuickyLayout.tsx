'use client'

import { useMemo, useState } from "react";

import { CircleUserRound , Bolt , MessageSquare , CirclePower , SendHorizontal , Search } from 'lucide-react';
import Link from "next/link";

import {Avatar, AvatarImage } from "@/components/ui/avatar";
import MessageCard from "../MessageCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCreateMessage, useCurrentUser, useFetchChatMessages } from "../../../hooks/user";
import { Message } from "../../../gql/graphql";
import {  useChatIdContext } from "@/context/ChatIdContext";


interface QuickySidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string
}

interface QuickyLayoutProps {
    children: React.ReactNode;
}

export const QuickyLayout: React.FC<QuickyLayoutProps> = (props) => {

    const {user} = useCurrentUser();
    
    const router = useRouter()

    const sidebarMenuItems:QuickySidebarButton[]= useMemo(()=>
        [ 
          {
            title: "Chats",
            icon: <MessageSquare />,
            link: "/"
          },
          {
            title: "Search",
            icon: <Search />,
            link: `/search`
          },
          {
            title: "Profile",
            icon: <CircleUserRound />,
            link: `${user?.username}`
          },
          {
            title: "Setting",
            icon: <Bolt />,
            link: "/setting"
          },
        ],[user?.username])

    
    const handleLogout = () => {
        toast.loading("Logging out..." , {id: '2'})
        localStorage.removeItem('__token__')
        toast.success("Logout successfull...", {id: '2'})
        router.push('/login')

    }

    //Message Code Starts Here
    const { selectedChatId } : any = useChatIdContext();
    const openChat = useFetchChatMessages(selectedChatId)
  

    const {mutate} = useCreateMessage()
    const [message , setMessage] = useState('')

    const handleSendMessage = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
          mutate({
            chatId: selectedChatId,
            content: message,
            recipientId: "clvzhcvm6000011mv4v93acpt"
          });
          setMessage('')
        } catch (error) {
          console.error('Error occured while login:', error);
        }
    };
    return (
      <div className="grid grid-cols-12 h-screen w-screen">
        <div className="col-span-1 relative bg-white">
          <div className="flex flex-col justify-between items-center h-full py-12 shadow-md">
            <div className="flex flex-col items-center">
              {user && user?.avatar && (
                <Image
                  priority={false}
                  className="inline-block h-12 w-12 rounded-full"
                  src={user?.avatar}
                  alt="avatar"
                  height={20}
                  width={20}
                />
              )}
              <span className="flex flex-col mt-2">
                <span className="text-xs font-bold text-gray-900">
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
                      <span className="text-3xl bg-slate-100 rounded-full p-2">
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

        <div className="col-span-4  bg-[#F4F8FB] px-4 border-x-gray-600  h-screen overflow-y-scroll overflow-x-hidden no-scrollbar">
          {props.children}
        </div>

        
        <div className="col-span-7 bg-[url('https://img.freepik.com/free-vector/hand-drawn-doodle-icons-set_1308-90706.jpg')] bg-image-opacity-10 h-screen overflow-y-scroll no-scrollbar -z-10">
        {selectedChatId &&
        <>
          <div className="border-b-[0.7px] border-gray-300 px-4 py-1 bg-white z-10 sticky top-0 shadow-xl">
            <div className="flex gap-4">
              <div className="w-14 h-14 flex flex-col justify-center">
                <Avatar>
                  <AvatarImage
                    src="https://i.pinimg.com/564x/e7/47/66/e747665c92fdb1befb45a486a47b310b.jpg"
                    alt="user avatar"
                  />
                </Avatar>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex gap-1">
                  <h5 className="text-[15px] font-medium">Priyanshu Kumar</h5>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Online</p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 mt-6 h-[77%]">
            {openChat &&
              openChat.chatMessages?.map((chatMessage) => (
                <MessageCard
                  key={chatMessage.id}
                  data={chatMessage as Message}
                />
              ))}
          </div>

          <div className="w-full message-input">
            <div className="bg-transparent">
              <form onSubmit={handleSendMessage}>
                <div className="line border-t-[0.5px] border-[#414141] w-full h-[0.5px]"></div>
                <div className=" flex min-h-[56px] items-center">
                    <div className="w-full mx-5 my-2 flex gap-4 items-center justify-between">
                        <div className="w-full">
                            <textarea
                                onChange={(e) => setMessage(e.target.value)}
                                className="resize-none align-middle flex min-h-12 w-full bg-white rounded-lg px-8 py-3 text-sm placeholder:text-gray-600 focus:outline-none"
                                placeholder="Write your message!"
                                value={message}
                            ></textarea>
                        </div>
                        <button type="submit" className="bg-[#3290EC] p-3 rounded-full">
                            <SendHorizontal className="text-white text-[1.6rem]" />
                        </button>
                    </div>
                </div>
              </form>
            </div>
          </div>
          </>
        }
        </div>

        
      </div>
    );
};
