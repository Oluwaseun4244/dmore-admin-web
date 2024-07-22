import { OnboardingChildrenProps } from "@/app/utils/definitions";
import React from "react";

const SellerSignupForm = ({ onNext }: OnboardingChildrenProps) => {
  const onSubmit = () => {
    onNext("welcome");
  };

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-full h-full flex flex-col space-y-5 justify-center items-center'>
        <p className='font-satoshi text-4xl text-black text-[36px] font-medium'>
          seller sign up form
        </p>
        <button
          onClick={onSubmit}
          className='bg-purple-600 text-white px-10 py-3 rounded-[12px]'
        >
          Back to Welcome
        </button>
      </div>
    </div>
  );
};

export default SellerSignupForm;
