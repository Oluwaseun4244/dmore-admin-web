import React from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import WalletCard from "../components/dashboard/WalletCard";
import Button from "../components/generic/Button";
import AvatarInitial from "../components/generic/AvatarInitial";
import RecentTransaction from "../components/dashboard/RecentTransaction";

function Dashboard() {
  return (
    <DashboardLayout activePage="dashboard">
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
        />
        <WalletCard
          color="text-app-purple"
          showEyes={false}
          title="Retails Wallet"
          showInfo
          balance={98}
        />
        <WalletCard
          color="text-app-purple"
          showEyes={false}
          title="Reward Wallet"
          showInfo
          balance={102}
        />
      </div>
      <div className="mt-10 flex flex-row w-full gap-[10px]">
        <Button
          text="Transfer Points"
          bg="bg-app-purple"
          classNames="p-3 text-white w-[157px] h-[51px]"
        />
        <Button
          text="Buy Points"
          bg="bg-white"
          classNames="p-3 text-app-purple border w-[157px] h-[51px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-10 overflow-auto mb-[100px]">
        <div className="border h-[484px] rounded-[6px] p-4 min-w-[500px]"></div>
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
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
