"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import WalletCard from "../components/dashboard/WalletCard";
import Button from "../components/generic/Button";
import RecentTransaction from "../components/dashboard/RecentTransaction";
import MonthlyStat from "../components/dashboard/MonthlyStat";
import TransferPointModal from "../components/dashboard/TransferPointModal";
import BuyPointsModal from "../components/dashboard/BuyPointModal";

interface Stat {
  month: string;
  incoming: string;
  outgoing: string;
}

function Dashboard() {
  const [monthView, setMonthView] = useState("jan-jun");
  const [statsData, setStatsData] = useState<Stat[]>([]);
  const [transferIsopen, setTransferIsOpen] = useState(false);
  const [buyIsOpen, setBuyIsOpen] = useState(false);

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
      <div className="mt-10 flex flex-col lg:flex-row  items-center lg:items-start justify-between gap-4">
        <div className="flex flex-row w-[100%] lg:w-[350px] gap-[10px]">
          <Button
            text="Transfer Points"
            bg="bg-app-purple"
            classNames="p-3 text-white w-[50%] lg:w-[157px] h-[51px]"
            onClick={() => setTransferIsOpen(true)}
          />
          <Button
            text="Buy Points"
            bg="bg-white"
            classNames="p-3 text-app-purple border w-[50%] lg:w-[157px] h-[51px]"
            onClick={() => setBuyIsOpen(true)}
          />
        </div>

        <div className="py-[6px] pr-[6px] pl-[15px] justify-between flex items-center w-[100%] lg:w-[697px] rounded-md border">
          <div className="w-[200px] lg:w-auto" style={{wordWrap: 'break-word'}}>
            <p className="font-satoshi font-medium text-[14px] lg:text-[16px] text-dark-purple">
              Referral Code : https://www.dmore.io/auth/register?refer_code=7J7B
            </p>
          </div>

          <Button
            text="Copy"
            bg="bg-app-purple"
            classNames="text-app-purple border w-[77px] h-[39px] text-primary-white"
            onClick={() => alert("copy refferal link")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-10 overflow-auto mb-[100px]">
        <div className="border h-[484px] rounded-[6px] p-4 min-w-[500px]">
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
        </div>
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
      />
      <BuyPointsModal open={buyIsOpen} onClose={() => setBuyIsOpen(false)} />
    </DashboardLayout>
  );
}

export default Dashboard;
