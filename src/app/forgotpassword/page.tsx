"use client";

import Button from "@/app/components/generic/Button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import right_img from "../../../public/images/dmore_auth_right.png";
import "../../app/globals.css";
import ".././globals.css";
import { ForgotPasswordData } from "../types/auth.types";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useForgotPassword } from "./hooks/useForgotPassword";


const ForgotPassword: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [forgotPasswordData, setForgotPasswordData] = useState<ForgotPasswordData>({
    email: "",
  });

  const { forgotPasswordMutation } = useForgotPassword();

  const { isPending, mutate } = forgotPasswordMutation;

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = () => {
    mutate(forgotPasswordData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForgotPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='w-full h-screen flex items-center overflow-auto justify-center bg-white py-3'>
      <div className='w-[90%] h-[630px] flex flex-row flex-wrap '>
        <div className='w-full flex items-center justify-center flex-col lg:w-3/5'>
          <p className='font-satoshi text-black text-[28px] md:text-[36px] font-medium'>
            Forgot Password
          </p>

          <div className='my-5 w-[90%] lg:w-[400px]'>
            <div className='flex flex-col my-3 bg-[#FBFBFC] px-4 py-3 border  border-[#EDF0F3] rounded-[12px]'>
              <input
                type='text'
                name='email'
                placeholder='Johndoe@email.com'
                className='font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]'
                onChange={handleChange}
                value={forgotPasswordData.email}
              />
            </div>

          </div>
          <Button
            text={isPending ? "Loading" : "Get Reset Code"}
            my='5'
            classNames='text-white w-[247px] h-[48px]'
            bg={
              !forgotPasswordData.email.length || isPending
                ? "bg-disabled-btn"
                : "bg-dark-purple"
            }
            disabled={
              !forgotPasswordData.email.length || isPending
            }
            onClick={isPending ? () => console.log("is loading") : handleSubmit}
          />


          <p className='font-satoshi text-[16px] text-center font-medium my-4 text-light-gray'>
            Return to{" "}
            <Link href='/login'>
              <span className='text-dark-purple font-bold'>Login?</span>
            </Link>
          </p>
        </div>

        <div className='w-full sm:w-2/5 items-center hidden lg:flex'>
          <Image src={right_img} alt='right-image' />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
