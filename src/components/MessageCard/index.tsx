"use client";

import { Message } from "../../../gql/graphql";
import { useCurrentUser } from "../../../hooks/user";

import {messageSendTime} from "@/config/TimeServices"

interface MessageCardProps {
  data: Message;
}

const MessageCard : React.FC<MessageCardProps> = ({data})=> {
  const {user} = useCurrentUser()
 
  //Message send time 
  const createdAt = new Date(Number(data?.createdAt.toString())); 
  const formattedTime = messageSendTime(createdAt)

  return (
    <>
      <div className={`flex flex-col justify-end mb-6 ${data.senderId == user?.id && 'place-items-end'}`}>
        <div className={`${data.senderId == user?.id ? 'bg-slate-500 text-white': 'bg-slate-200' } w-fit my-2 px-4 py-3 rounded-full`}>
          <p className="text-sm">
            {data?.content}
          </p>
        </div>
        <div className="px-2 w-fit bg-white rounded-lg mx-2">
          <span className="text-xs text-black">{formattedTime}</span>
        </div>
      </div>  
    </>
  );
};

export default MessageCard;
