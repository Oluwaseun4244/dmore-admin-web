import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { FaCircleInfo } from "react-icons/fa6";
import Tooltip from "../generic/Tooltip";


interface WalletCardProps {
  bg?: string;
  color: string;
  showEyes: boolean;
  showInfo: boolean;
  title: string;
  balance: number;
  toolTip?: string;
}
const WalletCard: React.FC<WalletCardProps> = ({
  bg,
  color,
  showEyes,
  title,
  showInfo,
  balance,
  toolTip,
}) => {
  const maxAmountShown = 100000000;

  const [show, setShow] = useState(true)
  const toggleVisibility = () => {
    setShow(!show)
  }
  return (
    <div
      className={`${bg} flex flex-col justify-between p-4 rounded-[6px] relative h-[146px] border border-[#E2E8F0]`}
    >
      <div className="flex items-center flex-row justify-between">
        <div className="flex flex-row items-center gap-[15px]">
          <p className={`font-satoshi text-[20px] ${color}`}>{title}</p>

          {showInfo && (
            <Tooltip text={toolTip}>
              <FaCircleInfo className={`${color}`} />
            </Tooltip>
          )}
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
  );
};

export default WalletCard;
