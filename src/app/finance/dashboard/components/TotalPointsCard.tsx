import Button from "@/app/components/generic/Button";
import Tooltip from "@/app/components/generic/Tooltip";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCircleInfo } from "react-icons/fa6";


type SendPointCardType = {
  toolTip?: string
}

export default function TotalPointsCard({ toolTip }: SendPointCardType) {


  return (
    <div
      className={`bg-white flex flex-col justify-between p-4 rounded-[6px] relative h-[200px] border border-[#E2E8F0]`}
    >
      <div>
        <div className="flex items-center flex-row justify-between">
          <div className="flex flex-row items-center gap-[15px]">
            <p className={`font-satoshi text-[20px] text-primary-color`}>Total Paid Out</p>
          </div>
        </div>

        <div className="flex items-center flex-row justify-between">
          <p className={`font-satoshi font-bold text-[32px] text-app-purple`}>
            0
          </p>

        </div>
      </div>
      <div className="h-[1px] bg-[#E2E8F0]"></div>
      <div className="flex items-center flex-row justify-between">

        <Button
          text="View All"
          bg="bg-app-purple"
          classNames="p-3 text-white border w-full h-[51px]"
        // onClick={() => goToTransactions('send-points')}
        />
      </div>
    </div>
  )
}

