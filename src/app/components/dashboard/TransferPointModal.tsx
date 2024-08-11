import React, { useState } from "react";
import Modal from "../generic/Modal";
import Button from "../generic/Button";
import { FaCircleInfo } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import Lottie from "lottie-react";
import verifyingEmail from "../../../../public/lottie/verifying-email.json";

interface TransferPointModalProps {
  open: boolean;
  onClose: (value: boolean) => void;
}
const TransferPointModal: React.FC<TransferPointModalProps> = ({
  open,
  onClose,
}) => {
  const [step, setStep] = useState("transfer");
  return (
    <Modal open={open}>
      {step === "transfer" ? (
        <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[436px] mx-auto">
          <div className="bg-title-bg-color rounded-tl-lg rounded-tr-lg h-[68px] px-8 flex items-center">
            <h2 className="font-medium text-[20px] text-black">
              Transfer Points
            </h2>
          </div>
          <div className="p-8 overflow-auto h-[500px] md:h-full ">
            <div>
              <label className="font-satoshi">Select Wallet</label>
              <div className=" flex flex-col border rounded-lg px-2 mt-2 bg-input-bg">
                <select className="h-[54px] border-none px-2 outline-none font-satoshi bg-input-bg">
                  <option>Retail Wallet</option>
                  <option>Reward Wallet</option>
                </select>
              </div>
            </div>
            <div className="rounded-lg h-[52px] p-[10px] gap-[10px] border border-[#A855F785] mt-6 flex items-center bg-faint-peach">
              <FaCircleInfo className="text-app-purple" />
              <p className="font-satoshi text-[12px] font-[400] text-app-purple">
                Kindly note that you would be charged 15% on this transfer,
                learn more
              </p>
            </div>
            <div className="mt-6">
              <div className="flex flex-row items-center justify-between">
                <label className="font-satoshi">Enter Amount</label>
                <div className="flex flex-row items-center justify-between gap-2">
                  <div className="w-[18px] h-[18px] rounded-[50%] bg-faint-peach2 flex items-center justify-center">
                    <CiCreditCard1 className="text-[12px]" />
                  </div>
                  <p className="font-satoshi text-[12px] font-[400]">
                    Available DMP: 20,0000
                  </p>
                </div>
              </div>
              <div className=" flex flex-col border rounded-lg px-2 mt-2 bg-input-bg">
                <input
                  type="number"
                  placeholder="10000"
                  min={200}
                  className="h-[54px] border-none px-2 outline-none font-satoshi bg-input-bg"
                />
              </div>
            </div>
            <div>
              <div className="flex flex-row items-center justify-end gap-2 mt-[12px]">
                <div className="w-[18px] h-[18px] rounded-[50%] bg-faint-peach2 flex items-center justify-center">
                  <FaCircleInfo className="text-[12px] text-app-purple" />
                </div>
                <p className="font-satoshi text-[12px] font-[400]">
                  Network Fees: <span className="text-app-purple">1500</span>
                </p>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex flex-row items-center justify-between">
                <label className="font-satoshi">Enter User details</label>
                <div className="flex flex-row items-center justify-between gap-2">
                  <p className="font-satoshi text-[12px] text-app-purple font-[400]">
                    Transfer to Bank Account
                  </p>
                </div>
              </div>
              <div className=" flex flex-col border rounded-lg px-2 mt-2 bg-input-bg">
                <input
                  type="text"
                  placeholder="Tola Banjo"
                  className="h-[54px] border-none px-2 outline-none font-satoshi bg-input-bg"
                />
              </div>
            </div>
            <div className="mt-6">
              <div className="flex flex-row items-center justify-between">
                <label className="font-satoshi">Narration</label>
              </div>
              <div className=" flex flex-col border rounded-lg px-2 mt-2 bg-input-bg">
                <input
                  type="text"
                  placeholder="Payment for food"
                  className="h-[54px] border-none px-2 outline-none font-satoshi bg-input-bg"
                />
              </div>
            </div>
          </div>

          <div className="bg-title-bg-color mt-5 px-8 py-5 flex items-center gap-[10px] justify-end rounded-bl-lg rounded-br-lg">
            <Button
              text="Cancel"
              bg="bg-white"
              classNames="w-[120px] h-[45px] border border-app-purple text-app-purple"
              onClick={() => onClose(false)}
            />
            <Button
              text="Continue"
              bg="bg-app-purple"
              classNames="w-[120px] h-[45px] border border-app-purple text-white"
              onClick={() => setStep("pin")}
            />
          </div>
        </div>
      ) : step === "pin" ? (
        <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[436px] mx-auto">
          <div className="bg-title-bg-color rounded-tl-lg rounded-tr-lg h-[68px] px-8 flex items-center">
            <h2 className="font-medium text-[20px] text-black">
              Proceed with your pin
            </h2>
          </div>
          <div className="p-8 overflow-auto h-[500px] md:h-full ">
            <div className="rounded-lg h-[52px] p-[10px] gap-[10px] border border-[#A855F785] flex items-center bg-faint-peach">
              <FaCircleInfo className="text-app-purple" />
              <p className="font-satoshi text-[12px] font-[400] text-app-purple">
                Please confirm every details, once this action is completed it
                cannot be reversed
              </p>
            </div>
            <div className="mt-6 border rounded-lg p-4">
              <div className="flex flex-row items-center justify-between">
                <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                  Amount
                </p>
                <div className="flex flex-row items-center justify-between gap-2">
                  <p className="font-satoshi text-[12px] font-[400]">
                    20,0000 DMP
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-end gap-2 mt-[12px]">
                <div className="w-[18px] h-[18px] rounded-[50%] bg-faint-peach2 flex items-center justify-center">
                  <FaCircleInfo className="text-[12px] text-app-purple" />
                </div>
                <p className="font-satoshi text-[12px] font-[400]">
                  Network Fees: 1500
                </p>
              </div>
              <div className="flex flex-row items-center mt-3 justify-between">
                <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                  Amount to receive
                </p>
                <div className="flex flex-row items-center justify-between gap-2">
                  <p className="font-satoshi text-[12px] font-[400]">
                    N20,0000
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center mt-3 justify-between">
                <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                  User Details
                </p>
                <div className="flex flex-row items-center justify-between gap-2">
                  <p className="font-satoshi text-[12px] font-[400]">
                    Emmanuel58
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center mt-3 justify-between">
                <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                  Narration
                </p>
                <div className="flex flex-row items-center justify-between gap-2">
                  <p className="font-satoshi text-[12px] font-[400]">
                    Payment for food
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center mt-3 justify-center">
              <p className="font-satoshi text-[16px] font-[400] text-light-gray">
                Kindly enter your PIN to proceed
              </p>
              <p className="font-satoshi text-[16px] font-[400] text-light-gray">
                Don’t have a Pin?{" "}
                <span className="text-app-purple">Create new Pin</span>
              </p>
            </div>
          </div>

          <div className="bg-title-bg-color mt-5 px-8 py-5 flex items-center gap-[10px] justify-end rounded-bl-lg rounded-br-lg">
            <Button
              text="Cancel"
              bg="bg-white"
              classNames="w-[120px] h-[45px] border border-app-purple text-app-purple"
              onClick={() => setStep("transfer")}
            />
            <Button
              text="Proceed"
              bg="bg-app-purple"
              classNames="w-[120px] h-[45px] border border-app-purple text-white"
              onClick={() => setStep("progress")}
            />
          </div>
        </div>
      ) : step === "progress" ? (
        <div className="bg-white rounded-lg shadow-lg w-[90%] relative md:w-[436px] h-[400px] mx-auto">
          {/* <Lottie animationData={verifyingEmail} /> */}
          <p className="font-satoshi text-[28px] text-center font-[500]">
            Transfering your funds
          </p>
        </div>
      ) : step === "success" ? (
        <div className="bg-white rounded-lg shadow-lg w-[90%] relative md:w-[436px] h-[400px] mx-auto">
          {/* <Lottie animationData={verifyingEmail} /> */}
          <p className="font-satoshi text-[28px] text-center font-[500]">
            Transfer Successful
          </p>
          <div className="bg-title-bg-color bottom-0 absolute left-0 right-0 mt-5 px-8 py-5 flex items-center gap-[10px] justify-end rounded-bl-lg rounded-br-lg">
            <Button
              text="Cancel"
              bg="bg-white"
              classNames="w-[120px] h-[45px] border border-app-purple text-app-purple"
              onClick={() => onClose(false)}
            />
            <Button
              text="View Receipt"
              bg="bg-app-purple"
              classNames="w-[143px] h-[45px] border border-app-purple text-white"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default TransferPointModal;
