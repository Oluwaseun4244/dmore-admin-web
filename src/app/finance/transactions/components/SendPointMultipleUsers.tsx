import React, { useState } from 'react'
import useUtils from '@/app/hooks/useUtils';
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useAlert } from "@/lib/features/alert/useAlert";
import Button from '@/app/components/generic/Button';

export default function SendPointMultipleUsers() {
  const { isValidEmail } = useUtils()

  const [multiPayload, setMultiPayload] = useState([
    { email: "", points: "", narration: "" },
  ]);




  const validatemultiPayload = (toValidate: string, value: string) => {

    if (toValidate == 'email') {
      if (!isValidEmail(value)) {
        return { message: "Pleae enter at least one email", name: 'emails', error: true }
      }
    }
    if (toValidate == 'points') {
      if (Number(value) < 20) {
        return { message: "You cannot send less than 20 points", name: 'points', error: true }
      }
    }
    if (toValidate == 'narration') {
      if (value.length < 10) {
        return { message: "Pleae ensure narration has minimum of 10 characters", name: 'narration', error: true }
      }
    }
    return { message: "", name: "", error: false }

  }


  const handleMultiChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { value, id } = e.target;

    setMultiPayload((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
            ...item,
            [id]: value,
          }
          : item
      )
    );
  };

  const removePayload = () => {
    setMultiPayload((prev) => prev.slice(0, -1));
  };

  const addNewPayload = () => {
    setMultiPayload((prev) => [
      ...prev,
      { email: "", points: "", narration: "" },
    ]);
  };
  return (
    <div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {
          multiPayload.map((payload, index) => (
            <div key={index}>
              <div className="h-[54px] rounded-[8px] border-[1px] px-[10px] mt-3 ">
                <input
                  type="email"
                  placeholder="Enter a valid email address"
                  className="text-[14px] h-full w-full outline-none"
                  id="email"
                  value={payload.email}
                  onChange={(e) => handleMultiChange(e, index)}
                />

              </div>

              <small className="text-red-400">{validatemultiPayload('email', payload.email).message}</small>
              <div className="h-[54px] rounded-[8px] border-[1px] px-[10px] mt-3">
                <input
                  type="number"
                  placeholder="Points"
                  id="points"
                  className="text-[14px] h-full w-full outline-none"
                  value={payload.points}
                  onChange={(e) => handleMultiChange(e, index)}
                />
              </div>
              <small className="text-red-400">{validatemultiPayload('points', payload.points).message}</small>
              <div className="h-[100px] rounded-[8px] border-[1px] p-[10px] mt-3">
                <textarea
                  id="narration"
                  placeholder="Enter Narration"
                  className="text-[14px] h-full w-full outline-none resize-none"
                  onChange={(e) => handleMultiChange(e, index)}
                  value={payload.narration}
                ></textarea>
              </div>
              <small className="text-red-400">{validatemultiPayload('narration', payload.narration).message}</small>

            </div>
          ))
        }
      </div>

      <div className={`flex ${multiPayload.length > 1 ? 'justify-between' : 'justify-end'} mt-3`}>
        {
          multiPayload.length > 1 ? <Button
            text="Remove"
            bg={"bg-pending-orange"}
            classNames="p-3 text-white w-[45%] lg:w-[157px] h-[45px]"
            onClick={removePayload}
          /> : <></>
        }

        <Button
          text="Add More"
          bg={"bg-app-purple"}
          classNames="p-3 text-white w-[45%] lg:w-[157px] h-[45px]"
          onClick={addNewPayload}
        />
      </div>
      <div className="flex justify-end mt-3">
        <Button
          text="Submit"
          bg={"bg-disabled-btn"}
          classNames="p-3 text-white w-[45%] lg:w-[157px] h-[45px]"

        />
      </div>
    </div>
  )
}
