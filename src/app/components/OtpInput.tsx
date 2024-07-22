import React, { ChangeEvent, useRef, useState } from "react";

interface OtpInputProps {
  onOtpChange: (otp: string) => void;
  isValidOtp?: boolean;
}

const OtpInput = ({ onOtpChange, isValidOtp }: OtpInputProps) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isOtpFullyEntered = otp.every((digit) => digit !== "");

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (isNaN(Number(e.target.value))) return;

    const newOtp = [
      ...otp.map((d, idx) => (idx === index ? e.target.value : d)),
    ];
    setOtp(newOtp);
    onOtpChange(newOtp.join(""));

    // Focus next input
    if (e.target.value !== "") {
      const nextElement = inputRefs.current[index + 1];
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (index > 0 && otp[index] === "") {
        const prevElement = inputRefs.current[index - 1];
        if (prevElement) {
          prevElement.focus();
        }
      }

      const newOtp = [...otp.map((d, idx) => (idx === index ? "" : d))];
      setOtp(newOtp);
      onOtpChange(newOtp.join(""));
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      onOtpChange(newOtp.join(""));

      // Focus on the last ijnput after a successful paste
      setTimeout(() => {
        const lastInput = inputRefs.current[5];
        if (lastInput) {
          lastInput.focus();
        }
      }, 0);
    }
  };

  return (
    <div className='flex flex-col space-y-3'>
      <div className='flex space-x-2'>
        {otp.map((data, index) => (
          <input
            key={index}
            type='text'
            maxLength={1}
            ref={(el: HTMLInputElement | null) => {
              inputRefs.current[index] = el;
            }}
            value={data}
            autoFocus={index === 0}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={`w-[64px] h-[64px] border border-[#C0C0C0] rounded-[16px] bg-transparent outline-none focus:outline-none focus:border-[#702EB0] focus:border-2 font-satoshi font-bold text-[24px] text-[#090B0C] leading-[32.4px] flex justify-center items-center text-center focus:bg-[#B9A6D4] focus:bg-opacity-[22%] ${
              data ? "bg-[#DAB9FA] bg-opacity-[22%]" : ""
            }`}
          />
        ))}
      </div>
      {/* {!isValidOtp && (
        <p className='font-satoshi text-[#FF0000] text-[16px] leading-[16px]'>
          Invalid code
        </p>
      )} */}
    </div>
  );
};

export default OtpInput;
