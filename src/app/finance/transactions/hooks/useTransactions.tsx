import React from "react";
import { usePostQuery } from "@/app/utils/apiUtils";
import { useQueryClient } from "@tanstack/react-query";
import { useAlert } from "@/lib/features/alert/useAlert";
import { FinanceGetInflowResponseType, FinanceInflowQueryType } from "../types/inflow.types";
import { AllTransactionQueryType, AllTransactionsResponse } from "../types/transactions.types";

export const useTransactions = () => {

  const { alert } = useAlert()

  const inflowTransactionMutation = usePostQuery<FinanceGetInflowResponseType, FinanceInflowQueryType>(
    "financewallet/inflows/search",
    {
      onSuccess: async (data) => {

        // console.log("data from inflow fetchintg", data)
      },
      onError: (error) => {
        alert(error?.response?.data?.message || error?.message || 'Error fetching inflow', "error")
        console.log("error from create inflow", error);
      },
    }
  );

  const allTransactionMutation = usePostQuery<AllTransactionsResponse, AllTransactionQueryType>(
    "transactions/getall",
    {
      onSuccess: async (data) => {

        // console.log("data from inflow fetchintg", data)
      },
      onError: (error) => {
        alert(error?.response?.data?.message || error?.message || 'Error fetching inflow', "error")
        console.log("error from create inflow", error);
      },
    }
  );
  return {
    inflowTransactionMutation,
    allTransactionMutation
  };
};

