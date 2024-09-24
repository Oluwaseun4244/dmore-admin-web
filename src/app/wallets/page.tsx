"use client";

import React from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import WalletCard from "../components/dashboard/WalletCard";
import { useGetQuery } from "../utils/apiUtils";
import { ProfileResponse } from "../types/auth.types";
import { useQueryClient } from "@tanstack/react-query";
import { UserWallets } from "../types/wallet.types";
import Spinner from "../components/generic/Spinner";



function Wallets() {
  const queryClient = useQueryClient();
  const profileData = queryClient.getQueryData<ProfileResponse>([`profile`]);


  const userWallets = useGetQuery<UserWallets>(
    {
      url: `userwallets`,
      queryKeys: [`user-wallet-${profileData?.id}`],
    },
    {
      queryKey: [`user-wallet-${profileData?.id}`],
    }
  );


  return (
    <DashboardLayout activePage="wallets" navTitle="Wallets">
      {
        userWallets.isPending ?
          <div className="w-full flex items-center justify-center h-[200px]">
            <Spinner />
          </div> :
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

            {userWallets?.data?.map((wallet, index) => (
              <WalletCard
                key={wallet.code}
                bg={index === 0 ? "bg-app-purple" : ""}
                color={index === 0 ? "text-white" : "text-app-purple"}
                title={`${wallet?.walletType} Wallet`}
                showEyes={false}
                showInfo
                balance={wallet?.availablePoints || 0}
                toolTip={wallet?.description || 'Wallet description'}
              />
            ))}
          </div>
      }


    </DashboardLayout>
  );
}

export default Wallets;
