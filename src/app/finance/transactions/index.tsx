"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/app/components/dashboard/DashboardLayout";
import { useQueryClient } from "@tanstack/react-query";
// import Spinner from "@/app/components/generic/Spinner";
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
import TopUp from "./components/TopUp";
import SendPointIndividual from "./components/SendPointIndividual";
import SendPointToGroup from "./components/SendPointToGroup";
import TransferType from "./components/TransferType";
import SendPointMultipleUsers from "./components/SendPointMultipleUsers";

function Index() {
  const searchParams = useSearchParams();
  const variant = searchParams?.get("variant") ?? "";
  const queryClient = useQueryClient();
  // const profileData = queryClient.getQueryData<ProfileResponse>([`profile`]);

  const [topUpApprovalIsOpen, setTopUpApprovalOpen] = useState(false);
  const [txnIsOpen, setViewTxn] = useState(false);
  const [transferType, setTransferType] = useState("multi");

  const viewTransaction = () => {
    setViewTxn(true);
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
        <TopUp />
      ) : variant == "send-points" ? (
        <div className="w-full p-[10px] border-[2px] rounded-[8px]">
          <p className="text-[20px] text-primary-color font-satoshi">
            Select user to send points to
          </p>
          <TransferType handleTransferType={handleTransferType} chosen={transferType} />

          {transferType == "individual" ? (
            <SendPointIndividual />
          ) : transferType == "group" ? (
            <SendPointToGroup />
          ) : transferType == 'multi' ? (
            <SendPointMultipleUsers />
          ) : <></>}
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
