import { useGetQuery, usePostQuery } from "@/app/utils/apiUtils";
import {
  LoginResponseType,
  LoginApiData,
  ProfileResponse,
} from "@/app/types/auth.types";

export const useLogin = () => {
  const loginMutation = usePostQuery<LoginResponseType, LoginApiData>(
    "/get-token",
    {
      onSuccess: async (data) => {
        localStorage.setItem("userToken", data.data.token);
        const profileQuery = useGetQuery<ProfileResponse>("/profile", [
          `profile-${data.data.token}`,
        ]);

        //handle response from data here, usually storing data and navigating to dashboard
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
