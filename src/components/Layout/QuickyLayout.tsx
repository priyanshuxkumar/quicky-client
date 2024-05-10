'use client'

import { useMemo } from "react";

import { CircleUserRound , Bolt , MessageSquare , CirclePower } from 'lucide-react';
import Link from "next/link";

import {Avatar, AvatarImage } from "@/components/ui/avatar";
import MessageCard from "../MessageCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCurrentUser } from "../../../hooks/user";


interface QuickySidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string
}

interface QuickyLayoutProps {
    children: React.ReactNode;
  }

export const QuickyLayout: React.FC<QuickyLayoutProps> = (props) => {

    const {user} = useCurrentUser();
    
    const router = useRouter()

    const sidebarMenuItems:QuickySidebarButton[]= useMemo(()=>
        [ 
          {
            title: "Chats",
            icon: <MessageSquare />,
            link: "/"
          },
          {
            title: "Profile",
            icon: <CircleUserRound />,
            link: "/profile"
          },
          {
            title: "Setting",
            icon: <Bolt />,
            link: "/setting"
          },
        ],[])

    
    const handleLogout = () => {
        toast.loading("Logging out..." , {id: '2'})
        localStorage.removeItem('__token__')
        toast.success("Logout successfull...", {id: '2'})
        router.push('/login')

    }

    return(
    <div className="grid grid-cols-12 h-screen w-screen">

        <div className="col-span-1 relative bg-slate-100">
            <div className="flex flex-col justify-between items-center h-full py-8">

                <div className="flex flex-col items-center">
                    {user && user?.avatar &&
                        <Image
                            className="inline-block h-12 w-12 rounded-full"
                            src={user?.avatar}
                            alt="avatar"
                            height={100}
                            width={100}
                        />
                    }
                    <span className="flex flex-col mt-2">
                        <span className="text-xs font-medium text-gray-900">{user?.firstname}</span>
                    </span>
                </div>

                <div>
                    <ul className="flex flex-col justify-center items-center">
                    {sidebarMenuItems.map((item) => (
                        <li key={item.title}>
                            <Link className="flex justify-start items-center gap-2 my-3 cursor-pointer rounded-full px-4 py-2" href={item?.link}>
                            <span className="text-3xl bg-slate-200 rounded-full p-2">{item.icon}</span>
                            </Link>
                        </li>
                    ))}
                    </ul>
                </div>

                <div onClick={handleLogout} className="bg-red-600 p-2 rounded-full cursor-pointer">
                    <CirclePower className="text-3xl text-white"/>
                </div>

            </div>

        </div>

        <div className="col-span-4 border-x-[0.2px] px-4 h-screen border-x-gray-600 overflow-y-scroll no-scrollbar"> 
                {props.children}
        </div>

        <div className="col-span-7 bg-gray-100 h-screen overflow-y-scroll no-scrollbar">
            <div className="border-b-[0.7px] border-gray-300 px-4 py-1 my-2">
                <div className="flex gap-4">
                    <div className="w-14 h-14 flex flex-col justify-center">
                        <Avatar ><AvatarImage src="https://i.pinimg.com/564x/e7/47/66/e747665c92fdb1befb45a486a47b310b.jpg" alt='user avatar'/></Avatar>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex gap-1">
                            <h5 className="text-[15px] font-medium">Priyanshu Kumar</h5>
                        </div>
                        <div>
                            <p className='text-sm text-gray-600'>Online</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-6 mt-8">
                <MessageCard/>
                <MessageCard/>
                <MessageCard/>
                <MessageCard/>
                <MessageCard/>
                <MessageCard/>
                <MessageCard/>
                <MessageCard/>
                <MessageCard/>
            </div>
        </div>

    </div>
    )
};
