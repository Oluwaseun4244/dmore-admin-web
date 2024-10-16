import React from "react";
import { usePostQuery } from "@/app/utils/apiUtils";
import { useQueryClient } from "@tanstack/react-query";
import { useAlert } from "@/lib/features/alert/useAlert";
import { FinanceWalletQueryType, FinanceWalletResponseType } from "../types/wallets.types";

export const useDashboard = () => {

  const { alert } = useAlert()

  const financeWalletMutation = usePostQuery<FinanceWalletResponseType, FinanceWalletQueryType>(
    "financewallet/search",
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
    financeWalletMutation,
  };
};


