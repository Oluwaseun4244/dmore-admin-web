import Image from "next/image";
import React from "react";
import whiteCloseIcon from "../../../public/icons/white-close-icon.svg";
import dmoreSpiral from "../../../public/images/dmore-spiral.svg";
import people from "../../../public/images/people.svg";
import logo from "../../../public/logo-full.svg";
import right_img from "../../../public/images/dmore_auth_right.png";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-x-hidden bg-white">
      <div className="w-[100%] lg:w[80%] h-[90vh] flex justify-center items-center overflow-hidden">
        {/* <div className="grid grid-cols-12 gap-5 md:gap-10">
          <div className="col-span-8 flex justify-center items-center">
            {children}
          </div>
          <div className="col-span-3 flex justify-start items-center bg-blue-600 ">
            <div className="bg-[#702EB0] h-[634px] w-[337px] rounded-[20px] flex flex-col justify-center items-center relative">
              <div className="absolute top-0 left-0 w-full h-full p-8 flex items-start justify-end z-10">
                <Image
                  src={whiteCloseIcon}
                  alt="white close icon"
                  className="cursor-pointer"
                />
              </div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center -z-5">
                <Image
                  src={dmoreSpiral}
                  alt="dmore spiral"
                  className="pointer-events-none"
                />
              </div>
              <Image src={logo} alt="logo" className="z-10" />
              <div className="w-full h-full absolute bottom-0 left-0 flex items-end rounded-[20px] overflow-hidden">
                <Image
                  src={people}
                  alt="people"
                  className="pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex flex-row w-[90%] h-full lg:h-[630px]">
          <div className="w-full flex items-center justify-center flex-col lg:w-3/5">
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
