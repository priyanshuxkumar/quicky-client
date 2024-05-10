'use client'

import ChatCard from "@/components/ChatCard/index"
import { useCurrentUser ,  useFetchAllChats } from "../../hooks/user";
import { Chat, Message, User } from "../../gql/graphql";
import { QuickyLayout } from "@/components/Layout/QuickyLayout";
import { use, useEffect, useState } from "react";
import { graphqlClient } from "../../clients/api";
import { fetchAllChatsQuery, fetchChatMessagesQuery } from "../../graphql/query/chat";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Home() {

  const {user} = useCurrentUser();

  const { chats } = useFetchAllChats()
  // _____________________________________________________________

  const [selectedChat , setSelectedChat] = useState(null);

  const handleSelectedChat = (chatId: string | any)  => {
    console.log("clicked")
    setSelectedChat(chatId)
  }

  const [chatMessages , setChatMessages] = useState<Message[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if(user && selectedChat){
        const messages: Message[] | null = user ? await fetchChatMessages(selectedChat) : null
        setChatMessages(messages);
      }
    };

    fetchData()
  }, [selectedChat , user]);



  console.log("chatMessages",chatMessages)

  return (
   <>
    <div>
      <QuickyLayout>
        <h1 className="font-semibold text-2xl my-4">Chats</h1>
          {/* {user && user?.chats?.map((chat) => (
              <ChatCard
                  onClick={() => handleSelectedChat(chat?.id)}
                  key={chat?.id}
                  data={chat as Chat}
              />
          ))} */}

         {chats && chats.map((chat)=> <ChatCard onClick={() => handleSelectedChat(chat?.id)} key={chat?.id} data={chat as Chat}/>)}
        </QuickyLayout>
    </div>  
    </>     
  );
}

export async function fetchChatMessages(chatId: string ) {
  try {
    const chatMesages = await graphqlClient.request(fetchChatMessagesQuery, { chatId });
    
    if (!chatMesages) {
      console.warn(`No user found with ID: ${chatId}`);
      return null;
    }

    const messages = chatMesages.fetchAllMessages as Message[];
    return messages;
  } catch (error) {
    console.error('Error fetching user information:', error);
    return null;
  }
};
