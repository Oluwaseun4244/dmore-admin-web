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
      <div className="mt-10 flex flex-row w-full gap-[10px]">
        <Button
          text="Transfer Points"
          bg="bg-app-purple"
          classNames="p-3 text-white w-[157px] h-[51px]"
          onClick={() => setTransferIsOpen(true)}
        />
        <Button
          text="Buy Points"
          bg="bg-white"
          classNames="p-3 text-app-purple border w-[157px] h-[51px]"
          onClick={() => setBuyIsOpen(true)}
        />
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
                classNames={`h-[63px] rounded-md w-[100%] md:w-[276px] text-white text-[18px] font-bold font-santoshi mt-[12px]`}
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
                classNames={`h-[63px] rounded-md w-[100%] md:w-[276px] text-app-purple text-[18px] font-bold font-santoshi mt-[12px]`}
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

      {/* <Modal open={transferIsopen}>
        <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[436px] mx-auto">
          <div className="bg-title-bg-color rounded-tl-lg rounded-tr-lg h-[68px] px-8 flex items-center">
            <h2 className="font-medium text-[20px] text-black">
              Transfer Points
            </h2>
          </div>
          <div className="p-8 overflow-auto h-[500px] md:h-full ">
            <div>
              <label className="font-satoshi">Select Wallet</label>
              <div className=" flex flex-col border rounded-lg px-2 mt-2 bg-input-bg">
                <select className="h-[54px] border-none px-2 outline-none font-satoshi bg-input-bg">
                  <option>Retail Wallet</option>
                  <option>Reward Wallet</option>
                </select>
              </div>
            </div>
            <div className="rounded-lg h-[52px] p-[10px] gap-[10px] border border-[#A855F785] mt-6 flex items-center bg-faint-peach">
              <FaCircleInfo className="text-app-purple" />
              <p className="font-satoshi text-[12px] font-[400] text-app-purple">
                Kindly note that you would be charged 15% on this transfer,
                learn more
              </p>
            </div>
            <div className="mt-6">
              <div className="flex flex-row items-center justify-between">
                <label className="font-satoshi">Enter Amount</label>
                <div className="flex flex-row items-center justify-between gap-2">
                  <div className="w-[18px] h-[18px] rounded-[50%] bg-faint-peach2 flex items-center justify-center">
                    <CiCreditCard1 className="text-[12px]" />
                  </div>
                  <p className="font-satoshi text-[12px] font-[400]">
                    Available DMP: 20000000
                  </p>
                </div>
              </div>
              <div className=" flex flex-col border rounded-lg px-2 mt-2 bg-input-bg">
                <input
                  type="number"
                  placeholder="10000"
                  min={200}
                  className="h-[54px] border-none px-2 outline-none font-satoshi bg-input-bg"
                />
              </div>
            </div>
            <div>
              <div className="flex flex-row items-center justify-end gap-2 mt-[12px]">
                <div className="w-[18px] h-[18px] rounded-[50%] bg-faint-peach2 flex items-center justify-center">
                  <FaCircleInfo className="text-[12px] text-app-purple" />
                </div>
                <p className="font-satoshi text-[12px] font-[400]">
                  Network Fees: <span className="text-app-purple">1500</span>
                </p>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex flex-row items-center justify-between">
                <label className="font-satoshi">Enter User details</label>
                <div className="flex flex-row items-center justify-between gap-2">
                  <p className="font-satoshi text-[12px] text-app-purple font-[400]">
                    Transfer to Bank Account
                  </p>
                </div>
              </div>
              <div className=" flex flex-col border rounded-lg px-2 mt-2 bg-input-bg">
                <input
                  type="text"
                  placeholder="Tola Banjo"
                  className="h-[54px] border-none px-2 outline-none font-satoshi bg-input-bg"
                />
              </div>
            </div>
            <div className="mt-6">
              <div className="flex flex-row items-center justify-between">
                <label className="font-satoshi">Narration</label>
              </div>
              <div className=" flex flex-col border rounded-lg px-2 mt-2 bg-input-bg">
                <input
                  type="number"
                  placeholder="Payment for food"
                  className="h-[54px] border-none px-2 outline-none font-satoshi bg-input-bg"
                />
              </div>
            </div>
          </div>

          <div className="bg-title-bg-color mt-5 px-8 py-5 flex items-center gap-[10px] justify-end rounded-bl-lg rounded-br-lg">
            <Button
              text="Cancel"
              bg="bg-white"
              classNames="w-[120px] h-[45px] border border-app-purple text-app-purple"
              onClick={() => setTransferIsOpen(false)}
            />
            <Button
              text="Cancel"
              bg="bg-app-purple"
              classNames="w-[120px] h-[45px] border border-app-purple text-white"
            />
          </div>
        </div>
      </Modal> */}
    </DashboardLayout>
  );
}

export default Dashboard;
