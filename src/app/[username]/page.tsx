'use client'

import { QuickyLayout } from '@/components/Layout/QuickyLayout'
import Image from 'next/image'
import React, { useMemo } from 'react'

import { Mail ,AtSign, ChevronLeft} from 'lucide-react';
import { useCurrentUser } from '../../../hooks/user';
import Link from 'next/link';


interface UserProfilePageContentColumns {
    title: string;
    icon: React.ReactNode;
    subtitle?: string;
  }

const UserProfilePage = () => {
    const {user} = useCurrentUser();
    
    //Render userprofile columns
    const sidebarMenuItems: UserProfilePageContentColumns[] = useMemo(
      () => [
        {
          title: `${user?.email}`,
          icon: <Mail />,
          subtitle: "Email",
        },
        {
          title: `${user?.username}`,
          icon: <AtSign />,
          subtitle: "Username",
        },
      ],
      [user]
    );

  return (
    <QuickyLayout>
      <div>
        <div className="flex border-b-[0.1px] w-full px-4 py-4 gap-6 items-center sticky top-0 z-10">
            <Link href={'/'}>
                <div className="cursor-pointer">
                    <ChevronLeft size={24} className="text-black" />
                </div>
            </Link>
            <div>
                <p className="text-black text-lg">{user?.username}</p>
            </div>
        </div>

        <div className="w-full my-4">
          <div className="flex justify-center">
            {user && user.avatar && 
                <Image
                className="h-32 w-32 rounded-full object-cover"
                src={user?.avatar}
                alt=""
                width={100}
                height={100}
            />
            }
          </div>
          <div>
            <p className="mt-3 text-center text-lg font-semibold text-black">
              Priyanshu Kumar
            </p>
            <p className="text-center text-base text-gray-600">Online</p>
          </div>
        </div>

        {sidebarMenuItems.map((item, index)=>( 
            <div key={index} className="mt-2 hover:bg-slate-200 py-2 px-4 rounded-lg dark:border-gray-800 transition-all">
                <div className="flex gap-3 items-center">
                    <div>
                        <span className='text-gray-500'> {item.icon} </span>
                        
                    </div>
                    <div className="ml-3 min-w-0">
                        <p className="truncate text-sm text-gray-800">
                            {item.title}
                        </p>
                        <p className="truncate text-sm text-gray-500">{item.subtitle}</p>
                    </div>
                </div>
            </div>

        ))}

      </div>
    </QuickyLayout>
  );
}

export default UserProfilePage