import { AtSign, X } from "lucide-react";

import Image from "next/image";

//Recipient User Info Container
const UserProfileContainer = ({ handleUserInfoContainer , user }) => {
  return (
    <div className="right-container">
      <div className="user-info">
        <div className="top-bar flex w-full px-4 py-4 gap-6 items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div onClick={handleUserInfoContainer} className="cursor-pointer">
              <X size={24} className="text-black dark:text-white " />
            </div>

            <div>
              <p className="text-black text-md dark:text-white ">
                User info
              </p>
            </div>
          </div>
        </div>

        <div className="w-full my-4">
          <div className="flex justify-center">
            {user && user.avatar && (
              <Image
                priority={false}
                className="h-24 w-24 rounded-full object-cover"
                src={user?.avatar}
                alt="user_avatar"
                width={30}
                height={30}
              />
            )}
          </div>
          <div>
            <p className="mt-3 text-center text-lg font-semibold text-black dark:text-white ">
              {user?.firstname}
            </p>
            <p className="text-center text-base text-gray-600 dark:text-slate-200">Online</p>
          </div>
        </div>

        <div className="flex gap-1 items-center px-6 mt-10">
          <div>
            <span className="text-gray-500 dark:text-white ">
              {" "}
              <AtSign />{" "}
            </span>
          </div>
          <div className="ml-3 min-w-0">
            <p className="truncate text-xs text-gray-800 dark:text-white ">
              Username
            </p>
            <p className="truncate text-sm text-gray-500 dark:text-slate-300">{user?.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileContainer;
