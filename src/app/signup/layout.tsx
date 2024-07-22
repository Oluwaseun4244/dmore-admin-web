import Image from "next/image";
import React from "react";
import whiteCloseIcon from "../../../public/icons/white-close-icon.svg";
import dmoreSpiral from "../../../public/images/dmore-spiral.svg";
import people from "../../../public/images/people.svg";
import logo from "../../../public/logo-full.svg";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-white'>
      <div className='h-full w-[75%] flex justify-center items-center'>
        <div className='grid grid-cols-10 gap-10'>
          <div className='col-span-7 flex justify-center items-center'>
            {children}
          </div>
          <div className='col-span-3 flex justify-end items-center'>
            <div className='bg-[#702EB0] h-[634px] w-[337px] rounded-[20px] flex flex-col justify-center items-center relative'>
              <div className='absolute top-0 left-0 w-full h-full p-8 flex items-start justify-end z-10'>
                <Image
                  src={whiteCloseIcon}
                  alt='white close icon'
                  className='cursor-pointer'
                />
              </div>
              <div className='absolute top-0 left-0 w-full h-full flex items-center -z-5'>
                <Image
                  src={dmoreSpiral}
                  alt='dmore spiral'
                  className='pointer-events-none'
                />
              </div>
              <Image src={logo} alt='logo' className='z-10' />
              <div className='w-full h-full absolute bottom-0 left-0 flex items-end rounded-[20px] overflow-hidden'>
                <Image
                  src={people}
                  alt='people'
                  className='pointer-events-none'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
