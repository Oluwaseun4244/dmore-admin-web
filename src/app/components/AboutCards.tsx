'use client';

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import buyAndSell from "../../../public/images/buy-and-sell.svg";
import coins from "../../../public/images/coins.svg";
import connectWithPeople from "../../../public/images/connect-with-people.svg";
import customerServiceSupport from "../../../public/images/customer-service-support.svg";
import qrCode from "../../../public/images/qr-code.svg";
import rightSpiral from "../../../public/images/right-spiral.svg";

const AboutCards = () => {
  const yellowTextRef = useRef<HTMLDivElement>(null);
  const [wordWidth, setWordWidth] = useState(0);
  const [wordHeight, setWordHeight] = useState(0);

  useEffect(() => {
    if (yellowTextRef.current) {
      setWordWidth(yellowTextRef.current.offsetWidth);
      setWordHeight(yellowTextRef.current.offsetHeight);
    }
  }, [yellowTextRef]);

  return (
    <div className="w-screen h-auto overflow-x-hidden bg-white flex justify-center items-center">
      <div className="flex flex-col space-y-20 justify-center items-center w-[75%] py-20">
        <p className="text-[64px] text-black font-satoshi gradient-text z-10 relative">
          The most <span className="italic">rewarding</span> way{" "}
          <span
            ref={yellowTextRef}
            style={{ zIndex: 10 }}
            className="pr-5 highlight"
          >
            to shop
          </span>
          {/* <span
            className='bg-[#FFEB71] absolute right-0 bottom-0'
            style={{
              width: `${wordWidth}px`,
              height: "80%",
              zIndex: -10,
            }}
          /> */}
        </p>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-2 gap-4 items-start">
            <div className="flex flex-col justify-between items-start space-y-[18rem] bg-[#EFE2FC] border border-[#3F097336] border-opacity-[21%] rounded-[16px] px-8 py-8 relative">
              <div className="flex flex-col space-y-3">
                <p className="font-satoshi text-[#3F0973] text-[23.63px] -tracking-[3%] leading-[31.89px] font-medium">
                  Secure payment
                </p>
                <p className="font-satoshi text-[#3F0973] text-[16px] leading-[21.6px] w-[75%]">
                  Fast transaction with 100% secure payment.
                </p>
              </div>
              <button className="font-satoshi text-[#3F0973] text-[16px] leading-[21.6px] font-medium border border-[#3F0973] border-opacity-[40%] px-5 py-3 rounded-[12px]">
                Learn more
              </button>

              <Image
                src={coins}
                alt="coins"
                className="absolute right-10 bottom-0 pointer-events-none"
              />
            </div>

            <div className="flex flex-col justify-between items-start space-y-[13rem] bg-[#F8F8F8] border border-[#E1E4E5] rounded-[16px] px-5 py-5 relative overflow-y-hidden">
              <div className="flex flex-col space-y-3 z-10">
                <p className="font-satoshi text-[#3F0973] text-[23.63px] -tracking-[3%] leading-[31.89px] font-medium z-10">
                  Buy or Sell
                </p>
                <p className="font-satoshi text-[#3F0973] text-[16px] leading-[21.6px] w-[45%]">
                  Buying and selling products has been made easier.
                </p>
              </div>
              <button className="font-satoshi text-[#3F0973] text-[16px] leading-[21.6px] font-medium border border-[#3F0973] border-opacity-[40%] px-5 py-3 rounded-[12px]">
                Learn more
              </button>

              <Image
                src={buyAndSell}
                alt="buy and sell"
                className="absolute right-0 bottom-0 pointer-events-none z-[5]"
              />
            </div>

            <div className="flex flex-col justify-between items-start space-y-[5rem] bg-[#F8F8F8] border border-[#E1E4E5] rounded-[16px] px-5 py-5 relative overflow-y-hidden">
              <div className="flex flex-col space-y-3 z-10">
                <p className="font-satoshi text-[#3F0973] text-[23.63px] -tracking-[3%] leading-[31.89px] font-medium z-10 w-[85%]">
                  Customer Service Support
                </p>
                <p className="font-satoshi text-[#3F0973] text-[16px] leading-[21.6px] w-[75%]">
                  Dedicated support anytime and anywhere.
                </p>
              </div>
              <button className="font-satoshi bg-[#3F0973] text-white text-[16px] leading-[21.6px] font-medium border border-[#3F0973] border-opacity-[40%] px-5 py-3 rounded-[12px] z-10">
                Download app
              </button>

              <Image
                src={customerServiceSupport}
                alt="customer service support"
                className="absolute right-0 bottom-0 pointer-events-none z-[5]"
              />
            </div>

            <div className="flex flex-col justify-between items-start space-y-[11.8rem] bg-[#F8F8F8] border border-[#E1E4E5] rounded-[16px] px-5 py-5 relative overflow-y-hidden -translate-y-[25%] mt-[1rem]">
              <div className="flex flex-col space-y-3 z-10">
                <p className="font-satoshi text-[#3F0973] text-[23.63px] -tracking-[3%] leading-[31.89px] font-medium z-10">
                  Connect with People
                </p>
                <p className="font-satoshi text-[#3F0973] text-[16px] leading-[21.6px] w-[75%]">
                  Meet people who share your interests.
                </p>
              </div>
              <button className="font-satoshi bg-[#3F0973] text-white text-[16px] leading-[21.6px] font-medium border border-[#3F0973] border-opacity-[40%] px-5 py-3 rounded-[12px] z-10">
                Learn more
              </button>

              <Image
                src={connectWithPeople}
                alt="connect with people"
                className="absolute right-0 bottom-0 pointer-events-none z-[5]"
              />
            </div>

            <div className=" bg-[#3F0973] border border-[#E1E4E5] text-white flex flex-col space-y-3 justify-center items-center text-center col-span-2 rounded-[16px] py-8 relative overflow-y-hidden overflow-x-hidden -translate-y-[25%]">
              <p className="font-satoshi text-[43.88px] leading-[59.23px] -tracking-[2.25px] text-center text-white w-[50%] z-10">
                Get the app with the best deals.
              </p>
              <Image src={qrCode} alt="qr code" />
              <Image
                src={rightSpiral}
                alt="qr code"
                className="absolute right-0 bottom-0 pointer-events-none z-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCards;
