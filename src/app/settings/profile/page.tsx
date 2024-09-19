"use client";

import React, { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Button from "../../components/generic/Button";
import AvatarInitial from "../../components/generic/AvatarInitial";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { getSession, useSession } from "next-auth/react";
import { ProfileResponse } from "@/app/types/auth.types";
import { useGetQuery } from "@/app/utils/apiUtils";

interface Stat {
  month: string;
  incoming: string;
  outgoing: string;
}
interface UserDetailsType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface Password {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

interface PasswordView {
  oldPasswordVisible: boolean;
  newPasswordVisible: boolean;
  newPasswordConfirmVisible: boolean;
}

function Profile() {
  const queryClient = useQueryClient();

  const profileData = queryClient.getQueryData<ProfileResponse>([`profile`]);

  const [userDetails, setUserDetails] = useState<UserDetailsType>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [password, setPassword] = useState<Password>({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: ""
  });

  const [passwordView, setPasswordView] = useState<PasswordView>({
    oldPasswordVisible: false,
    newPasswordVisible: false,
    newPasswordConfirmVisible: false,
  });

  const handleUserDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPassword((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordView = (name: keyof PasswordView, value: boolean) => {
    setPasswordView((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <DashboardLayout activePage="settings" navTitle="Settings">
      <div>
        <div className="font-satoshi flex items-center font-medium text-[20px] gap-[10px]">
          <AvatarInitial
            fullName="Tola Banjo"
            classNames="w-8 h-8 bg-faint-purple"
          />
          <h5>Tola Banjo</h5>
        </div>

        <div className="mt-[50px]">
          <h4 className="font-satoshi text-[16px] font-normal text-text-dark2">
            Personal details
          </h4>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[10px] lg:gap-[20px] mt-[10px]">
            <div className="flex flex-col my-3 bg-[#FBFBFC] w-full lg:w-[265px] px-4 py-3 border  border-[#EDF0F3] rounded-[12px]">
              <input
                type="text"
                name="firstName"
                placeholder="Tola"
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
                onChange={(e) => handleUserDetails(e)}
                value={userDetails?.firstName || profileData?.firstName}
              />
            </div>
            <div className="flex flex-col my-3 bg-[#FBFBFC] w-full lg:w-[265px] px-4 py-3 border  border-[#EDF0F3] rounded-[12px]">
              <input
                type="text"
                name="lastName"
                placeholder="Banjo"
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
                onChange={(e) => handleUserDetails(e)}
                value={userDetails?.lastName || profileData?.lastName}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-[10px] lg:gap-[20px]">
            <div className="flex flex-col my-3 bg-[#FBFBFC] w-full lg:w-[265px] px-4 py-3 border  border-[#EDF0F3] rounded-[12px]">
              <input
                type="email"
                name="email"
                placeholder="Johndoe@gmail.com"
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
                onChange={(e) => handleUserDetails(e)}
                value={userDetails?.email || profileData?.email}
              />
            </div>
            <div className="flex flex-col my-3 bg-[#FBFBFC] w-full lg:w-[265px] px-4 py-3 border  border-[#EDF0F3] rounded-[12px]">
              <input
                type="text"
                name="phoneNumber"
                placeholder="09090909090"
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
                onChange={(e) => handleUserDetails(e)}
                value={userDetails?.phoneNumber || profileData?.phoneNumber}
              />
            </div>
          </div>
        </div>

        <div className="mt-[40px]">
          <h4 className="font-satoshi text-[16px] font-normal text-text-dark2">
            Change password
          </h4>
          <div className="flex flex-col lg:flex-row items-center gap-[10px] lg:gap-[20px] mt-[10px]">
            <div className="flex flex-col my-3 relative bg-[#FBFBFC] w-full lg:w-[265px] px-4 py-3 border  border-[#EDF0F3] rounded-[12px]">
              <input
                type={passwordView.oldPasswordVisible ? "text" : "password"}
                name="oldPassword"
                placeholder="Current password"
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
                onChange={(e) => handlePasswordDetails(e)}
                value={password?.oldPassword}
              />
              {passwordView.oldPasswordVisible ? (
                <FaRegEyeSlash
                  className="absolute right-2 text-app-purple"
                  onClick={() =>
                    handlePasswordView("oldPasswordVisible", false)
                  }
                />
              ) : (
                <FaRegEye
                  className="absolute right-2 text-app-purple"
                  onClick={() => handlePasswordView("oldPasswordVisible", true)}
                />
              )}
            </div>
            <div className="flex flex-col my-3 relative bg-[#FBFBFC] w-full lg:w-[265px] px-4 py-3 border  border-[#EDF0F3] rounded-[12px]">
              <input
                type={passwordView.newPasswordVisible ? "text" : "password"}
                name="newPassword"
                placeholder="New password"
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
                onChange={(e) => handlePasswordDetails(e)}
                value={password?.newPassword}
              />
              {passwordView.newPasswordVisible ? (
                <FaRegEyeSlash
                  className="absolute right-2 text-app-purple"
                  onClick={() =>
                    handlePasswordView("newPasswordVisible", false)
                  }
                />
              ) : (
                <FaRegEye
                  className="absolute right-2 text-app-purple"
                  onClick={() => handlePasswordView("newPasswordVisible", true)}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-[20px]">
            <div className="flex flex-col my-3 relative bg-[#FBFBFC] w-full lg:w-[265px] px-4 py-3 border  border-[#EDF0F3] rounded-[12px]">
              <input
                type={
                  passwordView.newPasswordConfirmVisible ? "text" : "password"
                }
                name="newPasswordConfirm"
                placeholder="Confirm new password"
                className="font-satoshi font-medium text-[14px] placeholder:text-[14px] placeholder:text-[#878F9A] leading-[20px] outline-none focus:outline-none bg-[#FBFBFC] text-[#090B0C]"
                onChange={(e) => handlePasswordDetails(e)}
                value={password?.newPasswordConfirm}
              />

              {passwordView.newPasswordConfirmVisible ? (
                <FaRegEyeSlash
                  className="absolute right-2 text-app-purple"
                  onClick={() =>
                    handlePasswordView("newPasswordConfirmVisible", false)
                  }
                />
              ) : (
                <FaRegEye
                  className="absolute right-2 text-app-purple"
                  onClick={() =>
                    handlePasswordView("newPasswordConfirmVisible", true)
                  }
                />
              )}
            </div>
            <Button
              text="Save Changes"
              bg="bg-disabled-btn-purple"
              classNames="w-full lg:w-[144px] h-[45px] border border-disabled-btn-purple text-white"
            />
          </div>
        </div>

        <div className="w-full lg-w-[70%] mt-10">
          <hr />
        </div>

        <div className="mt-[40px]">
          <h4 className="font-satoshi text-[16px] font-normal text-app-purple">
            Other settings
          </h4>
          <h5 className="font-satoshi text-[14px] font-normal text-light-gray mt-2">
            Select your preferred language and preferred currency.
          </h5>
          <div className="flex items-center gap-[20px] mt-[10px]">
            <div className="flex flex-col my-3 bg-[#FBFBFC] w-full lg:w-[265px] px-4 py-3 border  border-[#EDF0F3] rounded-[12px]">
              <select className="outline-none text-[12px]">
                <option selected disabled>
                  Choose language
                </option>
                <option value={"english"}>English</option>
                <option value={"yoruba"}>Yoruba</option>
                <option value={"french"}>French</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
