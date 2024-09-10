"use client";


import OtpInput from "@/app/components/OtpInput";
import Image from "next/image";
import { useState } from "react";
import infoIcon from "../../../../public/icons/info-icon.svg";
import right_img from "../../../../public/images/dmore_auth_right.png";

const EnterOTP = () => {
  const [otp, setOtp] = useState<string>("");
  const [isValidOtp, setIsValidOtp] = useState<boolean>(false);

  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp);
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      console.log("Verifying Otp: ", otp);
    } else {
      console.log("Invalid Otp");
      setIsValidOtp(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-x-hidden bg-white">
      <div className="w-[100%] lg:w[80%] h-[90vh] flex justify-center items-center overflow-hidden">
        <div className="flex flex-row w-[90%] h-full lg:h-[630px]">
          <div className="w-full flex items-center justify-center flex-col lg:w-3/5">
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-full h-full flex flex-col space-y-10 px-12 justify-center items-center">
                <div className="flex flex-col space-y-10">
                  <h2 className="font-satoshi font-medium text-black text-[36px] leading-[32px] -tracking-[% ]">
                    Verify your Email address
                  </h2>
                  <p className="font-satoshi text-[16px] text-[#758494] leading-[20px] text-center">
                    Please enter the 6 digit code sent to{" "}
                    <span className="font-medium text-[#702EB0]">
                      Johndoe@gmail.com
                    </span>
                  </p>
                </div>
                <OtpInput
                  onOtpChange={handleOtpChange}
                  isValidOtp={isValidOtp}
                />
                <button
                  className={`font-satoshi font-bold text-[16px] text-white leading-[24px] py-4 px-20 text-center flex justify-center items-center rounded-[8px] ${
                    otp.length === 6
                      ? "bg-[#702EB0]  bg-opacity-[100%]"
                      : "bg-[#B9A6D4] bg-opacity-[50%]"
                  }`}
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 6}
                >
                  Proceed
                </button>
                <div className="flex flex-col space-y-5 ">
                  <p className="font-satoshi font-medium text-[16px] text-[#758494] text-center leading-[20px]">
                    Didn&apos;t get the code?
                  </p>
                  <div className="flex space-x-3 items-center">
                    <Image src={infoIcon} alt="info icon" />
                    <p className="font-satoshi text-[16px] text-[#718096] leading-[20px]">
                      Resend code in 10:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/5 items-center pl-8 hidden lg:flex">
            <Image src={right_img} alt="right-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterOTP;
