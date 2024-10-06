"use client";

import React, { useEffect, useState } from "react";
import BuyPointsModal from "../components/dashboard/BuyPointModal";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import MonthlyStat from "../components/dashboard/MonthlyStat";
import RecentTransaction from "../components/dashboard/RecentTransaction";
import TransferPointModal from "../components/dashboard/TransferPointModal";
import WalletCard from "../components/dashboard/WalletCard";
import Button from "../components/generic/Button";
import { useAlert } from "@/lib/features/alert/useAlert";
import { UserWallets } from "../types/wallet.types";
import { useGetQuery } from "../utils/apiUtils";
import { ProfileResponse } from "../types/auth.types";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../components/generic/Spinner";

interface Stat {
  month: string;
  incoming: string;
  outgoing: string;
}

function Dashboard() {
  const queryClient = useQueryClient();
  const profileData = queryClient.getQueryData<ProfileResponse>([`profile`]);
  const { alert } = useAlert();
  const [monthView, setMonthView] = useState("jan-jun");
  const [statsData, setStatsData] = useState<Stat[]>([]);
  const [transferIsopen, setTransferIsOpen] = useState(false);
  const [buyIsOpen, setBuyIsOpen] = useState(false);
  const userReferral = "https://www.dmore.io/auth/register?refer_code=7J7B";

  const userWallets = useGetQuery<UserWallets>(
    {
      url: `userwallets`,
      queryKeys: [`user-wallet-${profileData?.id}`],
    },
    {
      queryKey: [`user-wallet-${profileData?.id}`],
    }
  );

  const dummyData = [
    { month: "Jan", incoming: "20", outgoing: "10" },
    { month: "Feb", incoming: "40", outgoing: "40" },
    { month: "Mar", incoming: "33", outgoing: "70" },
    { month: "Apr", incoming: "90", outgoing: "10" },
    { month: "May", incoming: "4", outgoing: "70" },
    { month: "Jun", incoming: "20", outgoing: "44" },
    { month: "Jul", incoming: "20", outgoing: "44" },
    { month: "Aug", incoming: "90", outgoing: "10" },
    { month: "Sep", incoming: "44", outgoing: "70" },
    { month: "Oct", incoming: "4", outgoing: "70" },
    { month: "Nov", incoming: "40", outgoing: "40" },
    { month: "Dec", incoming: "40", outgoing: "40" },
  ];

  const changView = (value: string) => {
    setMonthView(value);

    switch (value) {
      case "jan-jun":
        setStatsData(dummyData.slice(0, 6));
        break;
      case "jul-dec":
        setStatsData(dummyData.slice(6, 12));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setStatsData(dummyData.slice(0, 6));
  }, []);

  return (
    <DashboardLayout activePage="dashboard" navTitle="Credits and Points">
      <div>
        {userWallets.isPending ? (
          <div className="w-full flex items-center justify-center h-[200px]">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <WalletCard
              bg={"bg-app-purple"}
              color={"text-white"}
              title={`Central Wallet`}
              showEyes={false}
              showInfo
              balance={0}
              toolTip={"Central Wallet"}
            />
          </div>
          // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          //   {userWallets?.data?.slice(0, 3).map((wallet, index) => (
          //     <WalletCard
          //       key={wallet.code}
          //       bg={index === 0 ? "bg-app-purple" : ""}
          //       color={index === 0 ? "text-white" : "text-app-purple"}
          //       title={`${wallet?.walletType} Wallet`}
          //       showEyes={false}
          //       showInfo
          //       balance={wallet?.availablePoints || 0}
          //       toolTip={wallet?.description || "Wallet description"}
          //     />
          //   ))}
          // </div>
        )}
      </div>

      <div className="mt-10 flex flex-col lg:flex-row  items-center lg:items-start justify-between gap-4">
        <div className="flex flex-row w-[100%] lg:w-[350px] gap-[10px]">
          <Button
            text="Load Wallet"
            bg="bg-app-purple"
            classNames="p-3 text-white w-[50%] lg:w-[157px] h-[51px]"
            onClick={() => setTransferIsOpen(true)}
          />
          <Button
            text="Send Points"
            bg="bg-white"
            classNames="p-3 text-app-purple border w-[50%] lg:w-[157px] h-[51px]"
            // onClick={() => setBuyIsOpen(true)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-10 overflow-auto">
        {/* <div className="border h-[484px] rounded-[6px] p-4 min-w-[500px]">
          <div className="flex items-center justify-between">
            <p className={`font-satoshi text-[24px] font-bold text-app-purple`}>
              Statistics
            </p>
            <div className="flex gap-[10px]">
              <div className="h-[32px] w-[150px] rounded-md flex items-center justify-center border gap-[8px]">
                <select
                  className={`font-satoshi text-[15px] border-0 outline-none font-medium text-dark-purple`}
                >
                  <option>All Wallets</option>
                  <option>Reward Wallets</option>
                </select>
              </div>
            </div>
          </div>
          <hr className="my-4" />

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
            <div>
              <p
                className={`font-satoshi text-[18px] text-center font-medium text-dark-purple`}
              >
                Incoming
              </p>
              <Button
                text="0 DMP"
                bg="bg-deep-purple"
                classNames={`h-[63px] rounded-md w-[100%] text-white text-[18px] font-bold font-santoshi mt-[12px]`}
              />
            </div>
            <div>
              <p
                className={`font-satoshi text-[18px] text-center font-medium text-dark-purple`}
              >
                Outgoing
              </p>
              <Button
                text="0 DMP"
                bg="bg-faint-peach2"
                classNames={`h-[63px] rounded-md w-[100%] text-app-purple text-[18px] font-bold font-santoshi mt-[12px]`}
              />
            </div>
          </div>

          <div className="flex items-center justify-between w-full mt-10">
            {statsData.map((item, index) => (
              <MonthlyStat
                key={index}
                month={item.month}
                incomingPercentage={item.incoming}
                outgoingPercentage={item.outgoing}
              />
            ))}
          </div>
          <div className="w-full h-[50px] flex items-center justify-center">
            <div className="w-[40px] h-[7px] flex flex-row rounded-md bg-faint-peach2 overflow-hidden">
              <div
                onClick={() => changView("jan-jun")}
                className={`w-[20px] h-[7px] rounded-md ${
                  monthView === "jan-jun" ? "bg-app-purple" : ""
                }`}
              ></div>
              <div
                onClick={() => changView("jul-dec")}
                className={`w-[20px] h-[7px] rounded-md ${
                  monthView === "jul-dec" ? "bg-app-purple" : ""
                }`}
              ></div>
            </div>
          </div>
        </div> */}
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

      <TransferPointModal
        open={transferIsopen}
        onClose={() => setTransferIsOpen(false)}
        setOpen={setTransferIsOpen}
      />
      <BuyPointsModal
        open={buyIsOpen}
        setOpen={setBuyIsOpen}
        onClose={() => setBuyIsOpen(false)}
      />
    </DashboardLayout>
  );
}

export default Dashboard;
