import { OnboardingChildrenProps } from "@/app/utils/definitions";
import Lottie from "lottie-react";
import React from "react";
import verifyingEmail from "../../../../public/lottie/verifying-email.json";

const VerifyingLoadingScreen = ({ onNext }: OnboardingChildrenProps) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-full h-full flex flex-col space-y-10 px-12 justify-center items-center'>
        <div className='w-[300px] h-auto'>
          <Lottie animationData={verifyingEmail} />
         </div>
        <h2 className='font-satoshi font-medium text-[36px] leading-[32px] -tracking-[1%] text-black'>
          Verifying your Email
        </h2>
      </div>
    </div>
  );
};

export default VerifyingLoadingScreen;
