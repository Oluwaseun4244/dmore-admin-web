import { usePostQuery } from "@/app/utils/apiUtils";
import { useAlert } from "@/lib/features/alert/useAlert";
import { CreateInflowPayload, CreateInflowResponse } from "../types/inflow.types";
import { SendPointsPayload } from "../types/transactions.types";

type setWatch = (value: boolean) => void
type watch = boolean
export const useSendPoints = () => {

  const { alert } = useAlert()

  const sendPointsMutation = usePostQuery<CreateInflowResponse, SendPointsPayload>(
    "financewallet/send-points",
    {
      onSuccess: async (data) => {
        console.log("send point success", data)
      },
      onError: (error) => {

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
