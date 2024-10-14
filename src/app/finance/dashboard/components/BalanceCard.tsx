import Button from "@/app/components/generic/Button";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useRouter } from "next/navigation";



interface WalletCardProps {
  bg?: string;
  color: string;
  showEyes: boolean;
  title: string;
  balance: number;
  goTo: (value: string, id: string) => void;
  id: string
}

export default function BalanceCard({
  bg,
  color,
  showEyes,
  title,
  balance,
  goTo,
  id
}: WalletCardProps) {

  const maxAmountShown = 100000000;

  const [show, setShow] = useState(true)
  const toggleVisibility = () => {
    setShow(!show)
  }
  return (
    <div
      className={`${bg} flex flex-col justify-between p-4 rounded-[6px] relative h-[200px] border border-[#E2E8F0]`}
    >
      <div>
        <div className="flex items-center flex-row justify-between">
          <div className="flex flex-row items-center gap-[15px]">
            <p className={`font-satoshi text-[20px] ${color}`}>{title}</p>
          </div>
          <BsThreeDotsVertical className={`${color}`} />
        </div>
        <div className="flex items-center flex-row justify-between">
          <p className={`font-satoshi font-bold text-[28px] ${color}`}>
            {show ? balance <= maxAmountShown
              ? balance.toLocaleString()
              : maxAmountShown.toLocaleString() + "+" : "**********"}
          </p>
          {showEyes ? (show ? <BsEyeSlash className={`${color}`} onClick={toggleVisibility} /> : <BsEye className={`${color}`} onClick={toggleVisibility} />) : <></>}
        </div>
      </div>
      <div className="h-[1px] bg-white"></div>
      <div className="flex items-center flex-row justify-between">
        <div>
          <p className={`font-satoshi font-medium text-[16px] ${color}`}>
            Currency Equivalent
          </p>
          <p className={`font-satoshi font-medium text-[18px] text-white`}>
            0
          </p>
        </div>
        <Button
          text="Load Account"
          bg="bg-white"
          classNames="p-3 text-app-purple border w-[147px] h-[51px]"
          onClick={() => goTo('top-up', id)}
        />
      </div>
    </div>
  )
}
