"use client";

import React, { ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../../../public/icons/white-logo.svg";
import active_dashboard from "../../../../public/icons/active-dashboard.svg";
import inactive_dashboard from "../../../../public/icons/inactive-dashboard.svg";
import inactive_wallet from "../../../../public/icons/inactive-wallet.svg";
import active_wallet from "../../../../public/icons/active-wallet.svg";
import inactive_users from "../../../../public/icons/inactive-users.svg";
import inactive_settings from "../../../../public/icons/inactive-settings.svg";
import active_settings from "../../../../public/icons/active-settings.svg";
import { getSession, signOut } from "next-auth/react";
import { useGetQuery } from "../../utils/apiUtils";
import { useRouter } from "next/navigation";
import { useAlert } from "@/lib/features/alert/useAlert";
import { useQueryClient } from "@tanstack/react-query";

import SideItem from "./SideItem";

import Navbar from "./Navbar";
import { ProfileResponse } from "@/app/types/auth.types";

interface DashboardLayoutProps {
  children: ReactNode;
  activePage: string;
  navTitle: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activePage,
  navTitle,
}) => {
  const { alert } = useAlert();
  const queryClient = useQueryClient();
  const [token, setToken] = useState("");
  const router = useRouter();

  const handleSignout = async () => {
    await signOut();
  };
  const profileQuery = useGetQuery<ProfileResponse>(
    {
      url: "profile",
      queryKeys: [`profile-${token}`, token],
    },
    {
      enabled: !!token,
      queryKey: [`profile-${token}`, token],
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session?.accessToken && session?.accessToken !== token) {
        // console.log("session1", session?.accessToken, "session2", token);
        setToken(session?.accessToken);
      }
    };

    checkSession();
  }, [token]);


  if (profileQuery.isPending) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p className="font-sans text-white text-5xl">Loading...</p>
      </div>
    );
  }

  if (!profileQuery.data || profileQuery?.error?.response?.status === 401) {
    alert("Profile not found, invalid token suspected", "error");
    handleSignout();
    router.push("/login");
    return null;
  }

  queryClient.setQueryData(["profile"], profileQuery.data);

  return (
    <div className="h-svh bg-white overflow-hidden">
      <div className="h-full flex flex-row">
        <div className="w-[75px] lg:w-[100px] overflow-hidden h-full bg-app-purple flex flex-col items-center py-4">
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
              route="settings/profile"
              imgSource={
                activePage === "settings" ? active_settings : inactive_settings
              }
            />
          </div>
        </div>

        <main className="flex-1 flex flex-col min-h-0 w-full">
          <Navbar navTitle={navTitle} user={profileQuery.data} />
          <section className="p-[20px] md:p-[40px] flex-1 overflow-y-auto">
            {children}
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
