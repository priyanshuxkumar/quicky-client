import Link from 'next/link'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Chat } from '../../../gql/graphql'
import { useCurrentUser } from '../../../hooks/user'
import { getSenderInfo } from '@/config/ChatLogic'

interface ChatCardProps {
    data: Chat
}

const ChatCard : React.FC<ChatCardProps> = (props) => {

    const {user} = useCurrentUser();

    const {data} = props;
    
    const secondUserOnChatInfo = getSenderInfo(user , data)
    
  return (
    <div className="border-[0.7px] border-gray-300 px-4 rounded-md py-3 my-2 cursor-pointer hover:bg-slate-50">
        <div className="flex gap-4">
            <div className="w-14 h-14 flex flex-col justify-center">
                <Avatar ><AvatarImage src={secondUserOnChatInfo?.avatar} alt='user avatar'/></Avatar>
            </div>
            <div className="">
                <div className="flex gap-1">
                    <h5 className="text-[15px] font-medium">{secondUserOnChatInfo?.firstname}</h5>
                    <h5 className="text-[15px] font-medium">{secondUserOnChatInfo?.lastname}</h5>
                </div>
                <div>
                    <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi, fugiat?</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatCard;