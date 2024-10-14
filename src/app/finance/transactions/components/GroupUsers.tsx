import React from 'react'
import Spinner from '@/app/components/generic/Spinner';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { MultipleUsersPointPayload } from '../types/groups.types';

type UsersPerGroupPayload = {
  payload: MultipleUsersPointPayload[];
  isLoading: boolean;
  handleViewTxn: (txn: MultipleUsersPointPayload, index: number) => void;
  handleRemove: (index: number) => void
}
function GroupUsers({ payload, isLoading, handleViewTxn, handleRemove }: UsersPerGroupPayload) {

  const tableHeaders = ["", "#", "NAME", "EMAIL", "POINTS", "NARRATION", "ACTION"];

  return (
    <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-1 gap-4 mt-10 overflow-auto">
      <div className="border rounded-[6px] p-4">
        <div className="flex items-center justify-between">
          <p className={`font-satoshi text-[24px] font-bold `}>
            Manage Details
          </p>
        </div>
        <hr className="my-2" />

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
              <tbody>
                {isLoading ?
                  <tr>
                    <td colSpan={9} className="text-center py-4">

                      <div className='flex items-center justify-center h-[100px]'>
                        <Spinner />
                      </div>

                    </td>
                  </tr>

                  : payload.length ? payload.map((data, index) => (
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
                        {`${data.firstName} ${data.lastName}`}
                      </td>
                      <td className="text-app-purple font-[500] text-[14px] font-satoshi">
                        {`${data.email}`}
                      </td>
                      <td className="text-primary-color font-[500] text-[14px] font-satoshi">
                        {data.points.toLocaleString()}
                      </td>
                      <td className="text-primary-color font-[500] text-[14px] font-satoshi">
                        {data.narration}
                      </td>

                      <td className="text-app-purple font-[500] text-[14px] font-satoshi">
                        <div className="flex gap-3">
                          <FaEdit
                            className="text-verified-green cursor-pointer"
                            onClick={() => handleViewTxn(data, index)}
                          />
                          <RiDeleteBinLine
                            className="text-delete-red cursor-pointer"
                            onClick={() => handleRemove(index)}
                          />
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

      </div>
    </div>
  )
}

export default GroupUsers