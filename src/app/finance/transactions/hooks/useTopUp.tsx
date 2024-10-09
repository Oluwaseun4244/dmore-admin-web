import { usePostQuery } from "@/app/utils/apiUtils";


import { useAlert } from "@/lib/features/alert/useAlert";
import { CreateInflowPayload, CreateInflowResponse } from "../types/inflow.types";

type setWatch = (value: boolean) => void
type watch = boolean
export const useTopUp = (setWatchTopUp: setWatch, watch: watch) => {

  const { alert } = useAlert()

  const topUpMutation = usePostQuery<CreateInflowResponse, CreateInflowPayload>(
    "financewallet/inflows/create",
    {
      onSuccess: async (data) => {
        alert("Account top up successfully initiated", "success")
        setWatchTopUp(!watch)
      },
      onError: (error) => {

        alert(error?.response?.data?.message || error?.response?.data?.supportMessage || error?.message || 'Error creating inflow', "error")
        console.log("error from create inflow", error);
      },
    }
  );
  return {
    topUpMutation,
  };
};
