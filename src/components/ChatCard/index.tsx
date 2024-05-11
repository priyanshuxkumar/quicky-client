'use client'

import { Avatar, AvatarImage } from '../ui/avatar'
import { Chat } from '../../../gql/graphql'
import { useCurrentUser } from '../../../hooks/user'
import { getOtherUserInfoOnChat } from '@/config/ChatLogic'
import Image from "next/image";
import { getTimeAgoString } from '@/config/TimeServices'
import { useState } from 'react'
import { useChatIdContext } from '@/context/ChatIdContext'



interface ChatCardProps {
    data: Chat
    onClick: (chatId: string) => void;
};

const ChatCard : React.FC<ChatCardProps> = ({ data , onClick}) => {
  const {user} = useCurrentUser();


  const handleClick = () => {
    onClick(data.id);
  };

  //getting second user info from chat
  const secondUserInfoOnChat = getOtherUserInfoOnChat(user?.id , data.users)

  //Getting time of last message
  const createdAt = new Date(Number(data.messages[0]?.createdAt)); 
  const timeOfLastMessageOnChat = getTimeAgoString(createdAt)

  return (
    <div onClick={handleClick} className={`hell border-[0.7px] bg-white px-4 rounded-lg py-3 my-4 cursor-pointer shadow-md`}>
        <div className="flex gap-4 items-center">
            <div className="w-14 h-14 flex flex-col justify-center">
                {secondUserInfoOnChat && secondUserInfoOnChat?.avatar &&
                    <Image
                        priority= {false}
                        className="inline-block h-12 w-12 rounded-full"
                        src={secondUserInfoOnChat?.avatar}
                        alt="avatar"
                        height={30}
                        width={30}
                    />
                }
            </div>
            <div className="w-full">
                <div className="flex gap-1">
                    <h5 className="text-[15px] font-medium"> {secondUserInfoOnChat?.firstname} </h5>
                    <h5 className="text-[15px] font-medium">{secondUserInfoOnChat?.lastname}</h5>
                </div>
                <div className='flex justify-between'>
                    <p className='text-sm text-gray-600'>{ data && data.messages && data.messages[0]?.content }</p>
                    <div className='flex justify-end'>
                        <span className='text-xs'>{timeOfLastMessageOnChat}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatCard;