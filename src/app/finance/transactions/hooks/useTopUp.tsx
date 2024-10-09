import { usePostQuery } from "@/app/utils/apiUtils";


import { useAlert } from "@/lib/features/alert/useAlert";
import { CreateInflowPayload, CreateInflowResponse } from "../types/inflow.types";

export const useTopUp = () => {

  const { alert } = useAlert()

  const topUpMutation = usePostQuery<CreateInflowResponse, CreateInflowPayload>(
    "financewallet/inflows/create",
    {
      onSuccess: async (data) => {
        console.log("data from create inflow", data)
        alert("Account top up successfully", "success")
      },
      onError: (error) => {

        alert(error?.response?.data?.message || error?.message || 'Error creating inflow', "error")
        console.log("error from create inflow", error);
      },
    }
  );
  return {
    topUpMutation,
  };
};
