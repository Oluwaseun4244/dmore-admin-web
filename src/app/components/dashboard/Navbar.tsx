import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import help_icon from "../../../../public/icons/help.svg";
import notification from "../../../../public/icons/notification.svg";
import AvatarInitial from "../generic/AvatarInitial";
import { ProfileResponse } from "@/app/types/auth.types";
import { AiOutlineLogout } from "react-icons/ai";

interface NavProps {
  navTitle: string;
  user: undefined | ProfileResponse;
}
const Navbar: React.FC<NavProps> = ({ navTitle, user }) => {
  const handleSignout = () => {
    signOut();
  };

  return (
    <div className="h-[100px] w-full bg-faint-peach flex flex-row items-center justify-between px-[20px] lg:px-[50px]">
      <div className="flex flex-row gap-[10px] items-center">
        <p className="text-app-purple text-[18px] lg:text-[24px] font-bold font-satoshi">
          {navTitle}
        </p>
      </div>
      <div className="flex flex-row gap-[10px] items-center">
        <Image src={notification} alt="logo" className="mx-2" />
        <Image src={help_icon} alt="logo" className="mx-2" />

        <AvatarInitial
          fullName={user ? `${user?.lastName} ${user?.firstName}` : "John Doe"}
          classNames="w-8 h-8 bg-faint-purple mx-2"
        />
        {/* temporary sign out button */}

        <AiOutlineLogout onClick={handleSignout} className="cursor-pointer text-red-500" />
      </div>
    </div>
  );
};

export default Navbar;
