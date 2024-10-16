"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import logo from "../../../../public/icons/white-logo.svg";
import active_dashboard from "../../../../public/icons/active-dashboard.svg";
import inactive_dashboard from "../../../../public/icons/inactive-dashboard.svg";
import inactive_settings from "../../../../public/icons/inactive-settings.svg";
import active_settings from "../../../../public/icons/active-settings.svg";
import { useSession } from "next-auth/react";
import { useGetQuery } from "../../utils/apiUtils";
import { usePathname } from "next/navigation";
import { useAlert } from "@/lib/features/alert/useAlert";
import { useQueryClient } from "@tanstack/react-query";

import SideItem from "./SideItem";

import Navbar from "./Navbar";
import { ProfileResponse } from "@/app/types/auth.types";
import Spinner from "../generic/Spinner";
import useUtils from "@/app/hooks/useUtils";

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

  const { handleSignout } = useUtils()
  const { alert } = useAlert();
  const pathname = usePathname();
  const folder = pathname?.split('/')[1];
  const queryClient = useQueryClient();

  const { data: session } = useSession()

  console.log("DATA HERE", session)
  const profileQuery = useGetQuery<ProfileResponse>(
    {
      url: "profile",
      queryKeys: [`profile-${session?.accessToken}`, session?.accessToken],
    },
    {
      enabled: !!session?.accessToken,
      queryKey: [`profile-${session?.accessToken}`, session?.accessToken],
      refetchOnWindowFocus: false,
    }
  );


  if (!session?.accessToken) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  if (profileQuery.isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!profileQuery.data || profileQuery?.error?.response?.status === 401) {
    alert("Profile not found, invalid token suspected", "error");
    handleSignout();
    return
  }

  if (session?.error || session?.error == 'RefreshAccessTokenError') {
    alert("Could not refresh token, logging you out", "error");
    handleSignout();
    return;
  }


  queryClient.setQueryData(["profile"], profileQuery.data);

  return (
    <div className="h-[100vh] bg-white overflow-hidden">
      <div className="h-full flex flex-row ">
        <div className="w-[75px] lg:w-[100px] overflow-hidden h-full bg-app-purple flex flex-col items-center py-4">
          <div>
            <Image src={logo} alt="logo" />
          </div>

          <div className="my-[30px]">
            <SideItem
              route={`${folder}/dashboard`}
              imgSource={
                activePage === "dashboard"
                  ? active_dashboard
                  : inactive_dashboard
              }
            />
            <SideItem
              route={`${folder}/transactions`}

              imgSource={
                activePage === "topUp" ? active_settings : inactive_settings
              }
            />

            <SideItem
              route={`${folder}/settings/profile`}
              imgSource={
                activePage === "settings" ? active_settings : inactive_settings
              }
            />
          </div>
        </div>

        <main className="flex-1 flex flex-col h-full w-full">
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
