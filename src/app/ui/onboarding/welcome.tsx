import Image from "next/image";
import React, { useState } from "react";

import Link from "next/link";
import arrowDownPurple from "../../../../public/icons/arrow-down-purple.svg";
import arrowRightPurple from "../../../../public/icons/arrow-right-purple.svg";
import create from "../../../../public/images/create.svg";
import staff from "../../../../public/images/staff.svg";

import WelcomeDetails from "@/app/components/WelcomeDetails";
import { OnboardingChildrenProps } from "@/app/utils/definitions";

const Welcome = ({ onNext }: OnboardingChildrenProps) => {
  const [opened, setOpened] = useState("");

  const onBuyerSignup = () => {
    onNext("buyer-signup");
  };

  const onStaffSignup = () => {
    onNext("staff-signup");
  };

  const handleOpened = (value: string) => {
    if (value === opened) {
      setOpened("");
    } else {
      setOpened(value);
    }
  };


  return (
    <div className="w-full h-full">
      <div className="h-full w-full flex flex-col space-y-10">
        <h2 className="font-satoshi font-medium text-black text-[36px] leading-[32px] -tracking-[1%]">
          Welcome!
        </h2>
        <div className="flex flex-col space-y-3 hover:translate-y-2 hover:translate-x-2 transition-all duration-300 ease-in-out">
          <div
            className="flex justify-between items-center border border-[#D4C6E8] bg-[#DAB9FA17] bg-opacity-[9%] rounded-[12px] py-3 px-5 cursor-pointer hover:shadow-md hover:shadow-[#8077F626] hover:blur-[4] transition-all duration-300"
            onClick={() => handleOpened("buyer")}
          >
            <div className="flex space-x-1 items-center">
              <Image src={create} alt="create" />
              <p className="font-satoshi font-medium text-[16px] text-[#090B0C] leading-[20px]">
                Create an account
              </p>
            </div>
            {opened === "buyer" ? (
              <Image src={arrowDownPurple} alt="arrow down purple" />
            ) : (
              <Image src={arrowRightPurple} alt="arrow right purple" />
            )}
          </div>
          {opened === "buyer" && <WelcomeDetails onNext={onBuyerSignup} />}

          {(opened == "" || opened === "staff") && (
            <>
              <div
                className="flex justify-between items-center border border-[#D4C6E8] bg-[#DAB9FA17] bg-opacity-[9%] rounded-[12px] py-3 px-5 cursor-pointer hover:shadow-md hover:shadow-[#8077F626] hover:blur-[4] transition-all duration-300"
                onClick={() => handleOpened("staff")}
              >
                <div className="flex space-x-1 items-center">
                  <Image src={staff} alt="staff" />
                  <p className="font-satoshi font-medium text-[16px] text-[#090B0C] leading-[20px]">
                    Create staff account
                  </p>
                </div>
                {opened === "staff" ? (
                  <Image src={arrowDownPurple} alt="arrow down purple" />
                ) : (
                  <Image src={arrowRightPurple} alt="arrow right purple" />
                )}
              </div>
              {opened === "staff" && <WelcomeDetails onNext={onStaffSignup} />}
            </>
          )}
          <div className="flex space-x-1 items-center font-satoshi font-medium text-[16px] leading-[20px] text-[#5D6974] self-end">
            <p>Already have an account?</p>
            <Link href="/login" className="text-[#702EB0]">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
