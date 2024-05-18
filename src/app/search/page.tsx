'use client';

import { QuickyLayout } from "@/components/Layout/QuickyLayout";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { User } from "../../../gql/graphql";
import { graphqlClient } from "../../../clients/api";
import { getUserByUsernameQuery } from "../../../graphql/query/user";
import { NextPage } from "next";
import Image from "next/image";
import { useCreateChatWithUser } from "../../../hooks/user";


interface SearchPageProps {
  userInfo?: User;
}

const SearchPage: NextPage<SearchPageProps> = () => {

  // const [searchQuery , setSearchQuery] = useState('');
  // const [searchedUsers, setSearchedUsers] = useState<User[] | null>(null);


  // const getSearchUser = async(e:any) => {
  //   setSearchQuery(e.target.value)
  //   try {
  //       const users: User[] | null = await fetchSearchQueryResult(searchQuery)
  //       setSearchedUsers(users)
  //   } catch (error) {
  //       console.error("Error occured" , error)
  //   }
  // };

  // // console.log(searchedUsers)

  // //Create Chat With User Code Starts here
  // const {mutate} = useCreateChatWithUser()

  // const [clickedUserId , setClickedUserId] = useState('')

  // const createNewChatWithUser = async() => {
  //   try {
  //     mutate({
  //      recieverId: clickedUserId
  //    });
     
  //    console.log('Registration successful!');
  //  } catch (error) {
  //    console.error('Registration error:', error);
  //  }
  // };

  return (
    <QuickyLayout>
    <>
      <div className={`sticky w-full mt-3 h-14 z-10 top-0 `}>
        {" "}
        <div className={`flex w-full h-[50px] items-center`}>
          <label
            htmlFor="search"
            className={`flex w-full rounded-full bg-white search`}
          >
            <div className="w-[44px] flex justify-center items-center pl-2 ">
              <div>
                <Search className="text-[1.2rem] text-[#898989]" />
              </div>
            </div>
            <div className="w-full flex items-center">
              <input
                // onChange={getSearchUser}
                // value={searchQuery}
                className="bg-white w-full flex h-[42px] rounded-full border px-3 py-2 text-sm placeholder:text-[#898989] focus:outline-none outline-none border-none disabled:cursor-not-allowed disabled:opacity-50  text-[#898989]"
                type="text"
                id="search"
                placeholder="Search"
                autoComplete="off"
              ></input>
            </div>
          </label>
        </div>
      </div>

      {/* Users Search Rendering Starts Here  */}
      {/* {searchedUsers && searchedUsers.map((user)=> (
        <div onClick={()=>setClickedUserId(user?.id)} key={user?.id} className={`border-[0.7px] bg-white px-4 rounded-lg py-2 my-3 cursor-pointer shadow-md`}>
          <div onClick={createNewChatWithUser} className="flex gap-4 items-center">
              <div className="w-14 h-14 flex flex-col justify-center">
                {user && user?.avatar &&
                      <Image
                          priority= {false}
                          className="inline-block h-12 w-12 rounded-full"
                          src={user?.avatar}
                          alt="avatar"
                          height={20}
                          width={20}
                      />
                }   
              </div>
              <div className="w-full">
                  <div className="flex gap-1">
                      <h5 className="text-[15px] font-medium"> {user?.firstname}  </h5>
                      <h5 className="text-[15px] font-medium">{user?.lastname}</h5>
                  </div>
                  <div className='flex justify-between'>
                      <p className='text-sm text-gray-600'>{user?.username}</p>
                      <div className='flex justify-end'>
                          <span className='text-xs'></span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    ))} */}
    {/* Users Search Rendering Ends Here  */}


      
    </>
    </QuickyLayout>
  );
};

export default SearchPage;


// export const fetchSearchQueryResult = async (username: string) => {
//     try {
//         const userInfo = await graphqlClient.request(getUserByUsernameQuery, { username });
//         if (!userInfo || !userInfo.getUserByUsername) {
//           console.warn(`No user found with Username: ${username}`);
//           return null;
//         }
    
//         const user: User[] = userInfo.getUserByUsername as User[];
//         return user;
//     } catch (error) {
//         console.error('Error fetching user information:', error);
//         return null;
//     }
// };