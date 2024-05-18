import Link from 'next/link'
import React from 'react'
import forgetpassword from "../../../../public/forgetpassword.png"
import Image from 'next/image'

const ResetPasswordPage = () => {
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <Image src={forgetpassword} width={200} height={200} className="w-20 mx-auto" alt="email"/>
          <h2 className="text-center text-2xl font-bold leading-tight mt-5 text-black">
            Forget your Password?
          </h2>
          <p className="text-sm text-slate-600 text-center mt-4">Enter verification code we sent to your email</p>
          <form className="mt-8">
            <div className="space-y-5">
              <div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    name="forget"
                    placeholder="Username/Email"
                  ></input>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex w-full h-10 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
          <div className="mt-8">
            <p className="mt-1 text-center text-base text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResetPasswordPage