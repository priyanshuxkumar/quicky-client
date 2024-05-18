"use client";

import MessageCard from "@/components/MessageCard";
import React, { useState } from "react";
import { Message } from "../../../../../gql/graphql";
import {
  ChevronLeft,
  EllipsisVertical,
  Phone,
  SendHorizontal,
} from "lucide-react";
import {
  useFetchChatMessages,
  useSendMessage,
} from "../../../../../hooks/user";

import { useChatContext } from "@/context/ChatIdContext";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Menu from "@/components/Menu";
import { QuickyLayout } from "@/components/Layout/QuickyLayout";

const MessagesRenderPage = () => {
  
  const { selectedChatId, isChatBoxOpen, recipientUser }: any = useChatContext();
  const openChat = useFetchChatMessages(selectedChatId);

  // console.log("selectedChatId" , selectedChatId)

  const { mutate } = useSendMessage();
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      mutate({
        chatId: selectedChatId || null,
        content: message,
        recipientId: recipientUser?.id,
      });
      setMessage("");
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
    <>
    {/* <QuickyLayout> */}
      <div className="sticky left-0 top-0 right-0">
        <div className="flex justify-between items-center border-gray-200 dark:border-gray-800 px-4 py-1 border-b-[1px] mx-4">
          <div className="flex gap-2 items-center">
            <Link href={"/"} className="inline sm:hidden mr-2">
              <div className="cursor-pointer">
                <ChevronLeft size={24} className="text-black dark:text-white" />
              </div>
            </Link>
            <div className="w-14 h-14 flex flex-col justify-center">
              <Avatar>
                <AvatarImage src={recipientUser?.avatar} alt="user avatar" />
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

      <div className="px-6 h-[80%] overflow-y-scroll scrollbar-style">
        {openChat &&
          openChat.chatMessages?.map((chatMessage) => (
            <MessageCard key={chatMessage.id} data={chatMessage as Message} />
          ))}
      </div>

      <div className="w-full message-input sticky bottom-0 dark:bg-black">
        <form onSubmit={handleSendMessage}>
          <div className="flex sm:min-h-[56px] items-center">
            <div className="w-full mx-5 flex gap-4 items-center justify-between">
              <div className="w-full">
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  className="resize-none align-middle flex sm:min-h-12 w-full bg-white dark:bg-[#303030] rounded-2xl px-8 py-3 text-sm placeholder:text-gray-600 dark:placeholder:text-white/70 focus:outline-none"
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
    {/* </QuickyLayout> */}
    </>


  );
};

export default MessagesRenderPage;
