import React, { useState } from "react";
import Modal from "../generic/Modal";
import Button from "../generic/Button";


interface TopUpApprovalProps {
  open: boolean;
  onClose: (value: boolean) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopUpApproval: React.FC<TopUpApprovalProps> = ({
  open,
  onClose,
  setOpen,
}) => {

  const handleClose = () => {
    onClose(false)
  }


  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-white rounded-lg shadow-lg w-[100%] mx-auto">
        <div className="bg-title-bg-color rounded-tl-lg rounded-tr-lg h-[68px] px-8 flex items-center">
          <h2 className="font-medium text-[20px] text-black">Top Up Approval Form</h2>
        </div>

        <div className="p-4">
          <div className="mt-6 border rounded-lg p-4">
            <div className="flex flex-row items-center justify-between">
              <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                Reference ID
              </p>
              <div className="flex flex-row items-center justify-between gap-2">
                <p className="font-satoshi text-[12px] font-[500] text-text-dark2">
                  GSGHSRTRH464
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center mt-3 justify-between">
              <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                Top Up Initiated by
              </p>
              <div className="flex flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-[8px]">

                  <p className="font-satoshi text-[12px] font-[500] text-text-dark2">
                    John Okafor
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center mt-3 justify-between">
              <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                Approved/Declined by
              </p>
              <div className="flex flex-row items-center justify-between gap-2">
                <p className="font-satoshi text-[12px] font-[500] text-text-dark2">
                  Okeke
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center mt-3 justify-between">
              <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                Amount
              </p>
              <div className="flex flex-row items-center justify-between gap-2">
                <p className="font-satoshi text-[12px] font-[500] text-text-dark2">
                  N150,000
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center mt-3 justify-between">
              <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                Narration
              </p>
              <div className="flex flex-row items-center justify-between gap-2">
                <p className="font-satoshi text-[12px] font-[500] text-text-dark2">
                  use am chop
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center mt-3 justify-between">
              <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                Status
              </p>
              <div className="flex flex-row items-center justify-between gap-2">
                <p className="font-satoshi text-[12px] font-[500] text-pending-orange">
                  Pending
                </p>
              </div>
            </div>
          </div>

          <div className="my-2">
            <p className="font-satoshi text-[14px] font-[400] text-center text-light-gray">
              Enter your comment for approving or declining
            </p>
          </div>

          <div className="h-[100px] rounded-[8px] border-[1px] p-[10px] mt-3">
            <textarea placeholder="Enter Narration" className="text-[14px] h-full w-full outline-none resize-none"></textarea>

          </div>

        </div>

        <div className="bg-title-bg-color px-4 py-4 flex items-center gap-[10px] justify-end rounded-bl-lg rounded-br-lg">
          <Button
            text="Decline"
            bg="bg-white"
            classNames="w-[120px] h-[45px] border border-app-purple text-app-purple"
            onClick={handleClose}
          />
          <Button
            text="Approve"
            bg="bg-app-purple"
            classNames="w-[120px] h-[45px] border border-app-purple text-white"
            onClick={handleClose}
          />
        </div>
      </div>
    </Modal>
  );
};

export default TopUpApproval;
