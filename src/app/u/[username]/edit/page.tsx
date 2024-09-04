"use client";

import { QuickyLayout } from "@/components/Layout/QuickyLayout";
import { ChevronLeft, Camera, Check, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { useCurrentUser } from "../../../../../hooks/user";
import { graphqlClient } from "../../../../../clients/api";
import { updateUserProfileDetailsMutation } from "../../../../../graphql/mutation/user";
import { UpdateUserProfileDetailsInput, User } from "../../../../../gql/graphql";
import { checkIsUsernameUnique } from "@/app/signup/page";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { getSignedUrlOfAvatarQuery } from "../../../../../graphql/query/user";

const ProfileEdit = () => {

  const { user } = useCurrentUser();
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const [imageURL , setImageURL] = useState('')


  const handleInputChangeFile = useCallback((input:HTMLInputElement)=> {
    return async(event:Event) => {
      event.preventDefault()

      const file:File|undefined|null|string = input?.files?.item(0)
      if(!file)return

      //TODO - Handle getSigned Url functionality
      const {getSignedUrlOfAvatar} = await graphqlClient.request(getSignedUrlOfAvatarQuery , {
        imageType: file.type,
        imageName: file.name,
      });

      if(getSignedUrlOfAvatar){
        toast.loading("Uploading Image...", { id: "1" });
        await axios.put(getSignedUrlOfAvatar , file , {
          headers: {
            'Content-Type': file.type
          }
        })
        // toast.success('Upload successfully' , {id: '1'})
        const url = new URL(getSignedUrlOfAvatar)
        const myFilePath = `${url.origin}${url.pathname}`
        setImageURL(myFilePath)
      }
    }
  },[]);

  const handleSelectAvatar = useCallback(()=> {
    const input = document.createElement('input')
    input.setAttribute('type' , 'file')
    input.setAttribute('accept', 'image/*')

    const avatarHandlerFn = handleInputChangeFile(input)
    input.addEventListener('change' , avatarHandlerFn)

    input.click()
  },[handleInputChangeFile])


  //Update user details
  const [userDetails, setUserDetails] = useState({
    firstname: user?.firstname ,
    lastname: user?.lastname,
    username: user?.username,
    avatar: user?.avatar

  });

  useEffect(() => {
    if (user) {
      setUserDetails({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        username: user.username || '',
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  const [isUsernameUnique , setIsUsernameUnique] = useState<boolean | null | undefined>(false);

  useEffect(() => {
    const handleIsUsernameValid = async() => {
      try {
        const usernameValid = await checkIsUsernameUnique(userDetails?.username || "")
        setIsUsernameUnique(usernameValid?.checkUsernameIsValid)
      } catch (error) {
          console.error("Error occured" , error)
      }
    };
    handleIsUsernameValid()
  }, [userDetails.username]);
  

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };



 const handleUpdateDetails = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const variables = {
        firstname: userDetails.firstname,
        lastname: userDetails.lastname ,
        username: userDetails.username,
        avatar: imageURL
      }
      const response = await updateUserProfileDetailsFn(variables)
      console.log(response)
      if(response) {
        router.back()
        toast.success("Profile updated successfully")
      }
    } catch (error) {
      console.error("Error occured while updating details:", error);
    }
  };
  return (
    <QuickyLayout>
      <div className="h-screen overflow-y-scroll scrollbar-style">
        <div className="flex items-center gap-5 border-b-[0.1px] w-full px-4 py-4">
          
            <div onClick={handleBackClick} className="cursor-pointer">
              <ChevronLeft size={24} className="text-black dark:text-white " />
            </div>
          
          <div>
            <p className="text-lg text-black dark:text-white">Edit profile</p>
          </div>
        </div>

        <div className="Image Change mt-4">
          <div className="flex justify-center relative">
            {user && user.avatar && (
              <Image
                priority={true}
                className="h-32 w-32 rounded-full object-cover opacity-50 blur-sm"
                src={user?.avatar}
                alt="user avatar"
                width={10}
                height={10}
              />
            )}
              <Camera onClick={handleSelectAvatar} size={36} className="absolute top-[32%] cursor-pointer text-black dark:text-[#bdbdbd] " />
          </div>
          <div className="input-wrapper mt-12 w-full">
            <form onSubmit={handleUpdateDetails} className="w-full flex flex-col items-center gap-10 ">
              <div className="w-full input-field flex justify-center">
                <input
                    onChange={handleChange}
                    className="flex h-12 w-11/12 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    value={userDetails?.firstname}
                    placeholder="Firstname"
                    name="firstname"
                />
              </div>
              <div className="input-field w-full flex justify-center">
                <input
                    onChange={handleChange}
                    className="flex h-12 w-11/12 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    value={userDetails?.lastname}
                    placeholder="Lastname (Optional)"
                    name="lastname"
                />
              </div>
              <div className="input-field w-11/12 flex justify-center items-center border border-gray-300 rounded-md">
                <label htmlFor="username" className="w-full">
                  <input
                      onChange={handleChange}
                      className="flex h-12 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:border-none focus:outline-none"
                      type="text"
                      value={userDetails?.username}
                      placeholder="Username"
                      name="username"
                  />
                </label>
                {userDetails?.username && userDetails.username != user?.username && (isUsernameUnique ? (<div className="px-2"><Check size={20} className="text-green-800 dark:text-green-300"/></div>) :  (<div className="px-2"><X className="text-red-800 dark:text-red-300" size={20}/></div>))}
                {/* {userDetails.username && isUsernameUnique ? (<div className="px-2"><Check size={20} className="text-green-800 dark:text-green-300"/></div>) :  (<div className="px-2"><X className="text-red-800 dark:text-red-300" size={20}/></div>)} */}
              </div>

              {(user?.username != userDetails.username || user?.firstname != userDetails.firstname || user?.lastname != userDetails.lastname || userDetails.avatar !== imageURL) && 
              <div className="submit-button w-full flex justify-center">
                <button type="submit" className="w-11/12 rounded-full bg-black dark:bg-white px-3 py-3 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Done</button>
              </div>}


            </form>
          </div>

          <div className="w-11/12 text-center my-12  text-black dark:text-white px-4 py-2 rounded-lg">
            <span className="text-xs">You can choose a username for your account. This will allow others to find and contact you easily.<br></br>You can use <b>a–z</b> (lowercase), <b>0–9</b>, underscores, and periods. The username must be between <b>3 and 15 characters</b> in length.</span>
          </div>


        </div>
      </div>
    </QuickyLayout>
  );
};

export default ProfileEdit;


const updateUserProfileDetailsFn = async(payload: UpdateUserProfileDetailsInput) => {
    try {
      const user = await graphqlClient.request(updateUserProfileDetailsMutation, {payload});
  
      if(!user) {
        return 
      }
      return user.updateUserProfileDetails;
    } catch (error) {
      console.error("Error fetching user information:", error);
      return null;
    }
};