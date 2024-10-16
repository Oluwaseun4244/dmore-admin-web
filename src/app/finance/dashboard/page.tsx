"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import TransferPointModal from "../../components/dashboard/TransferPointModal";
import Spinner from "../../components/generic/Spinner";
import { useRouter } from "next/navigation";
import useUtils from "@/app/hooks/useUtils";
import { useDashboard } from "./hooks/useDashboard";
import BalanceCard from "./components/BalanceCard";
import SendPointCard from "./components/SendPointCard";
import TotalPointsCard from "./components/TotalPointsCard";


function FinanceDashboard() {

  const { getFolder } = useUtils()
  const { financeWalletMutation } = useDashboard()

  const router = useRouter();

  const [transferIsopen, setTransferIsOpen] = useState(false);


  const goToTransactions = async (variant: string, walletID?: string) => {
    const folder = await getFolder()
    if (walletID) {
      router.push(`/${folder}/transactions?variant=${variant}&walletID=${walletID}`);
    } else {
      router.push(`/${folder}/transactions?variant=${variant}`);
    }
  }


  useEffect(() => {
    financeWalletMutation.mutate({
      pageNumber: 1,
      pageSize: 1
    })
  }, [])



  return (
    <DashboardLayout activePage="dashboard" navTitle="Finance Wallet">
      <div>
        {financeWalletMutation.isPending ? (
          <div className="w-full flex items-center justify-center h-[200px]">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {/* {
              financeWalletMutation.data?.data?.slice(0, 1).map(wallet => (
                <>

                </>
              ))
            } */}
            <BalanceCard
              // key={wallet.id}
              walletId={financeWalletMutation.data?.data[0]?.id || ""}
              bg={"bg-app-purple"}
              color={"text-white"}
              title={financeWalletMutation.data?.data[0]?.code || ""}
              showEyes={true}
              goTo={goToTransactions}
              balance={financeWalletMutation.data?.data[0]?.availablePoints || 0}
            />
            <SendPointCard goTo={goToTransactions} walletId={financeWalletMutation.data?.data[0]?.id || ""} />
            <TotalPointsCard />
          </div>

        )}
      </div>

      <TransferPointModal
        open={transferIsopen}
        onClose={() => setTransferIsOpen(false)}
        setOpen={setTransferIsOpen}
      />

    </DashboardLayout>
  );
}

export default FinanceDashboard;
