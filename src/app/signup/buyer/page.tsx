"use client";

import React, { useState } from "react";
// import { useRouter } from "next/router";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import appleSignup from "../../../../public/images/apple-signup.svg";
import googleSignup from "../../../../public/images/google-signup.svg";

function Buyer() {


//   const router = useRouter();


  const searchParams = useSearchParams();
  const email = searchParams?.get("email") ?? "";
//   console.log("email", searchParams?.get("email"));

  const onCreateAccount = () => {
    console.log("sign up");
  };
  return (
    <div className="w-full h-full flex justify-center items-center overflow-y-auto">
      <div className="w-[90%] lg:w-full  h-full flex flex-col space-y-10 lg:px-12">
        <div className="flex items-center justify-between ">
          <h2 className="font-satoshi font-medium text-black text-[36px] leading-[32px] -tracking-[% ]">
            Sign up
          </h2>


        </div>
        <form className="flex flex-col space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-5 ">
            {/* firstname */}
            <div className="flex flex-col bg-[#FBFBFC] px-4 py-3 border border-[#EDF0F3] rounded-[12px]">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
              />
            </div>
            {/* lastname */}
            <div className="flex flex-col bg-[#FBFBFC] px-4 py-3 border border-[#EDF0F3] rounded-[12px]">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
              />
            </div>
            {/* email */}
            <div className="flex flex-col bg-[#FBFBFC] px-4 py-3 border border-[#EDF0F3] rounded-[12px]">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
                value={email}
                readOnly
              />
            </div>
            {/* contact number */}
            <div className="flex flex-col bg-[#FBFBFC] px-4 py-3 border border-[#EDF0F3] rounded-[12px]">
              <input
                type="text"
                name="phone"
                placeholder="Contact number"
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
              />
            </div>
            {/* password */}
            <div className="flex flex-col bg-[#FBFBFC] px-4 py-3 border border-[#EDF0F3] rounded-[12px]">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
              />
            </div>
            {/* confirm password */}
            <div className="flex flex-col bg-[#FBFBFC] px-4 py-3 border border-[#EDF0F3] rounded-[12px]">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password "
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
              />
            </div>
            {/* referral code */}
            <div className="flex flex-col bg-[#FBFBFC] px-4 py-3 border border-[#EDF0F3] rounded-[12px]">
              <input
                type="text"
                name="referallCode"
                placeholder="Referral code"
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <button
              className="font-satoshi font-medium text-white text-[18px] leading-[20px] -tracking-[1%] flex justify-center items-center px-12 py-4 bg-[#702EB0] rounded-[8px] bg-opacity-[50%]"
              type="button"
              onClick={onCreateAccount}
            >
              Create your account
            </button>
            <div className="flex space-x-3 items-center mt-3 lg-mt-0 lg-mt-0">
              <p className="font-satoshi font-medium text-[#5D6974] text-[16px] leading-[20px] -tracking-[1%]">
                Or sign up with
              </p>
              <div className="flex space-x-3 items-center">
                <Image
                  src={googleSignup}
                  alt="google sign up"
                  className="cursor-pointer"
                />
                <Image
                  src={appleSignup}
                  alt="apple sign up"
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Buyer;
