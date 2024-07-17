import { AtSign, X } from "lucide-react";

import Image from "next/image";
import { User } from "../../../gql/graphql";
import { useFetchSharedMediaOfChat } from "../../../hooks/user";

//Recipient User Info Container
const UserProfileContainer = ({ handleUserInfoContainer , user } : {handleUserInfoContainer: React.FC , user: User}) => {
  const {isLoading, mediaOfChat} = useFetchSharedMediaOfChat();
  return (
    <div className="right-container dark:bg-dark-primary-bg h-screen overflow-y-scroll scrollbar-style">
      <div className="user-info">
        <div className="top-bar bg-white dark:bg-dark-primary-bg flex w-full px-4 py-5 gap-6 items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div onClick={handleUserInfoContainer} className="cursor-pointer">
              <X size={24} className="text-black dark:text-white " />
            </div>

            <div>
              <p className="text-black text-md dark:text-white ">User info</p>
            </div>
          </div>
        </div>

        <div className="w-full my-4 dark:bg-dark-primary-bg">
          <div className="flex justify-center">
            {user && user.avatar && (
              <Image
                priority={false}
                className="h-24 w-24 rounded-full object-cover ring-2 ring-accent-color ring-offset-2 dark:ring-offset-black"
                src={user?.avatar}
                alt="user_avatar"
                width={30}
                height={30}
              />
            )}
          </div>
          <div className="dark:bg-dark-primary-bg">
            <p className="mt-3 text-center text-lg font-semibold text-black dark:text-white ">
              {user?.firstname} {""} {user?.lastname}
            </p>
            <p className="text-center text-base text-gray-600 dark:text-slate-200">
              Online
            </p>
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
            <p className="truncate text-sm text-gray-500 dark:text-slate-300">
              {user?.username}
            </p>
          </div>
        </div>

        {/* Render all media of this chat starts */}
        <div className="mt-5 dark:bg-dark-primary-bg">
          <div className="px-3 py-4  dark:bg-dark-primary-bg">
            <p className="font-semibold text-base">Media</p>
          </div>

          {isLoading && <p>Loading...</p>}
          <div className="flex flex-wrap">
            {mediaOfChat && mediaOfChat.map((item) => (
              <div key={item?.id} className="w-1/3 h-32 flex border border-black">
                {item && item.shareMediaUrl && 
                  <Image
                    className="w-full h-full object-cover"
                    src={item?.shareMediaUrl}
                    width={50}
                    height={50}
                    alt="shared-media"
                  />
                }
              </div>
            ))}
          </div>
        </div>
        {/* Render all media of this chat ends */}
      </div>
    </div>
  );
};

export default UserProfileContainer;
