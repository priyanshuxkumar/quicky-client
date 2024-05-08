import Link from 'next/link'
import { Avatar, AvatarImage } from '../ui/avatar'

const ChatCard = () => {
  return (
    <div className="border-[0.7px] border-gray-300 px-4 rounded-md py-3 my-2 cursor-pointer hover:bg-slate-50">
        <div className="flex gap-4">
            <div className="w-14 h-14 flex flex-col justify-center">
                <Avatar ><AvatarImage src="https://i.pinimg.com/564x/e7/47/66/e747665c92fdb1befb45a486a47b310b.jpg" alt='user avatar'/></Avatar>
            </div>
            <div className="">
                <div className="flex gap-1">
                    <h5 className="text-[15px] font-medium">Priyanshu Kumar</h5>
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