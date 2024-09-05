import { usePostQuery } from "@/app/utils/apiUtils";
import {
  BuyerRegisterData,
  BuyerRegisterResponse,
  StaffRegisterData,
  StaffRegisterResponse
} from "@/app/types/auth.types";

export const useSignUp = () => {
  const buyerRegMutation = usePostQuery<
    BuyerRegisterResponse,
    BuyerRegisterData
  >("/self-register", {
    onSuccess: async (data) => {
      alert("registeration successful");
      //handle response from data here, usually storing data and navigating to dashboard
    },
    onError: (error) => {
      //handle error here

      console.log(error);
    },
  });

  const staffRegMutation = usePostQuery<
    StaffRegisterResponse,
    StaffRegisterData
  >("/self-register", {
    onSuccess: async (data) => {
      alert("registeration successful");
      //handle response from data here, usually storing data and navigating to dashboard
    },
    onError: (error) => {
      //handle error here

      console.log(error);
    },
  });

  return {
    buyerRegMutation,
    staffRegMutation,
  };
};
