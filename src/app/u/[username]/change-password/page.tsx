"use client";

import { QuickyLayout } from "@/components/Layout/QuickyLayout";
import { ChevronLeft, Camera, Check, X } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { useCurrentUser } from "../../../../../hooks/user";
import { graphqlClient } from "../../../../../clients/api";
import { changePasswordMutation, updateUserProfileDetailsMutation } from "../../../../../graphql/mutation/user";
import {
  UpdateUserProfileDetailsInput,
  User,
} from "../../../../../gql/graphql";

import { useRouter } from "next/navigation";

const ProfileEdit = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  //Update user details
  const [password, setPassword] = useState({
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handlePasswordChange = async() => {
    try {
      const response = await changePasswordFn(password.oldpassword , password.newpassword , password.confirmpassword)
      console.log("responsepassword",response)
    } catch (error) {
      console.log("error", error)
    }
  }


  return (
    <QuickyLayout>
      <div className="h-screen overflow-y-scroll scrollbar-style">
        <div className="flex items-center gap-5 border-b-[0.1px] w-full px-4 py-4">
          <div onClick={handleBackClick} className="cursor-pointer">
            <ChevronLeft size={24} className="text-black dark:text-white " />
          </div>

          <div>
            <p className="text-lg text-black dark:text-white">
              Change password
            </p>
          </div>
        </div>

        <div className="Image Change mt-4">
          <div className="input-wrapper mt-12 w-full">
            <form onSubmit={handlePasswordChange} className="w-full flex flex-col items-center gap-10 ">
              <div className="w-full input-field flex justify-center">
                <input
                  onChange={handleChange}
                  className="flex h-12 w-11/12 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  value={password.oldpassword}
                  placeholder="Old Password"
                  name="oldpassword"
                />
              </div>
              <div className="input-field w-full flex justify-center">
                <input
                  onChange={handleChange}
                  value={password.newpassword}
                  className="flex h-12 w-11/12 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="New Password"
                  name="newpassword"
                />
              </div>

              <div className="input-field w-full flex justify-center">
                <input
                  onChange={handleChange}
                  value={password.confirmpassword}
                  className="flex h-12 w-11/12 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                />
              </div>

              <div className="submit-button w-full flex justify-center">
                <button
                  type="submit"
                  className="w-11/12 rounded-full bg-black dark:bg-white px-3 py-3 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Change password
                </button>
              </div>
            </form>
          </div>

          <div className="w-11/12 text-center my-12  text-black dark:text-white px-4 py-2 rounded-lg">
            <span className="text-xs">
              Use a combination of uppercase and lowercase letters, numbers, and
              symbols
            </span>
          </div>
        </div>
      </div>
    </QuickyLayout>
  );
};

export default ProfileEdit;

const changePasswordFn = async (oldPassword :string, newPassword :string, confirmPassword :string) => {
  try {
    const response = await graphqlClient.request(changePasswordMutation, {oldPassword , newPassword , confirmPassword});
    return response.changePassword
  } catch (error) {
    console.error("Error while changing password", error);
    return null;
  }
};
