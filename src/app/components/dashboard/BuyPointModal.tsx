import React, { useState } from "react";
import Modal from "../generic/Modal";
import Button from "../generic/Button";
import { FaCircleInfo } from "react-icons/fa6";
import Image from "next/image";
import stepSvg from "../../../../public/icons/buy-point.svg";
import successSvg from "../../../../public/icons/success.svg";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";

interface BuyPointsModalProps {
  open: boolean;
  onClose: (value: boolean) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Steps {
  viewSteps: string;
}
const BuyPointsModal: React.FC<BuyPointsModalProps> = ({
  open,
  onClose,
  setOpen,
}) => {
  const [modalTitle, setModalTitle] = useState("Buy Points");
  const [cardStep, setCardStep] = useState("cards");
  const [currentView, setCurrentView] = useState<Steps["viewSteps"]>("initial");

  const stepsArray = [
    {
      title: "Share Username",
      subTitle:
        "Receive points from other dmore users with your uniqueusername.",
      viewName: "share",
    },
    {
      title: "Bank Transfer",
      subTitle: "RFrom bank app or internet banking.",
      viewName: "bank",
    },
    {
      title: "Card",
      subTitle: "From bank app or internet banking.",
      viewName: "card",
    },
  ];

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-white rounded-lg shadow-lg w-[100%] mx-auto">
        {currentView != "success" ? (
          <div className="bg-title-bg-color rounded-tl-lg rounded-tr-lg h-[68px] px-8 flex items-center">
            <h2 className="font-medium text-[20px] text-black">{modalTitle}</h2>
          </div>
        ) : (
          <></>
        )}

        {currentView === "initial" ? (
          <div>
            <div className="p-8 overflow-auto">
              {stepsArray.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-[30px]"
                >
                  <div className="flex items-center gap-[10px]">
                    <Image src={stepSvg} alt="logo" />
                    <div className="w-[220px] ">
                      <h2 className="font-medium font-satoshi text-[16px] text-text-dark2">
                        {step.title}
                      </h2>
                      <p className="font-normal font-satoshi text-[12px] text-light-gray2">
                        {step.subTitle}
                      </p>
                    </div>
                  </div>
                  <MdOutlineArrowForwardIos
                    style={{ fontSize: "16px", cursor: "pointer" }}
                    className="text-app-purple"
                    onClick={() => {
                      setCurrentView(step.viewName);
                      setModalTitle(step.title);
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="bg-title-bg-color px-8 py-5 flex items-center gap-[10px] justify-end rounded-bl-lg rounded-br-lg">
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
              />
            </div>
          </div>
        ) : currentView === "share" ? (
          <div>
            <div className="p-8 overflow-auto ">
              <div className="flex flex-col items-center justify-center">
                <Image src={stepSvg} alt="logo" />

                <div className="flex items-center gap-[8px]">
                  <h2 className="font-bold font-satoshi text-[20px] text-text-dark2">
                    Hi, @Emman58
                  </h2>
                  <IoCopyOutline
                    style={{ fontSize: "16px", cursor: "pointer" }}
                  />
                </div>

                <h2 className="font-normal font-satoshi text-[16px] text-light-gray2 text-center">
                  Receive points from other dmore users with your unique
                  username.
                </h2>
              </div>
            </div>

            <div className="bg-title-bg-color px-8 py-5 flex items-center gap-[10px] justify-end rounded-bl-lg rounded-br-lg">
              <Button
                text="Done"
                bg="bg-white"
                classNames="w-[120px] h-[45px] border border-app-purple text-app-purple"
                onClick={() => {
                  setCurrentView("initial");
                  onClose(false);
                }}
              />
              <Button
                text="Share"
                bg="bg-app-purple"
                classNames="w-[120px] h-[45px] border border-app-purple text-white"
              />
            </div>
          </div>
        ) : currentView === "bank" ? (
          <div>
            <div className="p-8 overflow-auto">
              <div className="rounded-lg h-[52px] p-[10px] gap-[10px] border border-[#A855F785] flex items-center bg-faint-peach">
                <FaCircleInfo className="text-app-purple" />
                <p className="font-satoshi text-[12px] font-[400] text-app-purple">
                  Use the details below to send money to your dmore account from
                  any bank’s app or through internet
                </p>
              </div>
              <div className="mt-6 border rounded-lg p-4">
                <div className="flex flex-row items-center justify-between">
                  <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                    Bank
                  </p>
                  <div className="flex flex-row items-center justify-between gap-2">
                    <p className="font-satoshi text-[12px] font-[400] text-text-dark2">
                      Zenith Bank
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center mt-3 justify-between">
                  <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                    Account number
                  </p>
                  <div className="flex flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-[8px]">
                      <IoCopyOutline
                        style={{ fontSize: "16px", cursor: "pointer" }}
                      />
                      <p className="font-satoshi text-[12px] font-[400] text-text-dark2">
                        0098934767
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center mt-3 justify-between">
                  <p className="font-satoshi text-[14px] font-[400] text-light-gray">
                    Account name
                  </p>
                  <div className="flex flex-row items-center justify-between gap-2">
                    <p className="font-satoshi text-[12px] font-[400] text-text-dark2">
                      DmoreEmmanuel
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-title-bg-color mt-3 px-8 py-5 flex items-center gap-[10px] justify-end rounded-bl-lg rounded-br-lg">
              <Button
                text="Back"
                bg="bg-white"
                classNames="w-[120px] h-[45px] border border-app-purple text-app-purple"
                onClick={() => setCurrentView("initial")}
              />
              <Button
                text="Done"
                bg="bg-app-purple"
                classNames="w-[120px] h-[45px] border border-app-purple text-white"
                onClick={() => {
                  setCurrentView("initial");
                  onClose(false);
                }}
              />
            </div>
          </div>
        ) : currentView === "card" ? (
          <div>
            {cardStep === "cards" ? (
              <>
                <div className="p-8 overflow-auto">
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={stepSvg}
                      alt="logo"
                      style={{ height: "100px", width: "100px" }}
                    />
                  </div>
                  <div className="rounded-lg h-[52px] p-[10px] gap-[10px] border border-[#A855F785] flex items-center bg-faint-peach">
                    <FaCircleInfo className="text-app-purple" />
                    <p className="font-satoshi text-[12px] font-[400] text-app-purple">
                      You will be charged for adding money with a card.
                    </p>
                  </div>
                  {false ? (
                    <div className="mt-6 border rounded-lg p-4">
                      <p className="font-satoshi text-[20px] font-[500] text-text-dark2">
                        Saved Cards
                      </p>
                      <p className="font-satoshi text-[16px] mt-2 font-[400] text-light-gray">
                        You currently do not have saved card.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-6 border rounded-lg p-4">
                      <div className="flex flex-row items-center justify-between">
                        <p className="font-satoshi text-[20px] font-[500] text-text-dark2">
                          Saved Cards
                        </p>
                        <div className="flex flex-row items-center justify-between gap-2 cursor-pointer">
                          <p className="font-satoshi text-[12px] font-[400] text-text-dark2">
                            + Add new card
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row items-center mt-3 justify-between">
                        <p className="font-satoshi text-[14px] font-[400] text-text-dark2">
                          ****2926 | Access bank
                        </p>
                        <RiDeleteBinLine
                          style={{ fontSize: "16px", cursor: "pointer" }}
                          className="text-text-dark2"
                        />
                      </div>
                      <div className="flex flex-row items-center mt-3 justify-between">
                        <p className="font-satoshi text-[14px] font-[400] text-text-dark2">
                          ****2926 | Fidelity bank
                        </p>
                        <RiDeleteBinLine
                          style={{ fontSize: "16px", cursor: "pointer" }}
                          className="text-text-dark2"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-title-bg-color mt-3 px-8 py-5 flex items-center gap-[10px] justify-end rounded-bl-lg rounded-br-lg">
                  <Button
                    text="Cancel"
                    bg="bg-white"
                    classNames="w-[120px] h-[45px] border border-app-purple text-app-purple"
                    onClick={() => {
                      onClose(false);
                      setCurrentView("initial");
                    }}
                  />
                  <Button
                    text="Buy Points"
                    bg="bg-app-purple"
                    classNames="w-[120px] h-[45px] border border-app-purple text-white"
                    onClick={() => {
                      setCardStep("buy-points");
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="p-8 overflow-auto">
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={stepSvg}
                      alt="logo"
                      style={{ height: "100px", width: "100px" }}
                    />
                  </div>
                  <div className="rounded-lg h-[52px] p-[10px] gap-[10px] border border-[#A855F785] flex items-center bg-faint-peach">
                    <FaCircleInfo className="text-app-purple" />
                    <p className="font-satoshi text-[12px] font-[400] text-app-purple">
                      You will be charged for adding money with a card.
                    </p>
                  </div>
                  {false ? (
                    <div className="mt-6 border rounded-lg p-4">
                      <p className="font-satoshi text-[20px] font-[500] text-text-dark2">
                        Saved Cards
                      </p>
                      <p className="font-satoshi text-[16px] mt-2 font-[400] text-light-gray">
                        You currently do not have saved card.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-6 border rounded-lg p-4">
                      <div className="flex flex-row items-center justify-between">
                        <p className="font-satoshi text-[20px] font-[500] text-text-dark2">
                          Saved Cards
                        </p>
                        <div className="flex flex-row items-center justify-between gap-2 cursor-pointer">
                          <p className="font-satoshi text-[12px] font-[400] text-text-dark2">
                            + Add new card
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row items-center mt-3 justify-between">
                        <p className="font-satoshi text-[14px] font-[400] text-text-dark2">
                          ****2926 | Access bank
                        </p>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="bankCard"
                            className="hidden peer"
                          />
                          <span className="w-4 h-4 rounded-full border border-gray-400 peer-checked:bg-app-purple peer-checked:border-dark-purple"></span>
                        </label>
                      </div>
                      <div className="flex flex-row items-center mt-3 justify-between">
                        <p className="font-satoshi text-[14px] font-[400] text-text-dark2">
                          ****2926 | Fidelity bank
                        </p>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="bankCard"
                            className="hidden peer"
                          />
                          <span className="w-4 h-4 rounded-full border border-gray-400 peer-checked:bg-app-purple peer-checked:border-dark-purple"></span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-title-bg-color mt-3 px-8 py-5 flex items-center gap-[10px] justify-end rounded-bl-lg rounded-br-lg">
                  <Button
                    text="Cancel"
                    bg="bg-white"
                    classNames="w-[120px] h-[45px] border border-app-purple text-app-purple"
                    onClick={() => {
                      setCardStep("cards");
                    }}
                  />
                  <Button
                    text="Buy Points"
                    bg="bg-app-purple"
                    classNames="w-[120px] h-[45px] border border-app-purple text-white"
                    onClick={() => {
                      setCurrentView("success");
                    }}
                  />
                </div>
              </>
            )}
          </div>
        ) : currentView === "success" ? (
          <div className="w-[100%]">
            <div className="p-8 overflow-auto w-[100%]">
              <div className="flex items-center justify-center w-full">
                <Image src={successSvg} alt="logo" className="w-[119px]" />
              </div>
              <p className="font-satoshi text-[25px] text-center font-[500] mt-4 text-text-dark2">
                Transfer Successful!
              </p>
            </div>
            <div className="mt-1 px-8 py-5 flex items-center justify-center">
              <Button
                text="Done"
                bg="bg-app-purple"
                classNames="w-[143px] h-[45px] border border-app-purple text-white"
                onClick={() => {
                  setCurrentView("initial");
                  onClose(false);
                }}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
};

export default BuyPointsModal;
