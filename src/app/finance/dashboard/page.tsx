"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import RecentTransaction from "../../components/dashboard/RecentTransaction";
import TransferPointModal from "../../components/dashboard/TransferPointModal";
import WalletCard from "../../components/dashboard/WalletCard";
import Button from "../../components/generic/Button";
import { UserWallets } from "../../types/wallet.types";
import { useGetQuery } from "../../utils/apiUtils";
import { ProfileResponse } from "../../types/auth.types";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../../components/generic/Spinner";
import { useRouter } from "next/navigation";
import useUtils from "@/app/hooks/useUtils";
import { useDashboard } from "./hooks/useDashboard";
import BalanceCard from "./components/BalanceCard";
import SendPointCard from "./components/SendPointCard";
import TotalPointsCard from "./components/TotalPointsCard";


function FinanceDashboard() {
  const queryClient = useQueryClient();
  const { getFolder } = useUtils()
  const { financeWalletMutation } = useDashboard()
  const profileData = queryClient.getQueryData<ProfileResponse>([`profile`]);
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
      pageSize: 4
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
            {
              financeWalletMutation.data?.data?.slice(0, 1).map(wallet => (
                <BalanceCard
                  key={wallet.id}
                  id={wallet.id}
                  bg={"bg-app-purple"}
                  color={"text-white"}
                  title={wallet.code}
                  showEyes={true}
                  goTo={goToTransactions}
                  balance={wallet.availablePoints}
                />
              ))
            }

            <SendPointCard goTo={goToTransactions} />
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
