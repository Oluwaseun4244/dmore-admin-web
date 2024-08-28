import React from "react";
import AvatarInitial from "../generic/AvatarInitial";

interface RecentTxnProps {
  name: string;
}
const RecentTransaction: React.FC<RecentTxnProps> = ({ name }) => {
  return (
    <div className="flex flex-row items-center justify-between mb-7">
      <div className="flex flex-row items-center gap-[10px] ">
        <AvatarInitial
          fullName={name}
          classNames="w-12 h-12 bg-white border border-app-purple"
          initialClassNames="text-app-purple"
        />
        <div>
          <p className={`font-satoshi text-[18px] font-normal text-app-purple`}>
            {name}
          </p>
          <p
            className={`font-satoshi text-[14px] font-normal text-light-gray2`}
          >
            10:00 AM. 24, Jan 2022
          </p>
        </div>
      </div>
      <p className={`font-satoshi text-[16px] font-[500] text-app-green`}>
        +20,000 DMP
      </p>
    </div>
  );
};

export default RecentTransaction;
