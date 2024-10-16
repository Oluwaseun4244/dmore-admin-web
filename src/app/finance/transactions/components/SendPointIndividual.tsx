import React, { useState } from 'react'
import useUtils from '@/app/hooks/useUtils';
import Button from '@/app/components/generic/Button';
import { useSendPoints } from '../hooks/useSendPoints';
import ConfirmActionModal from './ConfirmActionModal';


type SendPointIndividualPropTypes = {
  code: string | undefined
}

export default function SendPointIndividual({ code }: SendPointIndividualPropTypes) {
  const { isValidEmail } = useUtils()
  const [individualPayload, setIndividualPayload] = useState({
    email: "",
    points: "",
  });

  const [narration, setNarration] = useState("")
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const { sendPointsMutation } = useSendPoints(setOpenConfirmation)

  const validateIndividualPayload = () => {

    const { email, points } = individualPayload
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

  const handleNarration = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setNarration(value)
  };


  const handleSendPoints = () => {
    sendPointsMutation.mutate({
      recipients: [individualPayload],
      narration,
      WalletCode: code || ""
    })
  }

  return (
    <React.Fragment>

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
              onChange={handleNarration}
              value={narration}
            ></textarea>
          </div>
          <small className="text-red-400">{validateIndividualPayload().name == 'narration' ? validateIndividualPayload().message : ''}</small>
          <div className="flex justify-end mt-3">
            <Button
              text="Continue"
              bg={validateIndividualPayload().error ? "bg-disabled-btn" : "bg-app-purple"}
              classNames="p-3 text-white w-[50%] lg:w-[157px] h-[45px]"
              disabled={validateIndividualPayload().error || !code}
              onClick={() => setOpenConfirmation(true)}
              isLoading={sendPointsMutation.isPending}
            />
          </div>
        </div>
      </div>

      <ConfirmActionModal open={openConfirmation} question='Are you sure you want to proceed?' setOpen={setOpenConfirmation} onClose={setOpenConfirmation} isLoading={sendPointsMutation.isPending} proceedFunc={handleSendPoints} />
    </React.Fragment>
  )
}
