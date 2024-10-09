import { useGetQuery, usePostQuery } from "@/app/utils/apiUtils";
import { useAlert } from "@/lib/features/alert/useAlert";
import { InflowApprovalPayload, InflowApprovalResponse } from "../types/inflow.types";


export const useTopUpApproval = (id: string | undefined) => {

  const { alert } = useAlert()

  const topUpApprovalMutation = usePostQuery<InflowApprovalResponse, InflowApprovalPayload>(
    `/financewallet/inflows/approve-inflow/${id}`,
    {
      onSuccess: async (data) => {
        console.log("data from inflow approval", data)
        alert("Inflow approved successfully", "success")
      },
      onError: (error) => {

        alert(error?.response?.data?.message || error?.message || 'Error approving inflow', "error")
        console.log("error from create inflow", error);
      },
    }
  );
  return {
    topUpApprovalMutation,
  };
};
