import React, { useState } from 'react'
import useUtils from '@/app/hooks/useUtils';
import Button from '@/app/components/generic/Button';

export default function SendPointIndividual() {
  const { isValidEmail } = useUtils()
  const [individualPayload, setIndividualPayload] = useState({
    email: "",
    points: "",
    narration: "",
  });

  const validateIndividualPayload = () => {

    const { email, points, narration } = individualPayload
    if (!isValidEmail(email)) {
      return { message: "Pleae enter a valid email", name: 'email', error: true }
    }
    if (Number(points) < 20) {
      return { message: "You cannot send less than 20 points", name: 'points', error: true }
    }
    if (narration.length < 10) {
      return { message: "Pleae ensure narration has minimum of 10 characters", name: 'narration', error: true }
    }
    return { message: "Pleae ensure narration has minimum of 10 characters", name: "", error: false }

  }

  const handleIndividualChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target;

    setIndividualPayload((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 ">
      {" "}
      <div>

        <div className="h-[54px] rounded-[8px] border-[1px] px-[10px] mt-3">
          <input
            type="email"
            placeholder="Enter email address"
            className="text-[14px] h-full w-full outline-none"
            id="email"
            value={individualPayload.email}
            onChange={handleIndividualChange}
          />
        </div>
        <small className="text-red-400">{validateIndividualPayload().name == 'email' ? validateIndividualPayload().message : ''}</small>
        <div className="h-[54px] rounded-[8px] border-[1px] px-[10px] mt-3">
          <input
            type="number"
            placeholder="Points"
            id="points"
            className="text-[14px] h-full w-full outline-none"
            value={individualPayload.points}
            onChange={handleIndividualChange}
          />
        </div>
        <small className="text-red-400">{validateIndividualPayload().name == 'points' ? validateIndividualPayload().message : ''}</small>
        <div className="h-[120px] rounded-[8px] border-[1px] p-[10px] mt-3">
          <textarea
            id="narration"
            placeholder="Enter Narration"
            className="text-[14px] h-full w-full outline-none resize-none"
            onChange={handleIndividualChange}
            value={individualPayload.narration}
          ></textarea>
        </div>
        <small className="text-red-400">{validateIndividualPayload().name == 'narration' ? validateIndividualPayload().message : ''}</small>
        <div className="flex justify-end mt-3">
          <Button
            text="Continue"
            bg={validateIndividualPayload().error ? "bg-disabled-btn" : "bg-app-purple"}
            classNames="p-3 text-white w-[50%] lg:w-[157px] h-[45px]"
            disabled={validateIndividualPayload().error}
          />
        </div>
      </div>
    </div>
  )
}
