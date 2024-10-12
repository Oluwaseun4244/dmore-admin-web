import Button from "@/app/components/generic/Button";
import Tooltip from "@/app/components/generic/Tooltip";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCircleInfo } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";


type SendPointCardType = {
  toolTip?: string,
  goTo: (value: string) => void
}

export default function SendPointCard({ toolTip,goTo }: SendPointCardType) {


  return (
    <div
      className={`bg-white flex flex-col justify-between p-4 rounded-[6px] relative h-[200px] border border-[#E2E8F0]`}
    >
      <div>
        <div className="flex items-center flex-row justify-between">
          <div className="flex flex-row items-center gap-[15px]">
            <p className={`font-satoshi text-[20px] text-primary-color`}>Points </p>

            <Tooltip text={toolTip || 'Send Points'}>
              <FaCircleInfo className={`text-[#768193]`} />
            </Tooltip>

          </div>
          <BsThreeDotsVertical className='text-primary-color' />
        </div>

      </div>
      <div className="h-[1px] bg-[#E2E8F0]"></div>
      <div className="flex items-center flex-row justify-between">

        <Button
          text="Send Points"
          bg="bg-white"
          classNames="p-3 text-[#464F60] border w-[147px] h-[51px]"
          onClick={() => goTo('send-points')}
          icon={<GoPlus />}
          iconPosition='left'
        />
      </div>
    </div>
  )
}

