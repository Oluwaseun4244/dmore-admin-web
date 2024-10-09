import React, { useState } from 'react'
import useUtils from '@/app/hooks/useUtils';
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useAlert } from "@/lib/features/alert/useAlert";
import Button from '@/app/components/generic/Button';

export default function SendPointToGroup() {
  const { isValidEmail } = useUtils()
  const { alert } = useAlert();
  const [email, setEmail] = useState<string>("")
  const [emails, setEmails] = useState<string[]>([])
  const [groupPayload, setGroupPayload] = useState({
    email: "",
    points: "",
    narration: "",
  });


  const validateGroupPayload = () => {

    const { email, points, narration } = groupPayload

    if (!emails.length) {
      return { message: "Pleae enter at least one email", name: 'emails', error: true }
    }
    if (Number(points) < 20) {
      return { message: "You cannot send less than 20 points", name: 'points', error: true }
    }
    if (narration.length < 10) {
      return { message: "Pleae ensure narration has minimum of 10 characters", name: 'narration', error: true }
    }
    return { message: "", name: "", error: false }

  }
  const handleSingleEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setEmail(e.target.value)
  }
  const handleGroupChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target;

    setGroupPayload((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const addToEmailList = () => {
    if (emails.includes(email)) {
      alert("Email already added", "error");
      return;
    }
    setEmails((emails) => [...emails, email])
    setEmail("")
  }

  const removeEmail = (email: string) => {
    const newEmails = emails.filter(mail => mail != email)
    setEmails(newEmails)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 ">
      {" "}
      <div>
        <div className="h-[54px] rounded-[8px] border-[1px] px-[10px] mt-3 relative">
          <input
            type="email"
            placeholder="Enter a valid email address"
            className="text-[14px] h-full w-full outline-none"
            id="email"
            value={email}
            onChange={handleSingleEmail}
          />
          {
            isValidEmail(email) ? <FaCheck className="absolute right-[10px] top-[16px]" onClick={addToEmailList} /> : <></>
          }

        </div>
        <div className="p-3 min-h-[50px] flex flex-row rounded-[8px] flex-wrap border-[1px] px-[10px] mt-3 gap-2">
          {
            emails.map(email => (
              <div key={email} className="rounded-[4px] border-[#eee] gap-2 border-[1px] h-[25px] px-3 py-2 flex items-center justify-center">
                <p className="font-satoshi text-[14px] font-[600]">{email}</p>
                <MdClose className="text-[12px]" onClick={() => removeEmail(email)} />
              </div>
            ))
          }
        </div>
        <small className="text-red-400">{validateGroupPayload().name == 'emails' ? validateGroupPayload().message : ''}</small>
        <div className="h-[54px] rounded-[8px] border-[1px] px-[10px] mt-3">
          <input
            type="number"
            placeholder="Points"
            id="points"
            className="text-[14px] h-full w-full outline-none"
            value={groupPayload.points}
            onChange={handleGroupChange}
          />
        </div>
        <small className="text-red-400">{validateGroupPayload().name == 'points' ? validateGroupPayload().message : ''}</small>
        <div className="h-[120px] rounded-[8px] border-[1px] p-[10px] mt-3">
          <textarea
            id="narration"
            placeholder="Enter Narration"
            className="text-[14px] h-full w-full outline-none resize-none"
            onChange={handleGroupChange}
            value={groupPayload.narration}
          ></textarea>
        </div>
        <small className="text-red-400">{validateGroupPayload().name == 'narration' ? validateGroupPayload().message : ''}</small>
        <div className="flex justify-end mt-3">
          <Button
            text="Continue"
            bg={validateGroupPayload().error ? "bg-disabled-btn" : "bg-app-purple"}
            classNames="p-3 text-white w-[50%] lg:w-[157px] h-[45px]"
            disabled={validateGroupPayload().error}
          />
        </div>
      </div>
    </div>
  )
}
