"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import WalletCard from "../components/dashboard/WalletCard";

interface Wallet {
  id: string;
  balance: number;
  currency: string;
  title: string;
  description: string;
}

type Wallets = Wallet[];

function Dashboard() {
  const [otherWallets, setOtherWallets] = useState<Wallets>([]);

  const dummyWallets: Wallets = [
    {
      id: "123",
      balance: 99000000,
      currency: "NGN",
      title: "Employee Wallet",
      description: "This is a wallet created for you as an employee",
    },
    {
      id: "12583",
      balance: 900000,
      currency: "NGN",
      title: "Gift Wallet",
      description: "This is a wallet created for you for gifting purpose",
    },
  ];

  useEffect(() => {
    setOtherWallets(dummyWallets);
  }, []);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {otherWallets?.map((wallet) => (
          <WalletCard
            key={wallet.id}
            color="text-app-purple"
            title={wallet.title}
            showEyes={false}
            showInfo
            balance={wallet.balance}
            toolTip={wallet.description}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
