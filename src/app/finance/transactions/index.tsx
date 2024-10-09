"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/app/components/dashboard/DashboardLayout";
import { useQueryClient } from "@tanstack/react-query";
// import Spinner from "@/app/components/generic/Spinner";

import ViewTopUp from "@/app/finance/transactions/components/ViewTopUp";
import { useSearchParams } from "next/navigation";
import TopUp from "./components/TopUp";
import SendPointIndividual from "./components/SendPointIndividual";
import SendPointToGroup from "./components/SendPointToGroup";
import TransferType from "./components/TransferType";
import SendPointMultipleUsers from "./components/SendPointMultipleUsers";
import TopUpApproval from "./components/TopUpApproval";
import Transactions from "./components/Transactions";
import { FinanceInflowType } from "./types/inflow.types";

function Index() {
  const searchParams = useSearchParams();
  const variant = searchParams?.get("variant") ?? "";
  const queryClient = useQueryClient();
  // const profileData = queryClient.getQueryData<ProfileResponse>([`profile`]);

  const [topUpApprovalIsOpen, setTopUpApprovalOpen] = useState(false);
  const [watchTopUp, setWatchTopUp] = useState(false);
  const [txnIsOpen, setViewTxn] = useState(false);
  const [transferType, setTransferType] = useState("multi");
  const [viewedTransaction, setViewedTransaction] = useState<FinanceInflowType>()

  const viewTransaction = (txn: FinanceInflowType, caller: string) => {
    setViewedTransaction(txn)
    if (caller == 'view') {
      setViewTxn(true);
      return
    }
    if (caller == 'approval') {
      setTopUpApprovalOpen(true);
      return
    }
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
        <TopUp setWatchTopUp={setWatchTopUp} watchTopUp={watchTopUp} />
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

      <Transactions viewTransaction={viewTransaction} watchTopUp={watchTopUp} />

      <TopUpApproval
        open={topUpApprovalIsOpen}
        onClose={() => setTopUpApprovalOpen(false)}
        setOpen={setTopUpApprovalOpen}
        txn={viewedTransaction}
      />
      <ViewTopUp
        open={txnIsOpen}
        setOpen={setViewTxn}
        onClose={() => setViewTxn(false)}
        txn={viewedTransaction}
      />
    </DashboardLayout>
  );
}

export default Index;
