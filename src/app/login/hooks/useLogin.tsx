import { usePostQuery } from "@/app/utils/apiUtils";
import { LoginResponseType, LoginApiData } from "@/app/types/auth.types";

export const useLogin = () => {
  const loginMutation = usePostQuery<LoginResponseType, LoginApiData>(
    "login route here",
    {
      onSuccess: async (data) => {
        localStorage.setItem("userToken", data.data.token);
        //handle response from data here, usually storaging data and navigating to dashboard
      },
      onError: (error) => {
        //handle error here

        console.log(error);
      },
    }
  );
  return {
    loginMutation,
  };
};
