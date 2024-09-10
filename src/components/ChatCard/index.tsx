'use client'

import { Chat } from '../../../gql/graphql'
import { useCurrentUser } from '../../../hooks/user'
import { getOtherUserInfoOnChat } from '@/config/ChatLogic'
import { getTimeAgoString } from '@/config/TimeServices'
import { useChatContext } from '@/context/ChatContext'
import { graphqlClient } from '../../../clients/api';
import { updateMsgSeenStatusMutation } from '../../../graphql/mutation/chat';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';



interface ChatCardProps {
    data: Chat
    onClick: (chatId: string) => void;
    latestMessage: {
      content: string;
      createdAt: Date;
    }
};

const ChatCard : React.FC<ChatCardProps> = ({ data , onClick , latestMessage} ) => {
  const router = useRouter()

  //Change selected Chat Background Color
  const {selectedChatId , setRecipientUser } = useChatContext()

  //Current user
  const {user} = useCurrentUser();

  //getting second user info from chat
  const secondUserInfoOnChat = getOtherUserInfoOnChat(user?.id , data.users)

  //state of recent message seen/unseen
  const [isMsgSeen , setIsMsgSeen] =  useState<boolean | null | undefined >(data.messages && data?.messages[0]?.isSeen);

  //state of recent message senderid == current user id
  const senderId = (data.messages && data.messages[0]?.senderId == user?.id)


  //Chat click fn
  const handleClick = () => {
    onClick(data.id);
    setRecipientUser(secondUserInfoOnChat) 
    router.replace(`#${secondUserInfoOnChat?.username}`)
    
    //Updating status of message seen 
    if(isMsgSeen === false && senderId == false) {
      updateMsgSeenStatusFn(data?.id)
      setIsMsgSeen(true)
    }  
  };

  //Fetching time of last message
  const createdAt = new Date(Number(latestMessage?.createdAt || data.messages && data?.messages[0]?.createdAt)); 
  const timeOfLastMessageOnChat = getTimeAgoString(createdAt);
  return (
    <>
      <div
        className={`${
          data.id == selectedChatId && "bg-primary dark:bg-dark-secondary "
        } transition duration-500 px-4 py-2 my-2 cursor-pointer hover:bg-primary dark:hover:bg-dark-secondary`}
      >
        <div className="flex gap-3 items-center">
          <div className="min-w-14 min-h-14 flex flex-col justify-center relative">
            {secondUserInfoOnChat && secondUserInfoOnChat?.avatar ? (
              <Avatar className="h-12 w-12">
                <AvatarImage src={secondUserInfoOnChat?.avatar} />
              </Avatar>
            ) : (
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {(
                    (secondUserInfoOnChat?.firstname?.[0] || "") +
                    (secondUserInfoOnChat?.lastname?.[0] || "")
                  ).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}

            {secondUserInfoOnChat && secondUserInfoOnChat?.isActive && (
              <span className="absolute bottom-1 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
            )}
          </div>
          <div onClick={handleClick} className="w-full overflow-hidden">
            <div className="flex justify-between pr-1 items-center gap-1">
              <div className="flex gap-1">
                <h5 className="text-[15px] font-semibold dark:text-white">
                  {" "}
                  {secondUserInfoOnChat?.firstname}{" "}
                </h5>
                <h5 className="text-[15px] font-semibold dark:text-white">
                  {secondUserInfoOnChat?.lastname}
                </h5>
              </div>
              <div>
                {
                  <span className="dark:text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {timeOfLastMessageOnChat}
                  </span>
                }
              </div>
            </div>

            <div className="flex items-center pr-1 h-5 w-full justify-between">
              {/* Lastest Message on Chat */}
              <p
                className={`${
                  data.messages &&
                  isMsgSeen == false &&
                  senderId == false &&
                  "dark:text-white text-black"
                } text-sm w-11/12 font-medium text-gray-600  dark:text-white/70 truncate`}
              >
                {senderId == true && (
                  <span className="font-semibold text-black dark:text-white">
                    {" "}
                    You:{" "}
                  </span>
                )}
                {latestMessage?.content || data.messages &&
                  (!data.messages[0]?.content
                    ? "You sent an attachment"
                    : data.messages[0]?.content)}
              </p>
              <div className="h-full flex  items-center">
                {/* Unread message Count */}
                <span className="bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  1
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatCard;

const updateMsgSeenStatusFn = async(chatId :string) => {
   try {
     const response = await graphqlClient.request(updateMsgSeenStatusMutation , {chatId})
     if(response.updateMsgSeenStatus.success == true) return
   } catch (error) {
      throw error;
   }
}