import Image from "next/image";
import ChatCard from "@/components/ChatCard/index"
import { useMemo } from "react";

import { CircleUserRound , Bolt } from 'lucide-react';
import Link from "next/link";

import {Avatar, AvatarImage } from "@/components/ui/avatar";

interface QuickySidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string
}

export default function Home() {

  const sidebarMenuItems:QuickySidebarButton[]= useMemo(()=>
    [ 
      {
        title: "Profile",
        icon: <CircleUserRound />,
        link: "/"
      },
      {
        title: "Setting",
        icon: <Bolt />,
        link: "/"
      },
    ],[])

    
  return (
    <div className="grid grid-cols-12 h-screen w-screen">
      <div className="col-span-1 relative bg-slate-100">
          <ul className="h-screen flex flex-col justify-center items-center">
          {sidebarMenuItems.map((item) => (
              <li key={item.title}>
                <Link className="flex justify-start items-center gap-2 my-3 cursor-pointer rounded-full px-4 py-2" href={item?.link}>
                  <span className="text-3xl bg-slate-200 rounded-full p-2">{item.icon}</span>
                </Link>
              </li>
          ))}
          </ul>
      </div>
      <div className="col-span-4 border-x-[0.2px] px-4 h-screen border-x-gray-600 overflow-y-scroll no-scrollbar"> 
          <h1 className="font-semibold text-2xl my-4">Chats</h1>
          <ChatCard/>
          <ChatCard/>
          <ChatCard/>
          <ChatCard/>
          <ChatCard/>
          <ChatCard/>
          <ChatCard/>
          <ChatCard/>
          <ChatCard/>
      </div>

      <div className="col-span-7 bg-gray-100">
        <div className="border-b-[0.7px] border-gray-300 px-4 py-3 my-2">
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

        <div className="messages-starts px-6 mt-8">
            <div className="bg-gray-200 w-[450px] px-4 py-2 rounded-2xl"> 
              <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda, at. Enim assumenda natus necessitatibus? Amet laboriosam ullam voluptatum voluptatem nemo.</p>
            </div>

            <div className="px-3">
              <span className="text-xs">10:20</span>
            </div>
        </div>
      </div>

    </div>
  );
}
