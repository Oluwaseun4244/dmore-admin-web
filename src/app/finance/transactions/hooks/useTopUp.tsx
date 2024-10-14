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

        console.log("INFLOW CREATE ERROR", error)
        const messages = error?.response?.data?.messages || []
        const exception = error?.response?.data?.exception || ""
        const message = error?.message || ""

        if (messages.length) {
          messages.map(message => {
            alert(message || 'Error creating inflow', "error")
          })
          return
        }
        if (exception) {
          alert(exception, "error")
          return
        }
        if (message) {
          alert(message, "error")
          return
        }

        alert(error?.response?.data?.supportMessage || 'Error creating inflow', "error")

      },
    }
  );

  return {
    topUpMutation,
  };
};
