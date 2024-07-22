import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import check from "../../../public/icons/check.jpg";
import { OnboardingChildrenProps } from "../utils/definitions";

interface WelcomeDetailsProps {
  onNext: () => void;
}

const WelcomeDetails = ({ onNext }: WelcomeDetailsProps) => {
  const information = [
    {
      title: "Points to shop",
      description:
        "Every time points are bought 40% of the transaction is added to your shopping wallet for shopping",
      amount: "200,000.00",
      ngnEquivalent: "N199,000.00",
    },
    {
      title: "Points to cash",
      description:
        "Every time points are bought 40% of the transaction is added to your shopping wallet for shopping",
      amount: "200,000.00",
      ngnEquivalent: "N199,000.00",
    },
  ];

  const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false);
  return (
    <div className='max-h-[606px] overflow-y-scroll custom-scrollbar py-3'>
      <div className='w-full flex justify-center items-center flex-col space-y-20 py-10 h-auto'>
        {information.map((info, index) => (
          <div
            className='flex flex-col space-y-5 justify-center items-center'
            key={index}
          >
            {info.title === information[0].title && (
              <p className='font-satoshi font-bold text-[18px] text-[#090B0C] leading-[20px] text-center'>
                {info.title}
              </p>
            )}
            <div className='flex flex-col space-y-2 bg-[#702EB0] rounded-[9.15px] py-3 w-[235px]'>
              <p className='font-satoshi font-bold text-white text-[24.39px] leading-[30.49px] px-4'>
                {info.amount}
              </p>
              <div className='flex flex-col space-y-1 border-t border-[#F5F7D3] border-opacity-[22%] px-4 pt-2'>
                <p className='font-satoshi font-medium text-[#F5F7D3] text-[9.15px] text-opacity-[70%] leading-[15.24px]'>
                  Currency Equivalent
                </p>
                <p className='font-satoshi font-medium text-white text-[10.67px] leading-[15.24px]'>
                  {info.ngnEquivalent}
                </p>
              </div>
            </div>
            <p className='font-satoshi font-medium text-[20px] text-[#090B0C] leading-[24px] text-center w-[55%]'>
              {info.description}
            </p>
          </div>
        ))}

        <div className='flex flex-col space-y-10 justify-center items-center'>
          <div className='flex space-x-3 items-center justify-center'>
            {termsAndConditions ? (
              <div
                className='w-[20px] h-[20px] rounded-[6px] border border-[#3F0973] bg-[#702EB0] cursor-pointer flex justify-center items-center'
                onClick={() => setTermsAndConditions(!termsAndConditions)}
              >
                <FaCheck color='#fff' />
              </div>
            ) : (
              <div
                className='w-[20px] h-[20px] rounded-[6px] border border-[#3F0973] border-opacity-[20%] bg-[#FBFBFC] cursor-pointer'
                onClick={() => setTermsAndConditions(!termsAndConditions)}
              ></div>
            )}
            <p className='font-satoshi text-[#5D6974] text-[18px] leading-[20px] w-[65%]'>
              Yes, I understand and agree to the{" "}
              <Link href='/' className='text-[#702EB0] underline'>
                Dmore Terms of Service,
              </Link>{" "}
              including the{" "}
              <Link href='/' className='text-[#702EB0] underline'>
                User Agreement
              </Link>{" "}
              and{" "}
              <Link href='/privacy-policy' className='text-[#702EB0] underline'>
                Privacy Policy.
              </Link>
            </p>
          </div>
          <div className='flex flex-col space-y-3'>
            <button
              className={`font-satoshi font-bold text-[16px] text-white leading-[24px] py-4 px-10 text-center flex justify-center items-center rounded-[8px] ${
                termsAndConditions
                  ? "bg-[#702EB0]  bg-opacity-[100%]"
                  : "bg-[#B9A6D4] bg-opacity-[50%]"
              }`}
              onClick={onNext}
              disabled={!termsAndConditions}
            >
              Continue to sign up
            </button>
            <Link
              href='/faqs'
              className='font-satoshi font-medium text-[#702EB0] text-[16px] leading-[16px] text-center -tracking-[1%]'
            >
              See FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeDetails;
