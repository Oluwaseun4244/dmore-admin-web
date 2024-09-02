"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import logo from "../../../../public/icons/white-logo.svg";
import active_dashboard from "../../../../public/icons/active-dashboard.svg";
import inactive_dashboard from "../../../../public/icons/inactive-dashboard.svg";
import inactive_wallet from "../../../../public/icons/inactive-wallet.svg";
import active_wallet from "../../../../public/icons/active-wallet.svg";
import inactive_users from "../../../../public/icons/inactive-users.svg";
import inactive_settings from "../../../../public/icons/inactive-settings.svg";
import active_settings from "../../../../public/icons/active-settings.svg";

import SideItem from "./SideItem";

import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
  activePage: string;
  navTitle: string
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activePage,
  navTitle
}) => {
  return (
    <div className="h-svh bg-white overflow-hidden">
      <div className="h-full flex flex-row">
        <div className="w-[90px] lg:w-[100px] overflow-hidden h-full bg-app-purple flex flex-col items-center py-4">
          <div>
            <Image src={logo} alt="logo" />
          </div>

          <div className="my-[30px]">
            <SideItem
              route="dashboard"
              imgSource={
                activePage === "dashboard"
                  ? active_dashboard
                  : inactive_dashboard
              }
            />
            <SideItem
              route="wallets"
              imgSource={
                activePage === "wallets" ? active_wallet : inactive_wallet
              }
            />
            <SideItem
              route="wallets"
              imgSource={
                activePage === "users" ? inactive_users : inactive_users
              }
            />
            <SideItem
              route="settings"
              imgSource={
                activePage === "settings" ? active_settings : inactive_settings
              }
            />
          </div>
        </div>

        <main className="w-full">
          <Navbar navTitle={navTitle} />
          <section className="p-[20px] md:p-[40px] h-full overflow-auto">
            {children}
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
