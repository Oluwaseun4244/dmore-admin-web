import Button from "@/app/components/generic/Button";
import Modal from "@/app/components/generic/Modal";
import React, { useState } from "react";
import { MultipleUsersPointPayload } from "../types/groups.types";

interface SingleUserPointPayload {
  open: boolean;
  onClose: (value: boolean) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  txn: MultipleUsersPointPayload | undefined;
  handleSaveChanges: (value: number) => void;
  handleChange: (field: string, value: string) => void;
  index: number;
  editableData: { narration: string, points: string }
}

const EditUserSendPointPayload: React.FC<SingleUserPointPayload> = ({
  open,
  onClose,
  setOpen,
  txn,
  handleSaveChanges,
  handleChange,
  index,
  editableData
}) => {
  const handleClose = () => {
    onClose(false);
  };



  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-white rounded-lg shadow-lg w-[100%] mx-auto">
        <div className="bg-title-bg-color rounded-tl-lg rounded-tr-lg h-[68px] px-8 flex items-center">
          <h2 className="font-medium text-[20px] text-black">
            Modify Points Details - {index}
          </h2>
        </div>

        <div className="p-4">
          <div className="mt-6 border rounded-lg p-4">
            <div className="flex flex-row items-center justify-between">
              <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                Name:
              </p>
              <div className="flex flex-row items-center justify-between gap-2">
                <p className="font-satoshi text-[12px] font-[500] text-text-dark2">
                  {`${txn?.firstName} ${txn?.lastName}`}
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center mt-3 justify-between">
              <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                Email:
              </p>
              <div className="flex flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-[8px]">
                  <p className="font-satoshi text-[12px] font-[500] text-text-dark2">
                    {txn?.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex flex-row items-center justify-between">
                <label className="font-satoshi text-text-dark2">Points</label>

              </div>
              <div className="flex flex-col border rounded-lg px-2 mt-2 bg-white">
                <input
                  type="number"
                  placeholder="2000"
                  value={editableData?.points}
                  className="h-[54px] border-none px-2 outline-none font-satoshi bg-white"
                  onChange={(e) => handleChange("points", e.target.value)}
                />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex flex-row items-center justify-between">
                <label className="font-satoshi text-text-dark2">Narration</label>
              </div>
              <div className="flex flex-col border rounded-lg px-2 mt-2 bg-white">
                <textarea className="h-[100px] border-none px-2 outline-none font-satoshi bg-white" value={editableData?.narration} onChange={(e) => handleChange("narration", e.target.value)}></textarea>

              </div>
            </div>

          </div>

          <div className="bg-title-bg-color px-4 py-4 flex items-center gap-[10px] justify-end rounded-bl-lg rounded-br-lg">
            <Button
              text="Cancel"
              bg="bg-white"
              classNames="w-[120px] h-[45px] border border-app-purple text-app-purple"
              onClick={handleClose}
            />
            <Button
              text="Confirm"
              bg="bg-app-purple"
              classNames="w-[120px] h-[45px] border border-app-purple text-white"
              onClick={() => handleSaveChanges(index)}
            />
          </div>
        </div>


      </div>
    </Modal>
  );
};

export default EditUserSendPointPayload;

