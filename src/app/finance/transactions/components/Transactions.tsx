import React, { useState, useEffect } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { IoSearchOutline } from "react-icons/io5";
// import { IoIosFunnel } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Spinner from "@/app/components/generic/Spinner";
import { useTransactions } from "../hooks/useTransactions";
import { AllTransactionType } from "../types/transactions.types";
import moment from "moment";

type TransactionProps = {
  viewTransaction: (txn: AllTransactionType) => void;
  watchTopUp: boolean;
};
function Transactions({ viewTransaction, watchTopUp }: TransactionProps) {
  const { allTransactionMutation } = useTransactions();

  const tableHeaders = [
    "",
    "#",
    "DATE",
    "POINTS",
    "CHARGES",
    "SENDER",
    "RECEIVER",
    "STATUS",
    "ACTION",
  ];

  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const queryBuilder = (page = 1) => {
    const payload = {
      pageNumber: page,
      pageSize: pageLimit,
    };
    allTransactionMutation.mutate(payload);
  };

  const nextPage = () => {
    if (allTransactionMutation.data?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const handlePageLimit = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { value, id } = e.target;
    setPageLimit(Number(value));
  };

  useEffect(() => {
    queryBuilder(page);
  }, [page, watchTopUp]);

  useEffect(() => {
    queryBuilder(1);
    setPage(1);
  }, [pageLimit]);

  return (
    <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-1 gap-4 mt-10 overflow-auto">
      <div className="border rounded-[6px] p-4">
        <div className="flex items-center justify-between">
          <p className={`font-satoshi text-[24px] font-bold `}>Transactions</p>
        </div>
        <hr className="my-2" />

        {/* <div className="my-3 flex items-center flex-col lg:flex-row justify-between gap-3 lg:gap-0">
          <div className="h-[40px] w-full lg:w-[300px] rounded-[6px] border-[1px] flex items-center px-2 gap-2">
            <IoSearchOutline className="text-[#868FA0]" />
            <input
              placeholder="Search"
              className="outline-none border-none h-full w-full"
            />
          </div>
          <div className="gap-2 flex flex-col lg:flex-row items-center w-full lg:w-[300px]">
            <div className="h-[40px] min-w-full lg:min-w-[160px] rounded-[6px] border-[1px] flex items-center px-2 gap-2">
              <input type="date" className="w-full" />
            </div>

            <div className="h-[40px] min-w-full lg:min-w-[125px] rounded-[6px] border-[1px] flex items-center px-2 gap-2">
              <IoIosFunnel className="text-[#868FA0]" />
              <select className="border-none outline-none w-full">
                <option>Sort by</option>
                <option>Old-New</option>
                <option>New-Old</option>
              </select>
            </div>
          </div>
        </div> */}
        <div className="overflow-auto ">
          <div className="lg:w-full min-w-[1000px]">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-[#DAB9FA17] h-[50px]">
                  {tableHeaders.map((_header, index) => (
                    <td
                      className="text-app-purple font-[500] text-[15px] font-satoshi"
                      key={index}
                    >
                      {_header}
                    </td>
                  ))}
                </tr>
              </thead>

              <tbody>
                {allTransactionMutation.isPending ? (
                  <tr>
                    <td colSpan={9} className="text-center py-4">
                      <span className="flex items-center justify-center h-[100px]">
                        <Spinner />
                      </span>
                    </td>
                  </tr>
                ) : allTransactionMutation.data?.data?.length ? (
                  allTransactionMutation?.data?.data?.map((txn, index) => (
                    <tr
                      className={`h-[50px] ${index % 2 == 0 ? "" : "bg-[#DAB9FA17]"
                        }`}
                      key={index}
                    >
                      <td></td>
                      <td className="text-app-purple font-[500] text-[14px] font-satoshi">
                        {index + 1}
                      </td>
                      <td className="text-app-purple font-[500] text-[14px] font-satoshi">
                        {moment(txn.transactionDate).format("LL") ||
                          "Date Here"}
                      </td>
                      <td className="text-primary-color font-[500] text-[14px] font-satoshi">
                        {txn.points.toLocaleString()}
                      </td>
                      <td className="text-primary-color font-[500] text-[14px] font-satoshi">
                        {txn.charges}
                      </td>
                      <td className="text-primary-color font-[500] text-[14px] font-satoshi">
                        {txn.sourceUserName || "--"}
                      </td>
                      <td className="text-primary-color font-[500] text-[14px] font-satoshi">
                        {txn.receiverName || "--"}
                      </td>
                      <td
                        className={`font-[500] text-[14px] font-satoshi ${txn.status == 'Successful'
                          ? "text-verified-green"
                          : "text-pending-orange"
                          }`}
                      >
                        {txn.status}
                      </td>

                      <td className="text-app-purple font-[500] text-[14px] font-satoshi">
                        <span className="flex gap-3">
                          <MdOutlineRemoveRedEye
                            className="text-pending-orange cursor-pointer"
                            onClick={() => viewTransaction(txn)}
                          />{" "}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center py-4">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION ROW */}
        {allTransactionMutation.data?.data?.length ? (
          <div className="flex justify-end">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <p
                  className={`font-satoshi text-[12px] font-[500] text-[#687182] m-0`}
                >
                  Rows per page:
                </p>
                <select
                  className="outline-none border-none"
                  defaultValue={pageLimit}
                  onChange={handlePageLimit}
                >
                  <option >5</option>
                  <option >10</option>
                  <option >15</option>
                  <option >20</option>
                </select>
              </div>

              <div
                className={`w-[30px] h-[25px] rounded-[6px] border-[1px] flex items-center justify-center ${allTransactionMutation.data?.hasPreviousPage
                  ? "cursor-pointer"
                  : "cursor-default"
                  }`}
                onClick={previousPage}
              >
                <IoIosArrowBack className="text-[16px] text-[#687182]" />
              </div>
              <p
                className={`font-satoshi text-[12px] font-[500] text-primary-color`}
              >
                {allTransactionMutation.data?.currentPage}
              </p>
              <div
                className={`w-[30px] h-[25px] rounded-[6px] border-[1px] flex items-center justify-center ${allTransactionMutation.data?.hasNextPage
                  ? "cursor-pointer"
                  : "cursor-default"
                  }`}
                onClick={nextPage}
              >
                <IoIosArrowForward className="text-[16px] text-[#687182]" />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Transactions;
