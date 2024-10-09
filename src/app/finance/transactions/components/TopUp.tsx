import Button from '@/app/components/generic/Button';
import React, { useState } from 'react'

export default function TopUp() {

  const [topUpPayload, setTopUpPaylod] = useState({
    amount: "",
    narration: 0,
  });

  const handleTopUpPayload = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target;

    setTopUpPaylod((prev) => ({
      ...prev,
      [id]: id === 'amount' ? Number(value) : value,
    }));
  };
  return (
    <div className="w-full lg:w-[400px] p-[10px] border-[2px] rounded-[8px]">
      <p className="text-[20px] text-primary-color font-satoshi">
        Top up Account
      </p>
      <div className="h-[54px] rounded-[8px] border-[1px] px-[10px] mt-3">
        <input
          type="number"
          id='amount'
          placeholder="Enter Amount"
          className="text-[14px] h-full w-full outline-none"
          value={topUpPayload.amount}
          onChange={handleTopUpPayload}
        />
      </div>
      <div className="h-[120px] rounded-[8px] border-[1px] p-[10px] mt-3">
        <textarea
          placeholder="Enter Narration"
          className="text-[14px] h-full w-full outline-none resize-none"
          value={topUpPayload.narration}
          onChange={handleTopUpPayload}
        ></textarea>
      </div>

      <div className="flex justify-end mt-3">
        <Button
          text="Continue"
          bg={true ? "bg-app-purple" : "bg-disabled-btn"}
          classNames="p-3 text-white w-[50%] lg:w-[157px] h-[45px]"
        />
      </div>
    </div>
  )
}
