"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import logo from "../../../../public/icons/white-logo.svg";
import active_dashboard from "../../../../public/icons/active-dashboard.svg";
import inactive_wallet from "../../../../public/icons/inactive-wallet.svg";
import inactive_users from "../../../../public/icons/inactive-users.svg";
import inactive_settings from "../../../../public/icons/inactive-settings.svg";
import help_icon from "../../../../public/icons/help.svg";
import notification from "../../../../public/icons/notification.svg";
import SideItem from "./SideItem";
import AvatarInitial from "../generic/AvatarInitial";

interface DashboardLayoutProps {
  children: ReactNode;
  activePage: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activePage,
}) => {
  return (
    <div className="h-svh bg-white overflow-hidden">
      <div className="h-full flex flex-row">
        <div className="w-[100px] h-full bg-app-purple flex flex-col items-center py-4">
          <div>
            <Image src={logo} alt="logo" />
          </div>

          <div className="my-[60px]">
            <SideItem
              imgSource={activePage === "dashboard" ? active_dashboard : ""}
            />
            <SideItem
              imgSource={
                activePage === "wallet" ? inactive_wallet : inactive_wallet
              }
            />
            <SideItem
              imgSource={
                activePage === "users" ? inactive_users : inactive_users
              }
            />
            <SideItem
              imgSource={
                activePage === "settings"
                  ? inactive_settings
                  : inactive_settings
              }
            />
          </div>
        </div>

        <main className="w-full">
          <div className="h-[100px] w-full bg-faint-peach flex flex-row items-center justify-between px-[50px]">
            <div className="flex flex-row gap-[10px] items-center">
              <p className="text-app-purple text-[24px] font-bold font-satoshi">
                Credits and Points
              </p>
              <div className="h-[22px] bg-faint-purple  py-1 px-2 rounded-[13px] flex justify-center items-center">
                <p className="text-app-purple text-[12px] font-satoshi">27</p>
              </div>
            </div>
            <div className="flex flex-row gap-[10px] items-center">
              <Image src={notification} alt="logo" className="mx-2" />
              <Image src={help_icon} alt="logo" className="mx-2" />

              <AvatarInitial
                fullName="Banjo Tola"
                classNames="w-8 h-8 bg-faint-purple"
              />
            </div>
          </div>
          <section className="p-[20px] md:p-[40px] h-full overflow-auto">
            {children}
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
