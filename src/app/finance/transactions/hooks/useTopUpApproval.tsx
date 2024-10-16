import { usePostQuery } from "@/app/utils/apiUtils";
import { useAlert } from "@/lib/features/alert/useAlert";
import { InflowApprovalPayload, InflowApprovalResponse } from "../types/inflow.types";


export const useTopUpApproval = (id: string | undefined, onClose: (value: boolean) => void) => {

  const { alert } = useAlert()

  const topUpApprovalMutation = usePostQuery<InflowApprovalResponse, InflowApprovalPayload>(
    `financewallet/inflows/approve-inflow/${id}`,
    {
      onSuccess: async (data) => {

        alert("Inflow approved successfully", "success")
        onClose(false)
      },
      onError: (error) => {
        onClose(false)
        const messages = error?.response?.data?.messages || []
        const exception = error?.response?.data?.exception || ""
        const message = error?.message || ""

        if (messages.length) {
          messages.map(message => {
            alert(message, "error")
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

        alert(error?.response?.data?.supportMessage || 'Error approving inflow', "error")

      },
    }
  );
  return {
    topUpApprovalMutation,
  };
};
