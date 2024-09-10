"use client";

import ChatCard from "@/components/ChatCard/index";
import { QuickyLayout } from "@/components/Layout/QuickyLayout";
import { useChatContext } from "@/context/ChatContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserByUsernameQuery } from "../../../graphql/query/user";
import { User, Chat } from "../../../gql/graphql";
import { useCurrentUser, useFetchAllChats } from "../../../hooks/user";
import { graphqlClient } from "../../../clients/api";
import Loading from "../../components/loading";
import Story from "@/components/Story";
import {useFetchStories } from "../../../hooks/story";
import SearchUser from "@/components/SearchUsers";



export default function Chats() {
  const router = useRouter();

  const { user } = useCurrentUser();

  //checking user is authenticated or not
  useEffect(() => {
    const isUserLogin = () => {
      if (!window.localStorage.getItem("__token__") && !user) {
        router.replace("/");
      }
    };
    isUserLogin();
  },[router , user]);

  const { isLoading , chats } = useFetchAllChats();

  const { setSelectedChatId, setIsChatBoxOpen, setRecipientUser , latestMessages } = useChatContext();

  
  const handleSelectedChat = useCallback(async(chatId: string | any) => {
    setSelectedChatId(chatId);
    setIsChatBoxOpen(true);
  },[setIsChatBoxOpen , setSelectedChatId]);



  //Search user code starts here
  const [searchQuery, setSearchQuery] = useState("");

  //All searched users
  const [searchedUsers, setSearchedUsers] = useState<User[] | null>(null);


  const [isUserSearchLoading , setIsUserSearchLoading ] = useState(false);

  const getSearchUser = useCallback(async(e: any)=> {
    setIsUserSearchLoading(true)
    setSearchQuery(e.target.value);
    try {
      const users: User[] | null = await fetchSearchQueryResult(searchQuery);
      setSearchedUsers(users);
      setIsUserSearchLoading(false)
    } catch (error) {
      setIsUserSearchLoading(false);
      console.error("Error occured", error);
    }
  },[searchQuery]);



  const handleSearchUserClickActions = useCallback(async(user: User)=> {
    setIsChatBoxOpen(true);
    if(user.id){
      setRecipientUser(user as User);
      router.replace(`#${user?.username}`)
      const recipientUserChatsIds = user.users?.map((chat)=> chat?.chat?.id);
      
      const currentUserChatsIds = chats?.map((chat)=> chat.id);

      if(recipientUserChatsIds && currentUserChatsIds){
        const chatIdWithSearchUser = recipientUserChatsIds?.filter(id => currentUserChatsIds?.includes(id as string))
        setSelectedChatId(chatIdWithSearchUser[0] || "")
      }
    }
    setSearchQuery("");
  },[chats, router, setIsChatBoxOpen, setRecipientUser, setSelectedChatId]);


  //Fetching all Chats Users stories
  const {stories} = useFetchStories();
  return (
    <>
    <div>
      <QuickyLayout>
          <div className={`mx-3 my-2 `}>
            {" "}
            <div className={`flex w-full items-center px-1 py-3 `}>
              <div className="w-full flex items-center">
                <input
                  onChange={getSearchUser}
                  value={searchQuery}
                  className="transition duration-500 flex h-11 w-full rounded-full border bg-white dark:bg-dark-secondary px-5 py-2 text-base placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-600  focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  id="search"
                  placeholder="Search people's"
                  autoComplete="off"
                ></input>
              </div>
            </div>
          </div>

          {/* Search User  */}
          {searchQuery && searchQuery?.length ? (
            
           <SearchUser searchedUsers={searchedUsers} isUserSearchLoading={isUserSearchLoading} handleSearchUserClickActions={handleSearchUserClickActions}/>            

          ) : (
            <div className="chats-column mt-4 bg-white dark:bg-dark-primary-bg rounded-2xl h-[85%] overflow-y-scroll overflow-x-hidden no-scrollbar">
              {/* User Stories  */}
              <div className="user-stories-container mb-6">
                <p className="flex font-semibold items-center gap-2 text-xl my-1 px-4 text-black  dark:text-gray-400 tracking-tight">
                  Story
                </p>

                <div className="Stories-Row flex overflow-scroll no-scrollbar">
                  <div className="my-story">
                    <Story storyUser={user} currentUserStory='true'/>
                  </div>
                  <div className="all-user-stories flex justify-start">
                    {stories && stories.map((user)=> <Story key={user?.id} storyUser={user} currentUserStory='false'/>)}
                  </div>
                </div>

              </div>

              <p className="flex font-semibold items-center gap-2 text-xl my-1 px-4 text-black  dark:text-gray-400 tracking-tight">
               Chats
              </p>
              {chats && chats.map((chat) => (<ChatCard
                  latestMessage={latestMessages[chat?.id] }
                  onClick={() => handleSelectedChat(chat?.id)}
                  key={chat?.id}
                  data={chat as Chat}/>)
              )}
   
              {/* State when no chat exists  */}
              {chats && chats.length === 0 && 
              <div className="flex justify-center items-center h-full">
                   <span className="text-2xl dark:text-white font-medium">No Chats available</span>
              </div>
              }


              {/* Chat Loading State */}
              { isLoading && 
              <div className="flex justify-center items-center h-full">
                   <Loading size={36} width={2}/>
              </div>
              }

            </div>
          )}
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
    throw error;
  }
};
