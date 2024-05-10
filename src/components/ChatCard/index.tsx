'use client'

import { Avatar, AvatarImage } from '../ui/avatar'
import { Chat } from '../../../gql/graphql'
import { useCurrentUser } from '../../../hooks/user'
import { getOtherUserInfoOnChat } from '@/config/ChatLogic'
import { useState } from 'react'

interface ChatCardProps {
    data: Chat
    onClick: (chatId: string) => void;
};

const ChatCard : React.FC<ChatCardProps> = ({ data , onClick}) => {
  const {user} = useCurrentUser();

  const handleClick = () => {
    // Call the onClick prop with the chat ID as an argument
    onClick(data.id);
  };
  
  //getting second user info from chat
  const secondUserInfoOnChat = getOtherUserInfoOnChat(user?.id , data.users)
  return (
    <div onClick={handleClick}  className="border-[0.7px] border-gray-300 px-4 rounded-md py-3 my-2 cursor-pointer hover:bg-slate-50">
        <div className="flex gap-4 items-center">
            <div className="w-14 h-14 flex flex-col justify-center">
                <Avatar ><AvatarImage src={secondUserInfoOnChat?.avatar} alt='user avatar'/></Avatar>
            </div>
            <div className="">
                <div className="flex gap-1">
                    <h5 className="text-[15px] font-medium"> {secondUserInfoOnChat?.firstname} </h5>
                    <h5 className="text-[15px] font-medium">{secondUserInfoOnChat?.lastname}</h5>
                </div>
                <div>
                    <p className='text-sm text-gray-600'>{ data && data.messages && data.messages[0]?.content }</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatCard;