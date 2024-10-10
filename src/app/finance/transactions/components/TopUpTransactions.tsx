import React, { useState, useEffect } from 'react'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosFunnel } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Spinner from '@/app/components/generic/Spinner';
import { useTransactions } from '../hooks/useTransactions';
import { CreateInflowResponse } from '../types/inflow.types';

type TopUpTransactionProps = {
  viewTransaction: (txn: CreateInflowResponse, caller: string) => void;
  watchTopUp: boolean
}
function TopUpTransactions({ viewTransaction, watchTopUp }: TopUpTransactionProps) {

  const { inflowTransactionMutation, allTransactionMutation } = useTransactions()

  const tableHeaders = ["", "#", "NARRATION", "INITIATED BY", "POINTS", "APPROVED BY", "STATUS", "DATE", "ACTION"];

  const [page, setPage] = useState(1)
  const [pageLimit, setPageLimit] = useState(10)


  const queryBuilder = (page = 1) => {
    const payload = {
      pageNumber: page,
      pageSize: pageLimit
    }
    inflowTransactionMutation.mutate(payload)
  }

  const nextPage = () => {
    if (inflowTransactionMutation.data?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  useEffect(() => {
    queryBuilder(page)
    allTransactionMutation.mutate({
      pageNumber: page,
      pageSize: pageLimit
    })
  }, [page, watchTopUp])

  return (
    <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-1 gap-4 mt-10 overflow-auto">
      <div className="border rounded-[6px] p-4">
        <div className="flex items-center justify-between">
          <p className={`font-satoshi text-[24px] font-bold `}>
            Transactions
          </p>
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
          <div className="lg:w-full min-w-[1400px]">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-[#DAB9FA17] h-[50px]">
                  {
                    tableHeaders.map((_header, index) => (
                      <td className="text-app-purple font-[500] text-[15px] font-satoshi" key={index}>{_header}</td>
                    ))
                  }

                </tr>
              </thead>
              <div className='flex items-center justify-center'></div>
              <tbody>
                {inflowTransactionMutation.isPending ?
                  <tr>
                    <td colSpan={9} className="text-center py-4">

                      <div className='flex items-center justify-center h-[100px]'>
                        <Spinner />
                      </div>

                    </td>
                  </tr>

                  : inflowTransactionMutation.data?.data?.length ? inflowTransactionMutation?.data?.data?.map((txn, index) => (
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
                        {txn.narration}
                      </td>
                      <td className="text-primary-color font-[500] text-[14px] font-satoshi">
                        {txn.initiatorUserId}
                      </td>
                      <td className="text-primary-color font-[500] text-[14px] font-satoshi">
                        {txn.points.toLocaleString()}
                      </td>
                      <td className="text-primary-color font-[500] text-[14px] font-satoshi">
                        {txn.approverUserId || "--"}
                      </td>
                      <td className={`font-[500] text-[14px] font-satoshi ${txn.status == 1 ? 'text-pending-orange' : 'text-verified-green'}`}>
                        {txn.status == 1 ? "Pending" : "Approved"}
                      </td>
                      <td className="text-primary-color font-[500] text-[14px] font-satoshi">
                        {txn.createdAt || 'Date Here'}
                      </td>
                      <td className="text-app-purple font-[500] text-[14px] font-satoshi">
                        <div className="flex gap-3">
                          <MdOutlineRemoveRedEye
                            className="text-pending-orange cursor-pointer"
                            onClick={() => viewTransaction(txn, 'view')}
                          />{" "}
                          <MdVerified className="text-verified-green cursor-pointer" onClick={() => viewTransaction(txn, 'approval')} />{" "}
                        </div>
                      </td>
                    </tr>
                  )) : <tr>
                    <td colSpan={9} className="text-center py-4">
                      No data available
                    </td>
                  </tr>}

              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION ROW */}
        {
          inflowTransactionMutation.data?.data?.length ? <div className="flex justify-end">
            <div className="flex items-center gap-2">
              <p
                className={`font-satoshi text-[12px] font-[500] text-[#687182] m-0`}
              >
                Rows per page: <span>{pageLimit}</span>
              </p>
              <div className={`w-[30px] h-[25px] rounded-[6px] border-[1px] flex items-center justify-center ${inflowTransactionMutation.data?.hasPreviousPage ? 'cursor-pointer' : 'cursor-default'}`} onClick={previousPage}>
                <IoIosArrowBack className="text-[16px] text-[#687182]" />
              </div>
              <p
                className={`font-satoshi text-[12px] font-[500] text-primary-color`}
              >
                {inflowTransactionMutation.data?.currentPage}
              </p>
              <div className={`w-[30px] h-[25px] rounded-[6px] border-[1px] flex items-center justify-center ${inflowTransactionMutation.data?.hasNextPage ? 'cursor-pointer' : 'cursor-default'}`} onClick={nextPage}>
                <IoIosArrowForward className="text-[16px] text-[#687182]" />
              </div>
            </div>
          </div> : <></>
        }

      </div>
    </div>
  )
}

export default TopUpTransactions