'use client'

import { Chat } from '../../../gql/graphql'
import { useCurrentUser } from '../../../hooks/user'
import { getOtherUserInfoOnChat } from '@/config/ChatLogic'
import Image from "next/image";
import { getTimeAgoString } from '@/config/TimeServices'
import { useChatContext } from '@/context/ChatContext'
import { useRouter } from 'next/navigation';
import { Dot } from 'lucide-react';



interface ChatCardProps {
    data: Chat
    onClick: (chatId: string) => void;
};

const ChatCard : React.FC<ChatCardProps> = ({ data , onClick}) => {

  //Change selected Chat Background Color
  const {selectedChatId , setRecipientUser} = useChatContext()

  const router = useRouter()  

  const {user} = useCurrentUser();

  //getting second user info from chat
  const secondUserInfoOnChat = getOtherUserInfoOnChat(user?.id , data.users)


  const handleClick = () => {
    onClick(data.id);
    setRecipientUser(secondUserInfoOnChat)      
    // router.push(`/chats/u/${secondUserInfoOnChat.username}` , {scroll:false})
  };

  //Getting time of last message
  const createdAt = new Date(Number(data?.messages[0]?.createdAt)); 
  const timeOfLastMessageOnChat = getTimeAgoString(createdAt);

  return (
    <>
    <div onClick={handleClick} className={`${data.id == selectedChatId && 'bg-slate-100 dark:bg-black '} transition duration-500 hell px-7 py-2 my-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-black`}>
        <div className="flex gap-4 items-center">
            <div className="w-14 h-14 flex flex-col justify-center relative">
                {secondUserInfoOnChat && secondUserInfoOnChat?.avatar &&
                    <Image
                        priority= {false}
                        className="inline-block h-12 w-12 rounded-xl"
                        src={secondUserInfoOnChat?.avatar}
                        alt="avatar"
                        height={30}
                        width={30}
                    />
                }
                {
                  secondUserInfoOnChat && secondUserInfoOnChat?.isActive && <span className="absolute bottom-1 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
                }
            </div>
            <div className="w-full">
                <div className="flex gap-1">
                    <h5 className="text-[15px] font-medium dark:text-white"> {secondUserInfoOnChat?.firstname} </h5>
                    <h5 className="text-[15px] font-medium dark:text-white">{secondUserInfoOnChat?.lastname}</h5>
                </div>

                <div className='flex justify-between items-center h-5'>
                    <p className='text-sm text-gray-600 dark:text-white/70'>{ data && data.messages && data.messages[0]?.content  || ''}</p>
                   
                    <div className='flex justify-end items-center dark:text-white'>
                      {/* Unread message Icon */}
                      <Dot size={40} className='text-[#3290EC]'/> 
                       {data?.messages[0]?.content && 
                        <span className='text-xs dark:text-white/70'>{timeOfLastMessageOnChat}</span>
                       }
                    </div>
                </div>

            </div>
        </div>
    </div>
    
    </>

  )
}

export default ChatCard;