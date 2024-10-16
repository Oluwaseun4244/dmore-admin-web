import React from "react";
import Modal from "../../../components/generic/Modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AllTransactionType } from "../types/transactions.types";

interface ViewTopUpTxnProps {
  open: boolean;
  onClose: (value: boolean) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  txn: AllTransactionType | undefined
}


const ViewTransaction: React.FC<ViewTopUpTxnProps> = ({
  open,
  onClose,
  setOpen,
  txn
}) => {


  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-white rounded-lg shadow-lg w-[100%] mx-auto">

        <div className="bg-title-bg-color rounded-tl-lg rounded-tr-lg h-[68px] px-8 flex items-center justify-between">
          <h2 className="font-medium text-[20px] text-black">Transaction Detail</h2>
          <IoIosCloseCircleOutline className="cursor-pointer text-[22px]" onClick={() => onClose(false)} />
        </div>


        <div>
          <div className="p-8 overflow-auto">

            <div className="mt-6 border rounded-lg p-4">
              <div className="flex flex-row items-center justify-between">
                <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                  Reference ID:
                </p>
                <div className="flex flex-row items-center justify-between gap-2">
                  <p className="font-satoshi text-[12px] font-[500] text-text-dark2">
                    {txn?.transactionRef}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between">
                <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                  Date:
                </p>
                <div className="flex flex-row items-center justify-between gap-2">
                  <p className="font-satoshi text-[12px] font-[500] text-text-dark2">
                    {txn?.transactionDate}
                  </p>
                </div>
              </div>

              <div className="flex flex-row items-center mt-3 justify-between">
                <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                  Sender:
                </p>
                <div className="flex flex-row items-center justify-between gap-2">
                  <div className="flex items-center gap-[8px]">

                    <p className="font-satoshi text-[12px] font-[500] text-text-dark2">
                      {txn?.sourceUserName || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center mt-3 justify-between">
                <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                  Receiver:
                </p>
                <div className="flex flex-row items-center justify-between gap-2">
                  <p className="font-satoshi text-[12px] font-[500] text-text-dark2">
                    {txn?.receiverName || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center mt-3 justify-between">
                <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                  Points:
                </p>
                <div className="flex flex-row items-center justify-between gap-2">
                  <p className="font-satoshi text-[12px] font-[500] text-text-dark2">
                    {txn?.points.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center mt-3 justify-between">
                <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                  Charges:
                </p>
                <div className="flex flex-row items-center justify-between gap-2">
                  <p className="font-satoshi text-[12px] font-[500] text-text-dark2">
                    {txn?.charges}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center mt-3 justify-between">
                <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                  Status:
                </p>
                <div className="flex flex-row items-center justify-between gap-2">
                  <p className={`font-satoshi text-[12px] font-[500] text-pending-orange ${txn?.status == 'Pending' ? 'text-pending-orange' : 'text-verified-green'}`}>
                    {txn?.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewTransaction;

