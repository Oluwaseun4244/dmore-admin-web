import React from "react";

interface MonthlyStatProps {
  month: string;
  incomingPercentage: string;
  outgoingPercentage: string;
}
const MonthlyStat: React.FC<MonthlyStatProps> = ({
  month,
  incomingPercentage,
  outgoingPercentage,
}) => {
  return (
    <div className="h-[200px] w-[60px] hover:bg-faint-peach2 hover:border hover:border-faint-peach3 rounded-md flex-col flex justify-between py-[15px] items-center">
      <div className="flex items-center justify-between w-[25px]">
        <div className="h-[130px] overflow-hidden rounded-[20px] border-0.5 border-[#D9C2EF] w-[7px] bg-white flex flex-col justify-end">
          <div
            style={{ height: `${incomingPercentage}%` }}
            className={`w-[7px]  bg-app-purple `}
          ></div>
        </div>
        <div className="h-[130px] overflow-hidden rounded-[20px] border-0.5 border-[#D9C2EF] border-[] w-[7px] bg-white flex flex-col justify-end">
          <div
            style={{ height: `${outgoingPercentage}%` }}
            className={`w-[7px] bg-faint-peach3`}
          ></div>
        </div>
      </div>
      <p className="font-satoshi text-[14px] font-medium text-app-purple">
        {month}
      </p>
    </div>
  );
};

export default MonthlyStat;
