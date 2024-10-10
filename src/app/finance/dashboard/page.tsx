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


function FinanceDashboard() {
  const queryClient = useQueryClient();
  const { getFolder } = useUtils()
  const { financeWalletMutation } = useDashboard()
  const profileData = queryClient.getQueryData<ProfileResponse>([`profile`]);
  const router = useRouter();

  const [transferIsopen, setTransferIsOpen] = useState(false);


  const goToTransactions = async (variant: string) => {
    const folder = await getFolder()
    router.push(`/${folder}/transactions?variant=${variant}`);
  }

  console.log("wallets", financeWalletMutation)
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {
              financeWalletMutation.data?.data?.slice(0, 3).map(wallet => (
                <WalletCard
                  key={wallet.id}
                  bg={"bg-app-purple"}
                  color={"text-white"}
                  title={wallet.code}
                  showEyes={true}
                  showInfo
                  balance={wallet.availablePoints}
                  toolTip={wallet.code}
                />
              ))
            }

          </div>

        )}
      </div>

      <div className="mt-10 flex flex-col lg:flex-row  items-center lg:items-start justify-between gap-4">
        <div className="flex flex-row w-[100%] lg:w-[350px] gap-[10px]">
          <Button
            text="Load Wallet"
            bg="bg-app-purple"
            classNames="p-3 text-white w-[50%] lg:w-[157px] h-[51px]"
            onClick={() => goToTransactions('top-up')}
          />
          <Button
            text="Send Points"
            bg="bg-white"
            classNames="p-3 text-app-purple border w-[50%] lg:w-[157px] h-[51px]"
            onClick={() => goToTransactions('send-points')}
          />
        </div>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-10 overflow-auto">

        <div className="border h-[484px] rounded-[6px] p-4 min-w-[500px]">
          <div className="flex items-center justify-between">
            <p className={`font-satoshi text-[24px] font-bold text-app-purple`}>
              Recent transactions
            </p>
            <p
              className={`font-satoshi text-[16px] font-medium text-app-purple`}
            >
              View All
            </p>
          </div>
          <hr className="my-4" />

          <RecentTransaction name="Tola Banjo" />
          <RecentTransaction name="Micheal Ajayi" />
          <RecentTransaction name="Mary Ogedengbe" />
          <RecentTransaction name="Dayo James" />
        </div>
      </div> */}

      <TransferPointModal
        open={transferIsopen}
        onClose={() => setTransferIsOpen(false)}
        setOpen={setTransferIsOpen}
      />

    </DashboardLayout>
  );
}

export default FinanceDashboard;
