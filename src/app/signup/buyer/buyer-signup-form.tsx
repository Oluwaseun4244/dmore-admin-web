"use client";

import Button from "@/app/components/generic/Button";
import { registerUserAsync, selectAuth } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import appleSignup from "../../../../public/images/apple-signup.svg";
import googleSignup from "../../../../public/images/google-signup.svg";
import { useSignUp } from "../hooks/useSignUp";

import { BuyerRegisterData } from "@/app/types/auth.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface PasswordView {
  passwordView: boolean;
  confirmPasswordView: boolean;
}

export default function BuyerSignUpForm() {
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const email = searchParams?.get("email") ?? "";

  const { loading } = useAppSelector(selectAuth);

  const defaultValues = {
    firstName: "Michael",
    lastName: "Ajayi",
    email: "mykehaymors@gmail.com",
    phoneNumber: "07032535900",
    country: "Nigeria",
    state: "Lagos",
    city: "Eko",
    address: "Somewhere in Lagos",
    password: "123456",
    confirmPassword: "123456",
    userCategory: "String",
    occupation: "Software Engineer",
    isStaff: false,
  };

  const validateSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email().required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    userCategory: Yup.string().required("User category is required"),
    occupation: Yup.string().required("Occupation is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues,
  });

  const onCreateAccount = (values: any) => {
    // console.log(values);

    dispatch(registerUserAsync(values as BuyerRegisterData));
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordView, setPasswordView] = useState<PasswordView>({
    passwordView: false,
    confirmPasswordView: false,
  });

  const confirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  const handlePasswordView = (name: keyof PasswordView, value: boolean) => {
    setPasswordView((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='w-full h-full flex justify-center items-center overflow-y-auto'>
      <div className='w-[90%] lg:w-full  h-full flex flex-col space-y-10 lg:px-12'>
        <div className='flex items-center justify-between '>
          <h2 className='font-satoshi font-medium text-black text-[36px] leading-[32px] -tracking-[% ]'>
            Sign up
          </h2>

          <Link
            href='/signup'
            className='font-satoshi font-medium text-[#702EB0] text-[16px] leading-[16px] text-center -tracking-[1%]'
          >
            <button className='font-satoshi font-medium text-white text-[18px] leading-[20px] -tracking-[1%] flex justify-center items-center px-12 py-4 bg-app-purple rounded-[8px]'>
              Back
            </button>
          </Link>
        </div>
        <form
          onSubmit={handleSubmit(onCreateAccount)}
          className='flex flex-col space-y-10'
        >
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-5 '>
            {/* firstname */}
            <div className='flex flex-col'>
              <input
                {...register("firstName")}
                type='text'
                placeholder='First name'
                className='font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none text-[#090B0C] bg-[#FBFBFC] px-4 py-4 border border-[#EDF0F3] rounded-[12px]'
              />
              {errors.firstName && (
                <div className='error text-red-600 text-[13px] py-2'>
                  {errors.firstName.message}
                </div>
              )}
            </div>
            {/* lastname */}
            <div className='flex flex-col'>
              <input
                {...register("lastName")}
                type='text'
                name='lastName'
                placeholder='Last name'
                className='font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C] px-4 py-4 border border-[#EDF0F3] rounded-[12px]'
              />
              {errors.lastName && (
                <div className='error text-red-600 text-[13px] py-2'>
                  {errors.lastName.message}
                </div>
              )}
            </div>
            {/* email */}
            <div className='flex flex-col'>
              <input
                {...register("email")}
                type='email'
                name='email'
                placeholder='Email address'
                className='font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C] px-4 py-4 border border-[#EDF0F3] rounded-[12px]'
              />
              {errors.email && (
                <div className='error text-red-600 text-[13px] py-2'>
                  {errors.email.message}
                </div>
              )}
            </div>
            {/* contact number */}
            <div className='flex flex-col'>
              <input
                {...register("phoneNumber")}
                type='text'
                placeholder='Contact number'
                className='font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C] px-4 py-4 border border-[#EDF0F3] rounded-[12px]'
              />
              {errors.phoneNumber && (
                <div className='error text-red-600 text-[13px] py-2'>
                  {errors.phoneNumber.message}
                </div>
              )}
            </div>
            {/* country */}
            <div className='flex flex-col'>
              <input
                {...register("country")}
                type='text'
                placeholder='Country'
                className='font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C] px-4 py-4 border border-[#EDF0F3] rounded-[12px]'
              />
              {errors.country && (
                <div className='error text-red-600 text-[13px] py-2'>
                  {errors.country.message}
                </div>
              )}
            </div>
            {/* state */}
            <div className='flex flex-col'>
              <input
                {...register("state")}
                type='text'
                placeholder='State'
                className='font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C] px-4 py-4 border border-[#EDF0F3] rounded-[12px]'
              />
              {errors.state && (
                <div className='error text-red-600 text-[13px] py-2'>
                  {errors.state.message}
                </div>
              )}
            </div>
            {/* city */}
            <div className='flex flex-col'>
              <input
                {...register("city")}
                type='text'
                placeholder='City'
                className='font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C] px-4 py-4 border border-[#EDF0F3] rounded-[12px]'
              />
              {errors.city && (
                <div className='error text-red-600 text-[13px] py-2'>
                  {errors.city.message}
                </div>
              )}
            </div>
            {/* address */}
            <div className='flex flex-col'>
              <input
                {...register("address")}
                type='text'
                placeholder='Address'
                className='font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C] px-4 py-4 border border-[#EDF0F3] rounded-[12px]'
              />
              {errors.address && (
                <div className='error text-red-600 text-[13px] py-2'>
                  {errors.address.message}
                </div>
              )}
            </div>

            {/* Password with eye */}
            <div className='flex flex-col relative'>
              <input
                {...register("password")}
                type={passwordView.passwordView ? "text" : "password"}
                name='password'
                placeholder='Password'
                className='font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C] px-4 py-4 border border-[#EDF0F3] rounded-[12px]'
              />
              {passwordView.passwordView ? (
                <div className='w-full h-full flex justify-end items-center absolute top-0 right-0 px-2'>
                  <FaRegEyeSlash
                    className='text-app-purple cursor-pointer'
                    onClick={() => handlePasswordView("passwordView", false)}
                  />
                </div>
              ) : (
                <div className='w-full h-full flex justify-end items-center absolute top-0 right-0 px-2'>
                  <FaRegEye
                    className=' text-app-purple cursor-pointer'
                    onClick={() => handlePasswordView("passwordView", true)}
                  />
                </div>
              )}
              {errors.password && (
                <div className='error text-red-600 text-[13px] py-2'>
                  {errors.password.message}
                </div>
              )}
            </div>
            {/* confirm password */}
            <div className='flex flex-col relative'>
              <input
                {...register("confirmPassword")}
                type={passwordView.confirmPasswordView ? "text" : "password"}
                name='confirmPassword'
                placeholder='Confirm Password'
                className='font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C] px-4 py-4 border border-[#EDF0F3] rounded-[12px]'
              />
              {passwordView.confirmPasswordView ? (
                <div className='w-full h-full flex justify-end items-center absolute top-0 right-0 px-2'>
                  <FaRegEyeSlash
                    className='text-app-purple cursor-pointer'
                    onClick={() =>
                      handlePasswordView("confirmPasswordView", false)
                    }
                  />
                </div>
              ) : (
                <div className='w-full h-full flex justify-end items-center absolute top-0 right-0 px-2'>
                  <FaRegEye
                    className=' text-app-purple cursor-pointer'
                    onClick={() =>
                      handlePasswordView("confirmPasswordView", true)
                    }
                  />
                </div>
              )}
              {errors.confirmPassword && (
                <div className='error text-red-600 text-[13px] py-2'>
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
            {/* userCategory */}
            <div className='flex flex-col'>
              <input
                {...register("userCategory")}
                type='text'
                placeholder='User Category'
                className='font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C] px-4 py-4 border border-[#EDF0F3] rounded-[12px]'
              />

              {errors.userCategory && (
                <div className='error text-red-600 text-[13px] py-2'>
                  {errors.userCategory.message}
                </div>
              )}
            </div>
            {/* occupation */}
            <div className='flex flex-col'>
              <input
                {...register("occupation")}
                type='text'
                placeholder='Occupation'
                className='font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C] px-4 py-4 border border-[#EDF0F3] rounded-[12px]'
              />
              {errors.occupation && (
                <div className='error text-red-600 text-[13px] py-2'>
                  {errors.occupation.message}
                </div>
              )}
            </div>
            {/* isStaff */}
            <div className='flex items-center'>
              <input
                // {...register("isStaff")}
                type='checkbox'
                id='isStaff'
                className='mr-2'
              />
              <label
                htmlFor='isStaff'
                className='font-satoshi font-medium text-[14px] text-[#090B0C]'
              >
                Is Staff
              </label>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row justify-between items-center'>
            <Button
              text={loading ? "Loading..." : "Create your account"}
              my='5'
              classNames='text-white w-[247px] h-[48px] text-[18px]'
              bg={loading ? "bg-disabled-btn" : "bg-dark-purple"}
              disabled={loading}
            />
            <div className='flex space-x-3 items-center mt-3 lg-mt-0 lg-mt-0'>
              <p className='font-satoshi font-medium text-[#5D6974] text-[16px] leading-[20px] -tracking-[1%]'>
                Or sign up with
              </p>
              <div className='flex space-x-3 items-center'>
                <Image
                  src={googleSignup}
                  alt='google sign up'
                  className='cursor-pointer'
                />
                <Image
                  src={appleSignup}
                  alt='apple sign up'
                  className='cursor-pointer'
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
