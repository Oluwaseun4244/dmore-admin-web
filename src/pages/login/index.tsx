import React, { useState } from "react";
import Image from "next/image";
import right_img from "../../../public/images/dmore_auth_right.png";
import info_icon from "../../../public/icons/purple-info.svg";
import verifying_gif from "../../../public/gif/verifying-gif.png";
import "../../app/globals.css";
import OtpInput from "@/app/components/otp/OtpInput";
import Button from "@/app/components/generic/Button";
import { useRouter } from 'next/router';
import CustomInput from "@/app/components/generic/CustomInput";


const Index: React.FC = () => {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/login');
  };


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <div className="w-full h-screen flex items-center overflow-auto justify-center bg-white py-3">
      <div className="w-[90%] h-[630px] flex flex-row flex-wrap ">

        <div className="w-full flex items-center justify-center flex-col sm:w-3/5">
          <p className="font-satoshi text-black text-[28px] md:text-[36px] font-medium">
            Login to your account
          </p>

          <div className="my-5">
            <CustomInput my="3" ph="JohnDoe@gmail.com" classNames="outline-none" onChange={(e) => setEmail(e.target.value)} />
            <CustomInput type={passwordVisible ? 'text' : 'password'} hasEndIcon={true} my="3" ph="***********" classNames="outline-none" onChange={(e) => setPassword(e.target.value)} iconClick={togglePasswordVisibility} />
            <p className="text-end text-dark-purple text-[16px] font-medium">Forgot Password?</p>
          </div>
          <Button
            text="Login"
            my="5"
            classNames="text-white w-[247px] h-[48px]"
            bg={!email.length || !password.length ? "bg-disabled-btn" : "bg-dark-purple"}
            disabled={!email.length || !password.length}
          />

          <p className="font-satoshi text-[16px] text-center font-medium my-4 text-light-gray">
            I don&apos;t have an account?{" "}
            <span className="text-dark-purple font-bold">
              Sign up
            </span>
          </p>

        </div>

        <div className="w-full sm:w-2/5 items-center hidden lg:flex">
          <Image src={right_img} alt="right-image" />
        </div>
      </div>
    </div>
  );
};

export default Index;
