import { OnboardingChildrenProps } from "@/app/utils/definitions";
// import Lottie from "lottie-react";
import transfering from "../../../../public/gif/transfer.gif";
import React from "react";
import Image from "next/image";
// import verifyingEmail from "../../../../public/lottie/verifying-email.json";

const VerifyingLoadingScreen = ({ onNext }: OnboardingChildrenProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full h-full flex flex-col space-y-10 px-12 justify-center items-center">
        <div className="w-[300px] h-auto flex items-center justify-center">
          <Image src={transfering} alt={"isLoading"} className="w-[305px]" />
        </div>

        <h2 className="font-satoshi font-medium text-[36px] leading-[32px] -tracking-[1%] text-black">
          Verifying your Email
        </h2>
      </div>
    </div>
  );
};

export default VerifyingLoadingScreen;
