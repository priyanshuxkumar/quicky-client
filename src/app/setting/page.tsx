'use client';

import { QuickyLayout } from "@/components/Layout/QuickyLayout";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Setting = () => {
  const router = useRouter()

  const handleLogout = () => {
    toast.loading("Logging out...", { id: "2" });
    localStorage.removeItem("__token__");
    toast.success("Logout successfull...", { id: "2" });
    router.push("/");
  };
  return (
    <QuickyLayout>
      <>
        <div>
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

          <div onClick={handleLogout} className="mx-3 px-4 text-red-500 cursor-pointer">
            Logout
          </div>
        </div>
      </>
    </QuickyLayout>
  );
};

export default Setting;
