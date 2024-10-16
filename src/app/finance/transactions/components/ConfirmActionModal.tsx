import React from "react";
import Modal from "../../../components/generic/Modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Button from "@/app/components/generic/Button";

interface ViewTopUpTxnProps {
  open: boolean;
  isLoading: boolean;
  onClose: (value: boolean) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  question: string;
  proceedFunc: () => void
}


const ConfirmActionModal: React.FC<ViewTopUpTxnProps> = ({
  open,
  onClose,
  setOpen,
  question,
  isLoading,
  proceedFunc
}) => {


  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-white rounded-lg shadow-lg w-[100%] mx-auto ">

        <div className="bg-title-bg-color rounded-tl-lg rounded-tr-lg h-[68px] px-8 flex items-center justify-between">
          <h2 className="font-medium text-[20px] text-black">Confirm Action</h2>
          <IoIosCloseCircleOutline className="cursor-pointer text-[22px]" onClick={() => onClose(false)} />
        </div>

        <div className="p-3 flex items-center justify-center flex-col h-[150px]">

          <p className="mb-4 text-gray-500 dark:text-gray-300">{question}</p>

          <div className="px-4 py-4 flex items-center gap-[10px] justify-end rounded-bl-lg rounded-br-lg">
            <Button
              text="Close"
              bg="bg-white"
              classNames="w-[120px] h-[45px] border border-app-purple text-app-purple"
              onClick={() => onClose(false)}
            />
            <Button
              text="Proceed"
              bg="bg-app-purple"
              isLoading={isLoading}
              classNames="w-[120px] h-[45px] border border-app-purple text-white"
              onClick={proceedFunc}
            />
          </div>
        </div>

        {/* <div>
          <div className="p-8 overflow-auto">

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
                      {txn?.initiatorName}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div> */}
      </div>
    </Modal>
  );
};

export default ConfirmActionModal;
