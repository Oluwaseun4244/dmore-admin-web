import React, { useState } from "react";
import Image from "next/image";
import right_img from "../../../public/images/dmore_auth_right.png";
import info_icon from "../../../public/icons/purple-info.svg";
import verifying_gif from "../../../public/gif/verifying-gif.png";
import "../../app/globals.css";
import OtpInput from "@/app/components/otp/OtpInput";
import Button from "@/app/components/generic/Button";
import { useRouter } from 'next/router';


const Index: React.FC = () => {
  const [otp, setOtp] = useState<number | string>("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [viewCycle, setViewCycle] = useState("verified");

  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/login');
  };

  const handleOtpChange = (otp: string) => {
    setOtp(otp);
    if (otp.length === 6) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  const handleVerify = () => {
    setViewCycle("verifying");
  };
  return (
    <div className="w-full h-screen flex items-center overflow-auto justify-center bg-white py-3">
      <div className="w-[90%] h-[630px] flex flex-row flex-wrap ">
        {viewCycle === "otp" ? (
          <div className="w-full flex items-center justify-center flex-col sm:w-3/5">
            <p className="font-satoshi text-black text-[28px] md:text-[36px] font-medium">
              Verify your Email address
            </p>
            <p className="font-satoshi text-[16px] text-center font-medium my-4 text-light-gray">
              Please enter the 6 digit code sent to{" "}
              <span className="text-dark-purple font-bold">
                Johndoe@gmail.com
              </span>
            </p>

            <div className="my-4">
              <OtpInput numOfBoxes={6} onOtpChange={handleOtpChange} />
            </div>

            <Button
              text="Proceed"
              my="5"
              classNames="text-white w-[247px] h-[48px]"
              bg={btnDisabled ? "bg-disabled-btn" : "bg-dark-purple"}
              disabled={btnDisabled}
            />

            <p className="font-satoshi text-light-gray text-[16px] font-medium mt-2">
              Didn’t get the code?
            </p>
            <div className="flex gap-2 items-center mt-4">
              <Image src={info_icon} alt="timer_info" width={40} height={40} />
              <p className="font-satoshi text-light-gray text-[16px] font-normal">
                Resend code in 10:00
              </p>
            </div>
          </div>
        ) : viewCycle === "verifying" ? (
          <div className="w-full flex items-center justify-center flex-col sm:w-3/5">
            <Image
              src={verifying_gif}
              alt="verifying"
              width={250}
              height={171}
            />
            <p className="font-satoshi text-black text-[36px] font-medium">
              Verifying your Email
            </p>
          </div>
        ) : viewCycle === "verified" ? (
          <div className="w-full flex items-center pb-24 justify-center md:justify-end flex-col sm:w-3/5">
            <p className="font-satoshi text-black text-[25px] md:text-[36px] font-medium">
              Email verification successful
            </p>
            <p className="font-satoshi w-full md:w-[460px]  text-[16px] text-center font-medium my-2 text-light-gray">
              Your email has been successfully verified! please kindly click on the button below to login.
            </p>
            
              <Button
                text="Continue to Login"
                my="5"
                classNames="text-white w-[247px] h-[48px]"
                bg={"bg-dark-purple"}
                onClick={navigateToLogin}
              />
           
          </div>
        ) : (
          <></>
        )}

        <div className="w-full sm:w-2/5 items-center hidden lg:flex">
          <Image src={right_img} alt="right-image" />
        </div>
      </div>
    </div>
  );
};

export default Index;
