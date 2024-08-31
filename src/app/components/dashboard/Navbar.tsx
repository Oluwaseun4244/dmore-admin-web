import React from "react";
import Image from "next/image";
import AvatarInitial from "../generic/AvatarInitial";
import help_icon from "../../../../public/icons/help.svg";
import notification from "../../../../public/icons/notification.svg";

interface NavProps {
    navTitle: string
}
const Navbar: React.FC<NavProps> = ({navTitle}) => {
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
          fullName="Banjo Tola"
          classNames="w-8 h-8 bg-faint-purple"
        />
      </div>
    </div>
  );
};

export default Navbar;
