'use client'

import ChatCard from "@/components/ChatCard/index"
import { useFetchAllChats } from "../../hooks/user";
import { Chat, Message, User } from "../../gql/graphql";
import { QuickyLayout } from "@/components/Layout/QuickyLayout";
import { useChatIdContext } from "@/context/ChatIdContext";
import { useState } from "react";

export default function Home() {

  const { chats } = useFetchAllChats()

  const { setSelectedChatId } = useChatIdContext();


  const handleSelectedChat = (chatId: string | any)  => {
    setSelectedChatId(chatId);
  }
  
  return (
   <>
    <div>
      <QuickyLayout>
        <h1 className="font-bold text-3xl my-8 ">Chats</h1>
         {chats && chats.map((chat)=> <ChatCard onClick={() => handleSelectedChat(chat?.id)} key={chat?.id} data={chat as Chat}/>)}
      </QuickyLayout>
    </div>  
    </>     
  );
};
