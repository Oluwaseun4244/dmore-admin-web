"use client";

import Button from "@/app/components/generic/Button";
import { useAlert } from "@/lib/features/alert/useAlert";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import right_img from "../../../public/images/dmore_auth_right.png";
import "../../app/globals.css";
import ".././globals.css";
import { LoginApiData } from "../types/auth.types";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useLogin } from "./hooks/useLogin";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.prefetch('/dashboard');
      router.push("/dashboard");
    }
  }, [status, router]);

  const [loginData, setLoginData] = useState<LoginApiData>({
    email: "",
    password: "",
  });

  // const { loginMutation } = useLogin();
  // const { isPending, mutate } = loginMutation;

  const [isPending, setIsPending] = useState(false);

  const { alert } = useAlert();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      alert("Please fill in all fields", "error");
      return;
    }

    try {
      setIsPending(true); // Assuming you add this state

      const result = await signIn("credentials", {
        redirect: false,
        email: loginData.email,
        password: loginData.password,
      });

      if (result?.error) {
        console.error(result.error);
        alert(result.error, "error");
      } else if (result?.ok) {
        alert("Login successful, Redirecting...", "success");
        router.prefetch("/dashboard");
        router.push("/dashboard");
      } else {
        alert("Login failed. Please try again.", "error");
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred. Please try again later.", "error");
    } finally {
      setIsPending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='w-full h-screen flex items-center overflow-auto justify-center bg-white py-3'>
      <div className='w-[90%] h-[630px] flex flex-row flex-wrap '>
        <form
          onSubmit={handleSubmit}
          className='w-full flex items-center justify-center flex-col lg:w-3/5'
        >
          <p className='font-satoshi text-black text-[28px] md:text-[36px] font-medium'>
            Login to your account
          </p>

          <div className='my-5 w-[90%] lg:w-[400px]'>
            <div className='flex flex-col my-3 bg-[#FBFBFC] px-4 py-3 border  border-[#EDF0F3] rounded-[12px]'>
              <input
                type='text'
                name='email'
                placeholder='Johndoe@email.com'
                className='font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]'
                onChange={handleChange}
                value={loginData.email}
              />
            </div>
            <div className="flex flex-col my-3 bg-[#FBFBFC] px-4 py-3 border  border-[#EDF0F3] rounded-[12px] relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="*************"
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
                onChange={handleChange}
                value={loginData.password}
              />

              {passwordVisible ? (
                <FaRegEyeSlash
                  className="absolute right-2 text-app-purple"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaRegEye
                  className="absolute right-2 text-app-purple"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>

            <Link href="/forgotpassword">
              <p className='text-end text-dark-purple text-[16px] font-medium'>
                Forgot Password?
              </p>
            </Link>
          </div>
          <Button
            text={isPending ? "Loading..." : "Login"}
            my='5'
            classNames='text-white w-[247px] h-[48px]'
            bg={
              !loginData.email.length || !loginData.password.length || isPending
                ? "bg-disabled-btn"
                : "bg-dark-purple"
            }
            disabled={
              !loginData.email.length || !loginData.password.length || isPending
            }
          // onClick={isPending ? () => console.log("is loading") : handleSubmit}
          />
          {/* <Button
            text='Sign in via GitHub'
            my='5'
            classNames='text-white w-[247px] h-[48px]'
            bg='bg-dark-purple'
            onClick={() => {}}
          /> */}

          <p className='font-satoshi text-[16px] text-center font-medium my-4 text-light-gray'>
            I don&apos;t have an account?{" "}
            <Link href='/signup'>
              <span className='text-dark-purple font-bold'>Sign up</span>
            </Link>
          </p>
        </form>

        <div className='w-full sm:w-2/5 items-center hidden lg:flex'>
          <Image src={right_img} alt='right-image' />
        </div>
      </div>
    </div>
  );
};

export default Login;
