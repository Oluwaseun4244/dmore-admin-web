"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/app/components/dashboard/DashboardLayout";
// import { useQueryClient } from "@tanstack/react-query";
// import Spinner from "@/app/components/generic/Spinner";

import ViewTopUp from "@/app/finance/transactions/components/ViewTopUp";
import { useSearchParams } from "next/navigation";
import TopUp from "./components/TopUp";
import SendPointIndividual from "./components/SendPointIndividual";
import SendPointToGroup from "./components/SendPointToGroup";
import TransferType from "./components/TransferType";
import TopUpApproval from "./components/TopUpApproval";
import Transactions from "./components/Transactions";
import { FinanceInflowType } from "./types/inflow.types";
import TopUpTransactions from "./components/TopUpTransactions";
import { AllTransactionType } from "./types/transactions.types";
import ViewTransaction from "./components/ViewTransaction";
import { FinanceWalletType } from "../dashboard/types/wallets.types";
import { useGetQuery } from "@/app/utils/apiUtils";

function Index() {
  const searchParams = useSearchParams();
  const variant = searchParams?.get("variant") ?? "";
  const walletID = searchParams?.get("walletID") ?? "";
  // const queryClient = useQueryClient();
  // const profileData = queryClient.getQueryData<ProfileResponse>([`profile`]);

  const [topUpApprovalIsOpen, setTopUpApprovalOpen] = useState(false);
  const [watchTopUp, setWatchTopUp] = useState(false);
  const [topUpTxnOpen, setTopUpTxnOpen] = useState(false);
  const [txnIsOpen, setViewTxn] = useState(false);
  const [transferType, setTransferType] = useState("individual");
  const [viewedInflow, setViewedInflow] =
    useState<FinanceInflowType>();
  const [viewedTransaction, setViewedTransactions] =
    useState<AllTransactionType>();

    const walletQuery = useGetQuery<FinanceWalletType>(
      {
        url: `financewallet/${walletID}`,
        queryKeys: [`single-finance-wallet-${walletID}`, walletID],
      },
      {
        enabled: !!walletID,
        queryKey: [`single-finance-wallet-${walletID}`, walletID],
        refetchOnWindowFocus: false,
      }
    );


  const handleViewInflow = (txn: FinanceInflowType, caller: string) => {
    setViewedInflow(txn);
    if (caller == "view") {
      setTopUpTxnOpen(true);
      return;
    }
    if (caller == "approval") {
      setTopUpApprovalOpen(true);
      return;
    }
  };

  const handleViewTransaction = (txn: AllTransactionType) => {
    setViewedTransactions(txn);

    setViewTxn(true);
    return;


  };

  const decidePageTitle = () => {
    let title = "Transactions";
    switch (variant) {
      case "top-up":
        return "Top up Account";
      case "send-points":
        return "Send Points To Users";
      default:
        break;
    }

    return title;
  };

  const handleTransferType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransferType(e.target.value); // Set the selected radio button's value to state
  };

  return (
    <DashboardLayout activePage="topUp" navTitle={decidePageTitle()}>
      <div className="h-full">
        {variant == "top-up" ? (
          <TopUp setWatchTopUp={setWatchTopUp} watchTopUp={watchTopUp} walletCode={walletQuery.data?.code} />
        ) : variant == "send-points" ? (
          <div className="w-full p-[10px] border-[2px] rounded-[8px]">
            <p className="text-[20px] text-primary-color font-satoshi">
              Select user to send points to
            </p>
            <TransferType
              handleTransferType={handleTransferType}
              chosen={transferType}
            />

            {transferType == "individual" ? (
              <SendPointIndividual code={walletQuery.data?.code} />
            ) : transferType == "group" ? (
              <SendPointToGroup />
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}

        {variant === "top-up" ? (
          <TopUpTransactions
            viewTransaction={handleViewInflow}
            watchTopUp={watchTopUp}
          />
        ) : variant === 'send-points' ? <></> : (
          <Transactions
            viewTransaction={handleViewTransaction}
            watchTopUp={watchTopUp}
          />
        )}

        <TopUpApproval
          open={topUpApprovalIsOpen}
          onClose={setTopUpApprovalOpen}
          setOpen={setTopUpApprovalOpen}
          txn={viewedInflow}
          walletCode={walletQuery.data?.code}
        />
        <ViewTopUp
          open={topUpTxnOpen}
          setOpen={setTopUpTxnOpen}
          onClose={setTopUpTxnOpen}
          txn={viewedInflow}
        />

        <ViewTransaction
          open={txnIsOpen}
          setOpen={setViewTxn}
          onClose={setViewTxn}
          txn={viewedTransaction}
        />

      </div>
    </DashboardLayout>
  );
}

export default Index;
