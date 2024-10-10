import Button from "@/app/components/generic/Button";
import Modal from "@/app/components/generic/Modal";
import React, { useState } from "react";
import { useTopUpApproval } from "../hooks/useTopUpApproval";
import { FinanceInflowType } from "../types/inflow.types";

interface TopUpApprovalProps {
  open: boolean;
  onClose: (value: boolean) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  txn: FinanceInflowType | undefined;
}

const TopUpApproval: React.FC<TopUpApprovalProps> = ({
  open,
  onClose,
  setOpen,
  txn,
}) => {
  const handleDecline = () => {
    onClose(false);
  };

  const { topUpApprovalMutation } = useTopUpApproval(txn?.id, onClose);

  const handleApprove = () => {
    topUpApprovalMutation.mutate({});
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-white rounded-lg shadow-lg w-[100%] mx-auto">
        <div className="bg-title-bg-color rounded-tl-lg rounded-tr-lg h-[68px] px-8 flex items-center">
          <h2 className="font-medium text-[20px] text-black">
            Top Up Approval Form
          </h2>
        </div>

        <div className="p-4">
          <div className="mt-6 border rounded-lg p-4">
            <div className="flex flex-row items-center justify-between">
              <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                Reference ID:
              </p>
              <div className="flex flex-row items-center justify-between gap-2">
                <p className="font-satoshi text-[12px] font-[500] text-text-dark2">
                  {txn?.providerReference}
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center mt-3 justify-between">
              <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                Top Up Initiated by:
              </p>
              <div className="flex flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-[8px]">
                  <p className="font-satoshi text-[12px] font-[500] text-text-dark2">
                    {txn?.initiatorUserId}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center mt-3 justify-between">
              <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                Approved/Declined by:
              </p>
              <div className="flex flex-row items-center justify-between gap-2">
                <p className="font-satoshi text-[12px] font-[500] text-text-dark2">
                  {txn?.approverUserId || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center mt-3 justify-between">
              <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                Amount:
              </p>
              <div className="flex flex-row items-center justify-between gap-2">
                <p className="font-satoshi text-[12px] font-[500] text-text-dark2">
                  {txn?.points.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center mt-3 justify-between">
              <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                Narration:
              </p>
              <div className="flex flex-row items-center justify-between gap-2">
                <p className="font-satoshi text-[12px] font-[500] text-text-dark2">
                  {txn?.narration}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center mt-3 justify-between">
              <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                Status:
              </p>
              <div className="flex flex-row items-center justify-between gap-2">
                <p
                  className={`font-satoshi text-[12px] font-[500] text-pending-orange ${txn?.status == 1
                    ? "text-pending-orange"
                    : "text-verified-green"
                    }`}
                >
                  {txn?.status == 1 ? "Pending" : "Approved"}
                </p>
              </div>
            </div>
          </div>

          {txn?.status == 1 ? (
            <div>
              <div className="my-2">
                <p className="font-satoshi text-[14px] font-[400] text-center text-light-gray">
                  Enter your comment for approving or declining
                </p>
              </div>
              <div className="h-[100px] rounded-[8px] border-[1px] p-[10px] mt-3">
                <textarea
                  placeholder="Enter Narration"
                  className="text-[14px] h-full w-full outline-none resize-none"
                ></textarea>
              </div>

              <div className="bg-title-bg-color px-4 py-4 flex items-center gap-[10px] justify-end rounded-bl-lg rounded-br-lg">
                <Button
                  text="Decline"
                  bg="bg-white"
                  classNames="w-[120px] h-[45px] border border-app-purple text-app-purple"
                  onClick={handleDecline}
                />
                <Button
                  text="Approve"
                  bg="bg-app-purple"
                  isLoading={topUpApprovalMutation.isPending}
                  classNames="w-[120px] h-[45px] border border-app-purple text-white"
                  onClick={handleApprove}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>


      </div>
    </Modal>
  );
};

export default TopUpApproval;
