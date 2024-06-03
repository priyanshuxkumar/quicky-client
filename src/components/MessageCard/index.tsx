"use client";

import { Message } from "../../../gql/graphql";
import { useCurrentUser } from "../../../hooks/user";

import {messageSendTime , messagesTimeGroup} from "@/config/TimeServices"

interface MessageCardProps {
  data: Message;
}

const MessageCard : React.FC<MessageCardProps> = ({data})=> {
  const {user} = useCurrentUser()

  // console.log("data on messagesComp" , data)


  //Message send time 
  // const createdAt = new Date(Number(data?.createdAt.toString())); 
  // const formattedTime = messageSendTime(createdAt)

  // const timeGroup = messagesTimeGroup(createdAt)

  return (
    <> 
      {/* <p className="my-3 text-sm text-center text-gray-500">{timeGroup}</p> */}

      <div className={`flex flex-col justify-end mb-4 ${data?.senderId == user?.id && 'place-items-end'}`}>
        <div className={`${data?.senderId == user?.id ? 'bg-[#CDDFFA] text-black rounded-se-none': 'bg-white dark:bg-[#303030] rounded-es-none '} w-fit max-w-72 my-2 px-2 py-1 rounded-lg`}>
          <p className="text-sm">
            {data?.content}
          </p>
        </div>
        <div className="ml-1 w-fit">
           {/* <span className="text-xs text-black dark:text-white">{formattedTime || ""}</span>  */}
          <span className="text-xs text-black dark:text-white">10:20</span>
        </div>
      </div>  
    </>
  );
};

export default MessageCard;
