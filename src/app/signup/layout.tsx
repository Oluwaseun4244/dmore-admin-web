import Image from "next/image";
import React from "react";
import right_img from "../../../public/images/dmore_auth_right.png";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-x-hidden bg-white">
      <div className="w-[100%] lg:w[80%] h-[100vh] flex justify-center items-center overflow-hidden">
        <div className="flex flex-row w-[90%] h-full lg:h-[630px]">
          <div className="w-full flex items-center h-full justify-center flex-col lg:w-3/5">
            {children}
          </div>
          <div className="w-full lg:w-2/5 items-center pl-8 hidden lg:flex">
            <Image src={right_img} alt="right-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
