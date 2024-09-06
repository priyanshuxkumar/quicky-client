"use client";

import { QuickyLayout } from "@/components/Layout/QuickyLayout";
import Image from "next/image";
import React, { useMemo } from "react";

import { Mail, AtSign, ChevronLeft, Pencil, Lock } from "lucide-react";
import { useCurrentUser } from "../../../../hooks/user";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfilePageContentColumns {
  title: string;
  icon: React.ReactNode;
  subtitle?: string;
  link?: string;
}

const UserProfilePage = () => {
  const { user } = useCurrentUser();
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  //Render userprofile columns
  const sidebarMenuItems: UserProfilePageContentColumns[] = useMemo(
    () => [
      {
        title: `${user?.email}`,
        icon: <Mail />,
        subtitle: "Email",
        link: "#",
      },
      {
        title: `${user?.username}`,
        icon: <AtSign />,
        subtitle: "Username",
        link: "#",
      },
      {
        title: `Password`,
        icon: <Lock />,
        subtitle: "Change password",
        link: "/change-password",
      },
    ],
    [user]
  );
  return (
    <QuickyLayout>
      <div>
        <div className="flex border-b-[0.1px] w-full px-4 py-4 gap-6 items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div onClick={handleBackClick} className="cursor-pointer">
              <ChevronLeft size={24} className="text-black dark:text-white " />
            </div>

            <div>
              <p className="text-black text-lg dark:text-white ">
                {user?.firstname}
              </p>
            </div>
          </div>

          <div
            onClick={() => router.push(`/u/${user?.username}/edit`)}
            className="cursor-pointer"
          >
            <Pencil size={20} className="text-black dark:text-white " />
          </div>
        </div>

        <div className="w-full my-4">
          <div className="flex justify-center">
            {user && user.avatar ? (
              <Avatar className="h-32 w-32">
                <AvatarImage src={user?.avatar}/>
              </Avatar>
            ) : (
              <Avatar className="h-32 w-32">
                  <AvatarFallback>{((user?.firstname?.[0] || '') + (user?.lastname?.[0] || '')).toUpperCase()}</AvatarFallback>
              </Avatar>
            )}
          </div>
          <div>
            <p className="mt-3 text-center text-lg font-semibold text-black dark:text-white ">
              {user?.firstname}
            </p>
            <p className="text-center text-base text-gray-600">Online</p>
          </div>
        </div>

        {sidebarMenuItems.map((item, index) => (
          <div
            key={index}
            className="mt-2 mx-2 hover:bg-primary hover:dark:bg-[#303030] py-2 px-4 rounded-lg dark:border-gray-800 transition-all cursor-pointer"
          >
            <div
              onClick={() => router.push(`/u/${user?.username}${item?.link}`)}
              className="flex gap-3 items-center"
            >
              <div>
                <span className="text-gray-500 dark:text-white ">
                  {" "}
                  {item.icon}{" "}
                </span>
              </div>
              <div className="ml-3 min-w-0">
                <p className="truncate text-sm text-gray-800 dark:text-white ">
                  {item.title}
                </p>
                <p className="truncate text-sm text-gray-500">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </QuickyLayout>
  );
};

export default UserProfilePage;
