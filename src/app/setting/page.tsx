import { QuickyLayout } from "@/components/Layout/QuickyLayout";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const Setting = () => {
  return (
    <QuickyLayout>
      <>
        <div className="">
          <div className="flex border-b-[0.1px] w-full px-4 py-4 gap-6 items-center sticky top-0 z-10">
            <Link href={"/chats"}>
              <div className="cursor-pointer">
                <ChevronLeft size={24} className="text-black dark:text-white" />
              </div>
            </Link>
            <div>
              <p className="text-black dark:text-white text-lg">Settings</p>
            </div>
          </div>

          <div className="my-4 mx-3 bg-primary dark:bg-[#303030] py-3 px-4 rounded-xl  transition-all">
            <div className="flex gap-3 items-center justify-between">
              <div>
                <span className="text-black font-medium dark:text-white">Dark Mode</span>
              </div>
              <ThemeSwitcher/>  
            </div>
          </div>
        </div>
      </>
    </QuickyLayout>
  );
};

export default Setting;
