"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

import Image from "next/image";
import appleSignup from "../../../../public/images/apple-signup.svg";
import googleSignup from "../../../../public/images/google-signup.svg";
import { useSignUp } from "../hooks/useSignUp";
import { StaffRegisterData } from "@/app/types/auth.types";
import Button from "@/app/components/generic/Button";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

interface PasswordView {
  passwordView: boolean;
  confirmPasswordView: boolean;
}
const StaffSignupForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") ?? "";

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordView, setPasswordView] = useState<PasswordView>({
    passwordView: false,
    confirmPasswordView: false,
  });
  const [regData, setRegData] = useState<StaffRegisterData>({
    firstName: "",
    lastName: "",
    email: email,
    phoneNumber: "",
    password: "",
    occupation: "",
    confirmPassword: "",
    company: "",
    isStaff: true,
    referralCode: "",
  });
  const { staffRegMutation } = useSignUp();
  const { isPending, mutate } = staffRegMutation;

  const onCreateAccount = () => {
    mutate(regData);
  };

  const confirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  const handlePasswordView = (name: keyof PasswordView, value: boolean) => {
    setPasswordView((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setRegData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-full flex justify-center items-center overflow-y-auto">
      <div className="w-[90%] lg:w-full  h-full flex flex-col space-y-10 lg:px-12">
        <div className="flex items-center justify-between ">
          <h2 className="font-satoshi font-medium text-black text-[36px] leading-[32px] -tracking-[% ]">
            Sign up
          </h2>

          <Link
            href="/signup"
            className="font-satoshi font-medium text-[#702EB0] text-[16px] leading-[16px] text-center -tracking-[1%]"
          >
            <button className="font-satoshi font-medium text-white text-[18px] leading-[20px] -tracking-[1%] flex justify-center items-center px-12 py-4 bg-app-purple rounded-[8px]">
              Back
            </button>
          </Link>
        </div>
        <form className="flex flex-col space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-5 ">
            {/* firstname */}
            <div className="flex flex-col bg-[#FBFBFC] px-4 py-3 border border-[#EDF0F3] rounded-[12px]">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                onChange={handleChange}
                value={regData.firstName}
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
              />
            </div>
            {/* lastname */}
            <div className="flex flex-col bg-[#FBFBFC] px-4 py-3 border border-[#EDF0F3] rounded-[12px]">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                onChange={handleChange}
                value={regData.lastName}
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
              />
            </div>
            {/* email */}
            <div className="flex flex-col bg-[#FBFBFC] px-4 py-3 border border-[#EDF0F3] rounded-[12px]">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                onChange={handleChange}
                value={regData.email}
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
                readOnly
              />
            </div>
            {/* contact number */}
            <div className="flex flex-col bg-[#FBFBFC] px-4 py-3 border border-[#EDF0F3] rounded-[12px]">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Contact number"
                onChange={handleChange}
                value={regData.phoneNumber}
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
              />
            </div>
            {/* password */}
            <div className="flex flex-col bg-[#FBFBFC] px-4 py-3 border border-[#EDF0F3] rounded-[12px] relative">
              <input
                type={passwordView.passwordView ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={regData.password}
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
              />
              {passwordView.passwordView ? (
                <FaRegEyeSlash
                  className="absolute right-2 text-app-purple"
                  onClick={() => handlePasswordView("passwordView", false)}
                />
              ) : (
                <FaRegEye
                  className="absolute right-2 text-app-purple"
                  onClick={() => handlePasswordView("passwordView", true)}
                />
              )}
            </div>
            {/* confirm password */}
            <div className="flex flex-col bg-[#FBFBFC] px-4 py-3 border border-[#EDF0F3] rounded-[12px] relative">
              <input
                type={passwordView.confirmPasswordView ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={confirmPasswordChange}
                value={confirmPassword}
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
              />
              {passwordView.confirmPasswordView ? (
                <FaRegEyeSlash
                  className="absolute right-2 text-app-purple"
                  onClick={() =>
                    handlePasswordView("confirmPasswordView", false)
                  }
                />
              ) : (
                <FaRegEye
                  className="absolute right-2 text-app-purple"
                  onClick={() =>
                    handlePasswordView("confirmPasswordView", true)
                  }
                />
              )}
            </div>
            {/* referral code */}
            <div className="flex flex-col bg-[#FBFBFC] px-4 py-3 border border-[#EDF0F3] rounded-[12px]">
              <input
                type="text"
                name="referral Code"
                placeholder="Referral code"
                onChange={handleChange}
                value={regData.referralCode}
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
              />
            </div>
          </div>

          <hr />

          <h2 className="font-satoshi font-medium text-black text-[26px] leading-[32px] -tracking-[% ]">
            Staff Info
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-5 ">
            {/* company */}
            <div className="flex flex-col bg-[#FBFBFC] px-4 py-3 border border-[#EDF0F3] rounded-[12px]">
              <select
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
                name="company"
                onChange={handleChange}
                value={regData.company}
              >
                <option disabled selected>
                  Company
                </option>
                <option>Company A</option>
                <option>Company B</option>
                <option>Company C</option>
                <option>Company D</option>
              </select>
            </div>
            {/* occupation */}
            <div className="flex flex-col bg-[#FBFBFC] px-4 py-3 border border-[#EDF0F3] rounded-[12px]">
              <select
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
                name="occupation"
                onChange={handleChange}
                value={regData.occupation}
              >
                <option disabled selected>
                  Occupation
                </option>
                <option>Occupation A</option>
                <option>Occupation B</option>
                <option>Occupation C</option>
                <option>Occupation D</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center">
            <Button
              text={isPending ? "Loading" : "Create your account"}
              my="5"
              classNames="text-white w-[247px] h-[48px] text-[18px]"
              bg={isPending ? "bg-disabled-btn" : "bg-dark-purple"}
              disabled={isPending}
              onClick={
                isPending ? () => console.log("is loading") : onCreateAccount
              }
            />

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
};

export default StaffSignupForm;
