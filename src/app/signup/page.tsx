"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser, useLoginUser, useRegisterUser } from "../../../hooks/user";

import { Eye , Check ,X } from 'lucide-react';
import toast from "react-hot-toast";

import Link from "next/link";
import { signUpValidation} from "@/schemas/signUpSchema";
import { graphqlClient } from "../../../clients/api";
import { checkEmailIsValidQuery, checkUsernameIsValidQuery } from "../../../graphql/query/user";
import { sendOTPVerificationEmailMutation, verifyOTPMutation } from "../../../graphql/mutation/user";
import EmailPage from "./verify/[username]/page";
import Loading from "../../components/loading";

const Page = () => {
    //Checking if the user is already logged in or not
    const router = useRouter();
    
    //Checking if the user is already logged in or not
    useEffect(() => {
      const isUserLogin = () => {
        if (window.localStorage.getItem("__token__")) {
          router.push("/chats");
        }
      };
      isUserLogin();
    }, [router]);


  const { mutate } = useRegisterUser();

  const [currentStep, setCurrentStep] = useState(1);

  const [isSubmitting , setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  //OTP 
  const [otp , setOtp] = useState("")

  //Password Hide or not
  const [isPasswordVisible , setIsPasswordVisible] = useState(false)

  //Check is Email Unique
  const [isEmailUnique, setIsEmailUnique] = useState<boolean | null | undefined>(false);

  

  useEffect(() => {
    const handleIsEmailValid = async() => {
      try {
        const emailValid = await checkIsEmailUnique(formData.email)
        setIsEmailUnique(emailValid?.checkEmailIsValid)
      } catch (error) {
          console.error("Error occured" , error)
      }
    };
    handleIsEmailValid()
  }, [formData.email]);

  //Check is Username Unique
  const [isUsernameUnique, setIsUsernameUnique] = useState<boolean | null | undefined>(false);

  useEffect(() => {
    const handleIsUsernameValid = async() => {
      try {
        const usernameValid = await checkIsUsernameUnique(formData.username)
        setIsUsernameUnique(usernameValid?.checkUsernameIsValid)
      } catch (error) {
          console.error("Error occured" , error)
      }
    };
    handleIsUsernameValid()
  }, [formData.username]);

  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleOTPVerificationEmailSend = async (e:{ preventDefault: () => void }) => {
    e.preventDefault()
    setIsSubmitting(true)
   try {
      const res = await sendOTPVerificationEmail(formData.email)
      console.log(res);
      toast.success('Message sent successfully!');
      if(res?.sendOTPVerificationEmail.message == "OTP sent successfully!"){
        setIsSubmitting(false)
        setCurrentStep(()=> currentStep + 1)
      }
   } catch (error) {
    setIsSubmitting(false)
      console.error("Error occured while sending email.Try again :", error);
      return null;
   }
  };

  const handleVerifyOtp = async(e:{ preventDefault: () => void }) => {
    setIsSubmitting(true)
    e.preventDefault()
    try {
      const res = await verifyOTP(formData.email, otp)
      if(res?.verifyOTP.message === "OTP verified successfully!"){
        await handleRegisterForm()
        setIsSubmitting(false)
        router.push('/')
      }
    } catch (error) {
      setIsSubmitting(false)
      console.error("Error occured while OTP verification:", error);
      return null;
    }
  }

  const handleRegisterForm = async () => {
    try {
      const validatedData = signUpValidation.parse(formData);
      mutate({
        firstname: validatedData.firstname,
        lastname: validatedData.lastname,
        email: validatedData.email,
        username: validatedData.username,
        password: validatedData.password,
      });
    } catch (error) {
      console.error("Error occured while user signup:", error);
    }
  };

  return (
    <>
    {currentStep === 1 && 
    (<section>
      <div className="dark:bg-dark-primary-bg h-screen flex items-center justify-center px-4 py-4 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-4 flex justify-center">
            <h1 className="font-bold text-4xl">Quicky</h1>
          </div>
          <h2 className="text-center text-lg font-semibold leading-tight text-black dark:text-white">
            Sign up to create account
          </h2>
          <p className="mt-1 text-center text-base text-gray-600 dark:text-gray-200">
            Already have an account?{" "}
            <Link
              href="/"
              className="font-medium text-black transition-all duration-200 hover:underline dark:text-white"
            >
              Sign In
            </Link>
          </p>
          <form className="mt-8">
            <div className="space-y-5">
            
              <div className="mt-2 flex justify-between items-center border border-gray-300 rounded-md px-2 dark:text-white">
                <label htmlFor="lastname" className="w-full">
                  <input
                    onChange={handleChange}
                    value={formData.email}
                    name="email"
                    className="flex h-10 w-full px-2 py-2 text-sm focus:border-none focus:outline-none bg-transparent"
                    type="email"
                    placeholder="Email"
                    id="email"
                  ></input>
                </label>
                 {formData.email && (isEmailUnique ? (<div><Check size={20} className="text-green-800"/></div>) :  (<div><X className="text-red-800" size={20}/></div>))}
              </div>

              <div className="mt-2 flex justify-between items-center border border-gray-300 rounded-md px-2">
                <label htmlFor="firstname" className="w-full">
                  <input
                    onChange={handleChange}
                    value={formData.firstname}
                    name="firstname"
                    className="flex h-10 w-full bg-transparent px-2 py-2 text-sm focus:border-none focus:outline-none"
                    type="text"
                    placeholder="Firstname"
                    id="firstname"
                  ></input>
                </label>
                { formData.firstname && <div><Check size={20} className="text-green-800"/></div>}
                
              </div>

              <div className="mt-2 flex justify-between items-center border border-gray-300 rounded-md px-2">
                <label htmlFor="lastname" className="w-full">
                  <input
                    onChange={handleChange}
                    value={formData.lastname}
                    name="lastname"
                    className="flex h-10 w-full bg-transparent px-2 py-2 text-sm focus:border-none focus:outline-none"
                    type="text"
                    placeholder="Lastname"
                    id="lastname"
                  ></input>
                </label>
                {formData.lastname && <div><Check size={20} className="text-green-800"/></div>}
              </div>

              <div className="mt-2 flex justify-between items-center border border-gray-300 rounded-md px-2">
                <label htmlFor="username" className="w-full">
                  <input
                    onChange={handleChange}
                    value={formData.username}
                    name="username"
                    className="flex h-10 w-full bg-transparent px-2 py-2 text-sm focus:border-none focus:outline-none"
                    type="text"
                    id="username"
                    placeholder="Username"
                  ></input>
                </label>
                {formData.username.length >= 3 && (isUsernameUnique ? (<div><Check size={20} className="text-green-800"/></div>) :  (<div><X className="text-red-800" size={20}/></div>))}
              </div>
            
              <div className="mt-2 flex justify-between items-center border border-gray-300 rounded-md px-2">
                <label htmlFor="password" className="w-full">
                  <input
                    onChange={handleChange}
                    value={formData.password}
                    name="password"
                    className="flex h-10 w-full bg-transparent px-2 py-2 text-sm focus:border-none focus:outline-none"
                    type= {isPasswordVisible ? 'type' : 'password'}
                    placeholder="Password"
                    id="password"
                  ></input>
                </label>
                <div onClick={()=> setIsPasswordVisible(!isPasswordVisible)}>{formData.password && <Eye size={20} className="cursor-pointer"/>}</div>
                {formData.password && <div className="ml-3"><Check size={20} className="text-green-800"/></div>}
              </div>

              <div>
                <button
                  disabled={!formData.email || !formData.firstname || !formData.lastname || !formData.password || !formData.username}
                  onClick={handleOTPVerificationEmailSend}
                  className={`inline-flex h-10 w-full items-center justify-center rounded-md bg-black dark:text-black dark:bg-white px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 cursor-pointer`}
                >
                  {isSubmitting ? (<> <Loading size={28} width={2}/>  Please wait </>): ('Signup')}                  
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>)
    }
    {currentStep === 2 && <EmailPage otp={otp} setOtp={setOtp} handleVerifyOtp={handleVerifyOtp}/>}
  </>
  );
};

export default Page;


export const checkIsUsernameUnique = async (username: string) => {
  try {
    const isUsernameValid = await graphqlClient.request(
      checkUsernameIsValidQuery,
      { username }
    );
    return isUsernameValid;
  } catch (error) {
    console.error("Error fetching user information:", error);
    return null;
  }
};

export const checkIsEmailUnique = async (email: string) => {
  try {
    const isEmailValid = await graphqlClient.request(
      checkEmailIsValidQuery,
      { email }
    );
    return isEmailValid;
  } catch (error) {
    console.error("Error fetching user information:", error);
    return null;
  }
};

export const sendOTPVerificationEmail = async(email:string) => {
  try {
    const response = await graphqlClient.request(sendOTPVerificationEmailMutation , {email});
    return response
  } catch (error) {
    console.error("Error occured while sending email. Try again :", error);
    return null;
  }
};

export const verifyOTP = async(email:string , otp: string)=> {
  try {
    const response = await graphqlClient.request(verifyOTPMutation , {email , otp});
    return response
  } catch (error) {
    console.error("Error occured while otp verification. Try again :", error);
    return null;
  }
}