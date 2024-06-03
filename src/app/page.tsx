'use client'
import { ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import { useLoginUser } from "../../hooks/user";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function Home() {
  //Checking if the user is already logged in or not
  const router = useRouter();
 
  useEffect(() => {
    const isUserLogin = () => {
      if (window.localStorage.getItem("__token__")) {
        router.push("/chats");
      }
    };
    isUserLogin();
  }, [router]);

  //Password Hide or not
  const [isPasswordVisible , setIsPasswordVisible] = useState(false)

  const [isSubmitting , setIsSubmitting] = useState(false)

  const {mutate} = useLoginUser()

  const [formData , setFormData] = useState({
    identifier: "",
    password: ""
  })

  const handleChange = (e: any) => {
    const {value} = e.target;
    setFormData({...formData , [e.target.name]: value});
  };

  const handleLoginForm = async (e: { preventDefault: () => void }) => {
    setIsSubmitting(true)
    e.preventDefault();
    try {
      mutate({
        identifier: formData.identifier,
        password: formData.password
      });
      setFormData({identifier: "", password: ""});
      setIsSubmitting(false)
    } catch (error) {
      console.error('Error occured while login:', error);
      setIsSubmitting(false)
    }
  };
  return (
    <section>
      <div className="dark:bg-black h-screen flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-4 flex justify-center">
            <h1 className="font-bold text-4xl">Quicky</h1>  
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-200">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline dark:text-white"
            >
              Create account
            </Link>
          </p>
          <form onSubmit={handleLoginForm} className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900 dark:text-white">
                  {' '}
                  Email address or Username{' '}
                </label>
                <div className="mt-2 flex justify-between items-center border border-gray-300 rounded-md px-2">
                  <input
                    onChange={handleChange} name='identifier' value={formData.identifier}
                    className="flex active:bg-transparent h-10 w-full bg-transparent px-2 py-2 text-sm focus:border-none focus:outline-none"
                    type="text"
                    placeholder="Email or Username"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900 dark:text-white">
                    {' '}
                    Password{' '}
                  </label>
                  <Link href="#" title="" className="text-sm font-semibold text-black hover:underline">
                    {' '}
                    Forgot password?{' '}
                  </Link>
                </div>
                <div className="mt-2 flex justify-between items-center border border-gray-300 rounded-md px-2">
                <label htmlFor="password" className="w-full">
                  <input
                    onChange={handleChange} name='password' value={formData.password}
                    className="flex h-10 w-full active:bg-transparent bg-transparent px-2 py-2 text-sm focus:border-none focus:outline-none"
                    type= {isPasswordVisible ? 'type' : 'password'}
                    placeholder="Password"
                  ></input>
                </label>
                <div onClick={()=> setIsPasswordVisible(!isPasswordVisible)}>{formData.password && <Eye size={20} className="cursor-pointer"/>}</div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black dark:bg-white px-3.5 py-2.5 font-semibold leading-7 text-white dark:text-black hover:bg-black/80 dark:hover:hover:bg-gray-100"
                >
                  {isSubmitting ? (<> <Loading size={28}/>  Please wait </>): ('Login')} 
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};