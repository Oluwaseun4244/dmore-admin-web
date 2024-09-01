"use client";

import React, { useState } from "react";
import Image from "next/image";
import right_img from "../../../public/images/dmore_auth_right.png";
import "../../app/globals.css";
import Button from "@/app/components/generic/Button";
import ".././globals.css";
import Link from "next/link";
import { useLogin } from "./hooks/useLogin";

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginMutation } = useLogin();

  const { isPending, mutate } = loginMutation;

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = () => {
    mutate({ email, password });
  };

  return (
    <div className="w-full h-screen flex items-center overflow-auto justify-center bg-white py-3">
      <div className="w-[90%] h-[630px] flex flex-row flex-wrap ">
        <div className="w-full flex items-center justify-center flex-col lg:w-3/5">
          <p className="font-satoshi text-black text-[28px] md:text-[36px] font-medium">
            Login to your account
          </p>

          <div className="my-5 w-[90%] lg:w-[400px]">
            <div className="flex flex-col my-3 bg-[#FBFBFC] px-4 py-3 border  border-[#EDF0F3] rounded-[12px]">
              <input
                type="text"
                name="email"
                placeholder="Johndoe@email.com"
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="flex flex-col my-3 bg-[#FBFBFC] px-4 py-3 border  border-[#EDF0F3] rounded-[12px]">
              <input
                type="password"
                name="password"
                placeholder="*************"
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <p className="text-end text-dark-purple text-[16px] font-medium">
              Forgot Password?
            </p>
          </div>
          <Button
            text={isPending ? "Loading" : "Login"}
            my="5"
            classNames="text-white w-[247px] h-[48px]"
            bg={
              !email.length || !password.length
                ? "bg-disabled-btn"
                : "bg-dark-purple"
            }
            disabled={!email.length || !password.length}
            onClick={isPending ? () => console.log("is loading") : handleSubmit}
          />

          <p className="font-satoshi text-[16px] text-center font-medium my-4 text-light-gray">
            I don&apos;t have an account?{" "}
            <Link href="/signup">
              <span className="text-dark-purple font-bold">Sign up</span>
            </Link>
          </p>
        </div>

        <div className="w-full sm:w-2/5 items-center hidden lg:flex">
          <Image src={right_img} alt="right-image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
