"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import WalletCard from "../components/dashboard/WalletCard";
import { useGetQuery } from "../utils/apiUtils";
import { ProfileResponse } from "../types/auth.types";
import { useQueryClient } from "@tanstack/react-query";
import { UserWallets } from "../types/wallet.types";
import Spinner from "../components/generic/Spinner";

interface Wallet {
  id: string;
  balance: number;
  currency: string;
  title: string;
  description: string;
}

type Wallets = Wallet[];

function Wallets() {
  const queryClient = useQueryClient();
  const profileData = queryClient.getQueryData<ProfileResponse>([`profile`]);
  console.log("profile data", profileData)

  const userWallets = useGetQuery<UserWallets>(
    {
      url: "wallets",
      queryKeys: [`user-wallet-${profileData?.id}`],
    },
    {
      queryKey: [`user-wallet-${profileData?.id}`],
    }
  );
  // const wallets = useGetQuery<UserWallets>(
  //   {
  //     url: "wallets",
  //     queryKeys: [`user-wallet-${profileData?.id}`],
  //   },
  //   {
  //     queryKey: [`user-wallet-${profileData?.id}`],
  //   }
  // );


  return (
    <DashboardLayout activePage="wallets" navTitle="Wallets">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <WalletCard
          color="text-white"
          bg="bg-app-purple"
          title="Total Available Points"
          showEyes
          showInfo={false}
          balance={217}
        />
        <WalletCard
          color="text-app-purple"
          showEyes={false}
          title="Personal Wallet"
          showInfo
          balance={17}
          toolTip="Whatever the info is for this particular card, usually a short description for the wallet type"
        />
        <WalletCard
          color="text-app-purple"
          showEyes={false}
          title="Retails Wallet"
          showInfo
          balance={98}
          toolTip="Whatever the info is for this particular card, usually a short description for the wallet type"
        />
        <WalletCard
          color="text-app-purple"
          showEyes={false}
          title="Reward Wallet"
          showInfo
          balance={102}
          toolTip="Whatever the info is for this particular card, usually a short description for the wallet type"
        />
      </div>

      {
        userWallets.isPending ?
          <div className="w-full flex items-center justify-center h-[200px]">
            <Spinner />
          </div> :
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

            {userWallets?.data?.map((wallet) => (
              <WalletCard
                key={wallet.id}
                color="text-app-purple"
                title={wallet?.title || 'Wallet Title'}
                showEyes={false}
                showInfo
                balance={wallet?.balance || 0}
                toolTip={wallet?.description || 'Description here'}
              />
            ))}
          </div>
      }


    </DashboardLayout>
  );
}

export default Wallets;
