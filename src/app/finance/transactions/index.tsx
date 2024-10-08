"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/app/components/dashboard/DashboardLayout";
import TransferPointModal from "@/app/components/dashboard/TransferPointModal";
import Button from "@/app/components/generic/Button";
import { useAlert } from "@/lib/features/alert/useAlert";
import { UserWallets } from "@/app/types/wallet.types";
import { useGetQuery } from "@/app/utils/apiUtils";
import { ProfileResponse } from "@/app/types/auth.types";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "@/app/components/generic/Spinner";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosFunnel } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import ViewTopUp from "@/app/components/dashboard/ViewTopUp";
import TopUpApproval from "@/app/components/dashboard/TopUpApproval";
import { useSearchParams } from "next/navigation";
import useUtils from "@/app/hooks/useUtils";

function Index() {
  const { isValidEmail } = useUtils();
  const searchParams = useSearchParams();
  const variant = searchParams?.get("variant") ?? "";
  const queryClient = useQueryClient();
  // const profileData = queryClient.getQueryData<ProfileResponse>([`profile`]);
  // const { alert } = useAlert();

  const [topUpApprovalIsOpen, setTopUpApprovalOpen] = useState(false);
  const [txnIsOpen, setViewTxn] = useState(false);
  const [topUpPayload, setTopUpPaylod] = useState({
    email: "",
    points: 0,
  });
  const [individualPayload, setIndividualPayload] = useState({
    email: "",
    points: "",
    narration: "",
  });
  const [transferType, setTransferType] = useState("");

  const viewTransaction = () => {
    setViewTxn(true);
  };

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

  const handleTopUpPayload = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target;

    setTopUpPaylod((prev) => ({
      ...prev,
      [id]: id === 'points' ? Number(value) : value,
    }));
  };

  const handleIndividualChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target;

    setIndividualPayload((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const decidePageTitle = () => {

    let title = "Transactions"
    switch (variant) {
      case "top-up":
        return "Top up Account"
        break;
      case "send-points":
        return "Send Points To Users"
        break;
      default:
        break;
    }

    return title
  }

  const handleTransferType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransferType(e.target.value); // Set the selected radio button's value to state
  };

  return (
    <DashboardLayout activePage="topUp" navTitle={decidePageTitle()}>
      {variant == "top-up" ? (
        <div className="w-full lg:w-[400px] p-[10px] border-[2px] rounded-[8px]">
          <p className="text-[20px] text-primary-color font-satoshi">
            Top up Account
          </p>
          <div className="h-[54px] rounded-[8px] border-[1px] px-[10px] mt-3">
            <input
              type="number"
              placeholder="Enter Amount"
              className="text-[14px] h-full w-full outline-none"
              value={topUpPayload.email}
              onChange={handleTopUpPayload}
            />
          </div>
          <div className="h-[120px] rounded-[8px] border-[1px] p-[10px] mt-3">
            <textarea
              placeholder="Enter Narration"
              className="text-[14px] h-full w-full outline-none resize-none"
            ></textarea>
          </div>

          <div className="flex justify-end mt-3">
            <Button
              text="Continue"
              bg={individualPayload.email?.length ? "bg-app-purple" : "bg-disabled-btn"}
              classNames="p-3 text-white w-[50%] lg:w-[157px] h-[45px]"
            />
          </div>
        </div>
      ) : variant == "send-points" ? (
        <div className="w-full p-[10px] border-[2px] rounded-[8px]">
          <p className="text-[20px] text-primary-color font-satoshi">
            Select user to send points to
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6 ">
            <div className="w-full">
              <div className="flex items-center mb-4">
                <input
                  id="individual"
                  type="radio"
                  value="individual"
                  name="individualOrGroup"
                  className="w-4 h-4 text-app-purple bg-red-500 border-gray-300  focus:ring-2"
                  onChange={handleTransferType}
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Individuals
                </label>
              </div>


            </div>
            <div className="w-full">
              <div className="flex items-center mb-4">
                <input
                  id="group"
                  type="radio"
                  value="group"
                  name="individualOrGroup"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2"
                  onChange={handleTransferType}
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Group
                </label>
              </div>
            </div>
          </div>

          {transferType == "individual" ? (
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
          ) : transferType == "group" ? (
            <div></div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}



      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-10 overflow-auto">
        <div className="border h-[484px] rounded-[6px] p-4">
          <div className="flex items-center justify-between">
            <p className={`font-satoshi text-[24px] font-bold text-app-purple`}>
              Transactions
            </p>
          </div>
          <hr className="my-2" />

          <div className="my-3 flex items-center flex-col lg:flex-row justify-between gap-3 lg:gap-0">
            <div className="h-[40px] w-full lg:w-[300px] rounded-[6px] border-[1px] flex items-center px-2 gap-2">
              <IoSearchOutline className="text-[#868FA0]" />
              <input
                placeholder="Search"
                className="outline-none border-none h-full w-full"
              />
            </div>
            <div className="gap-2 flex flex-col lg:flex-row items-center w-full lg:w-[300px]">
              <div className="h-[40px] min-w-full lg:min-w-[160px] rounded-[6px] border-[1px] flex items-center px-2 gap-2">
                <input type="date" className="w-full" />
              </div>

              <div className="h-[40px] min-w-full lg:min-w-[125px] rounded-[6px] border-[1px] flex items-center px-2 gap-2">
                <IoIosFunnel className="text-[#868FA0]" />
                <select className="border-none outline-none w-full">
                  <option>Sort by</option>
                  <option>Old-New</option>
                  <option>New-Old</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-auto">
            <div className="lg:w-full min-w-[1400px] ">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-[#DAB9FA17] h-[50px]">
                    <td className="text-app-purple font-[500] text-[15px] font-satoshi"></td>
                    <td className="text-app-purple font-[500] text-[15px] font-satoshi">
                      #
                    </td>
                    <td className="text-app-purple font-[500] text-[15px] font-satoshi">
                      REFERENCE NUMBER
                    </td>
                    <td className="text-app-purple font-[500] text-[15px] font-satoshi">
                      INITIATED
                    </td>
                    <td className="text-app-purple font-[500] text-[15px] font-satoshi">
                      POINTS
                    </td>
                    <td className="text-app-purple font-[500] text-[15px] font-satoshi">
                      APPROVED BY
                    </td>
                    <td className="text-app-purple font-[500] text-[15px] font-satoshi">
                      STATUS
                    </td>
                    <td className="text-app-purple font-[500] text-[15px] font-satoshi">
                      DATE
                    </td>
                    <td className="text-app-purple font-[500] text-[15px] font-satoshi">
                      ACTION
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {[].length ? [5].map((item, index) => (
                    <tr
                      className={`h-[50px] ${index % 2 == 0 ? "" : "bg-[#DAB9FA17]"
                        }`}
                      key={index}
                    >
                      <td></td>
                      <td className="text-app-purple font-[500] text-[14px] font-satoshi">
                        {index + 1}
                      </td>
                      <td className="text-app-purple font-[500] text-[14px] font-satoshi">
                        DmorehdjGuFVGcD8t
                      </td>
                      <td className="text-primary-color font-[500] text-[14px] font-satoshi">
                        Victor Omerenma
                      </td>
                      <td className="text-primary-color font-[500] text-[14px] font-satoshi">
                        150,000
                      </td>
                      <td className="text-primary-color font-[500] text-[14px] font-satoshi">
                        Andy E.
                      </td>
                      <td className="text-pending-orange font-[500] text-[14px] font-satoshi">
                        Pending
                      </td>
                      <td className="text-primary-color font-[500] text-[14px] font-satoshi">
                        15 Mar 2021, 12:47 PM
                      </td>
                      <td className="text-app-purple font-[500] text-[14px] font-satoshi">
                        <div className="flex gap-3">
                          <MdOutlineRemoveRedEye
                            className="text-pending-orange cursor-pointer"
                            onClick={viewTransaction}
                          />{" "}
                          <MdVerified className="text-verify-green cursor-pointer" />{" "}
                          <RiDeleteBinLine className="text-delete-red cursor-pointer" />{" "}
                        </div>
                      </td>
                    </tr>
                  )) : <tr>
                    <td colSpan={8} className="text-center py-4">
                      No data available
                    </td>
                  </tr>}

                </tbody>
              </table>
            </div>
          </div>

          {/* PAGINATION ROW */}
          {
            [].length ? <div className="flex justify-end">
              <div className="flex items-center gap-2">
                <p
                  className={`font-satoshi text-[12px] font-[500] text-[#687182]`}
                >
                  Rows per page:
                </p>
                <div className="w-[30px] h-[25px] rounded-[6px] border-[1px] flex items-center justify-center cursor-pointer">
                  <IoIosArrowBack className="text-[16px] text-[#687182]" />
                </div>
                <p
                  className={`font-satoshi text-[12px] font-[500] text-primary-color`}
                >
                  1
                </p>
                <div className="w-[30px] h-[25px] rounded-[6px] border-[1px] flex items-center justify-center cursor-pointer">
                  <IoIosArrowForward className="text-[16px] text-[#687182]" />
                </div>
              </div>
            </div> : <></>
          }

        </div>
      </div>

      <TopUpApproval
        open={topUpApprovalIsOpen}
        onClose={() => setTopUpApprovalOpen(false)}
        setOpen={setTopUpApprovalOpen}
      />
      <ViewTopUp
        open={txnIsOpen}
        setOpen={setViewTxn}
        onClose={() => setViewTxn(false)}
      />
    </DashboardLayout>
  );
}

export default Index;
