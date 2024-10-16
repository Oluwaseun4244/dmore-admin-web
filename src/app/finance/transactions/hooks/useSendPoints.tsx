import { usePostQuery } from "@/app/utils/apiUtils";
import { useAlert } from "@/lib/features/alert/useAlert";
import { FinanceInflowType, SendPointResponse } from "../types/inflow.types";
import { SendPointsPayload } from "../types/transactions.types";

type closeModalType = (value: boolean) => void
export const useSendPoints = (closeModal: closeModalType) => {

  const { alert } = useAlert()

  const sendPointsMutation = usePostQuery<SendPointResponse, SendPointsPayload>(
    "financewallet/send-points",
    {
      onSuccess: async (data) => {
        closeModal(false)
        alert(data, "success")
        // console.log("send point success", data)
      },
      onError: (error) => {
        closeModal(false)
        console.log("SEND POINTS ERROR", error)
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
    sendPointsMutation,
  };
};
