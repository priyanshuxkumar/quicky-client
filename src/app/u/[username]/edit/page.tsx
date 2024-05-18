"use client";

import { QuickyLayout } from "@/components/Layout/QuickyLayout";
import { ChevronLeft, Camera } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

import { useCurrentUser } from "../../../../../hooks/user";

const ProfileEdit = () => {
  const { user } = useCurrentUser();

  return (
    <QuickyLayout>
      <div>
        <div className="border-b-[0.1px] w-full px-4 py-4">
          <Link href={"/chats"}>
            <div className="cursor-pointer">
              <ChevronLeft size={24} className="text-black dark:text-white " />
            </div>
          </Link>
        </div>

        <div className="Image Change mt-4">
          <div className="flex justify-center">
            {user && user.avatar && (
              <Image
                className="h-32 w-32 rounded-full object-cover opacity-50"
                src={user?.avatar}
                alt=""
                width={100}
                height={100}
              />
            )}
          
          <label
            htmlFor="profileedit"
            className="items-center justify-start z-50 py-[5px] rounded-full gap-[1rem] font-medium text-lg text-white"
          >
            <Camera size={48} className="text-black dark:text-white " />
          </label>
          <div className="mt-1 hidden">
            <input
              className="hidden h-10 w-[300px] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="file"
              name="profileedit"
              id="profileedit"
            ></input>
          </div>
          </div>


        </div>
      </div>
    </QuickyLayout>
  );
};

export default ProfileEdit;
