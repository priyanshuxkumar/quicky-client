"use client";

import ChatCard from "@/components/ChatCard/index";
import { QuickyLayout } from "@/components/Layout/QuickyLayout";
import { useChatContext } from "@/context/ChatIdContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import ChatCardSkeleton from "@/components/ChatCardSkeleton";
import { useRouter } from "next/navigation";
import { getUserByUsernameQuery } from "../../../graphql/query/user";
import { User, Chat } from "../../../gql/graphql";
import { useCurrentUser, useFetchAllChats } from "../../../hooks/user";
import { graphqlClient } from "../../../clients/api";
import MessagesRenderPage from "./u/[username]/page";

export default function Chats() {
  const router = useRouter();
  const { user, isLoading } = useCurrentUser();

  useEffect(() => {
    const isUserLogin = () => {
      if (!isLoading && !user) {
        router.push("/login");
      }
    };
    isUserLogin();
  }, [isLoading, user, router]);

  const { chats } = useFetchAllChats();

  const { setSelectedChatId, setIsChatBoxOpen, setRecipientUser } =
    useChatContext();

  const handleSelectedChat = (chatId: string | any) => {
    setSelectedChatId(chatId);
    setIsChatBoxOpen(true);
  };

  //Search user code starts here
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedUsers, setSearchedUsers] = useState<User[] | null>(null);

  const getSearchUser = async (e: any) => {
    setSearchQuery(e.target.value);
    try {
      const users: User[] | null = await fetchSearchQueryResult(searchQuery);
      setSearchedUsers(users);
    } catch (error) {
      console.error("Error occured", error);
    }
  };

  const [searchedUser, setSearchedUser] = useState<User | null>(null);

  const handleSearchUserClickActions = () => {
    setIsChatBoxOpen(true);
    setRecipientUser(searchedUser);
    setSelectedChatId(searchedUser?.users[0]?.chat?.id); //search user chatID
  };

  return (
    <>
    <div>
      <QuickyLayout>
        {/* <div className=""> */}
          <div className={`w-full my-2 `}>
            {" "}
            <div className={`flex w-full items-center px-1 py-3 `}>
              <div className="w-full flex items-center">
                <input
                  onChange={getSearchUser}
                  value={searchQuery}
                  className="transition duration-500 flex h-11 w-full rounded-xl border  bg-transparent px-5 py-2 text-base placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-800  focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  id="search"
                  placeholder="Search"
                  autoComplete="off"
                ></input>
              </div>
            </div>
          </div>

          {searchQuery && searchQuery?.length ? (
            <div className="searched users result min-h-screen">
              {searchedUsers &&
                searchedUsers.map((user) => (
                  <div
                    onClick={() => setSearchedUser(user)}
                    key={user?.id}
                    className={`bg-white dark:bg-[#303030] rounded-2xl px-4  py-2 my-3 cursor-pointer`}
                  >
                    <div
                      onClick={handleSearchUserClickActions}
                      className="flex gap-4 items-center"
                    >
                      <div className="w-14 h-14 flex flex-col justify-center">
                        {user && user?.avatar && (
                          <Image
                            priority={false}
                            className="inline-block h-12 w-12 rounded-full"
                            src={user?.avatar}
                            alt="avatar"
                            height={20}
                            width={20}
                          />
                        )}
                      </div>
                      <div className="w-full">
                        <div className="flex gap-1">
                          <h5 className="text-[15px] font-medium dark:text-white">
                            {" "}
                            {user?.firstname}{" "}
                          </h5>
                          <h5 className="text-[15px] font-medium dark:text-white">
                            {user?.lastname}
                          </h5>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-600 dark:text-white">
                            {user?.username}
                          </p>
                          <div className="flex justify-end">
                            <span className="text-xs"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="chats-column mt-4 bg-white dark:bg-[#212121] rounded-2xl h-[85%] overflow-y-scroll overflow-x-hidden no-scrollbar">
              <h1 className="font-bold text-3xl my-5 px-7 dark:text-white">
                Chats
              </h1>
              {chats ? (
                chats.map((chat) => (
                  <ChatCard
                    onClick={() => handleSelectedChat(chat?.id)}
                    key={chat?.id}
                    data={chat as Chat}
                  />
                ))
              ) : (
                <ChatCardSkeleton />
              )}
            </div>
          )}
        {/* </div> */}
      </QuickyLayout>
    </div>
    </>
  );
}

//Search User function
export const fetchSearchQueryResult = async (username: string) => {
  try {
    const userInfo = await graphqlClient.request(getUserByUsernameQuery, {
      username,
    });
    if (!userInfo || !userInfo.getUserByUsername) {
      console.warn(`No user found with Username: ${username}`);
      return null;
    }

    const user: User[] = userInfo.getUserByUsername as User[];
    return user;
  } catch (error) {
    console.error("Error fetching user information:", error);
    return null;
  }
};
