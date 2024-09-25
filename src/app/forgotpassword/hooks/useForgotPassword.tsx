import React from "react";
import { useGetQuery, usePostQuery } from "@/app/utils/apiUtils";
import {
  LoginResponseType,
  ForgotPasswordData,
  ProfileResponse,
} from "@/app/types/auth.types";
import { useQueryClient } from "@tanstack/react-query";

export const useForgotPassword = () => {
  const queryClient = useQueryClient()
  const [token, setToken] = React.useState("")

  // const profileQuery = useGetQuery<ProfileResponse>("/profile", [
  //   `profile-${token}`, token
  // ], {
  //   enabled: !!token, queryKey: [
  //     `profile-${token}`, token
  //   ]
  // });


  // React.useEffect(() => {

  //   if (profileQuery.data && !profileQuery.isPending) {

  //     queryClient.setQueryData(['user'], profileQuery.data)
  //   }
  // }, [queryClient, profileQuery.isPending, profileQuery.data])



  const forgotPasswordMutation = usePostQuery<LoginResponseType, ForgotPasswordData>(
    "/forgot-password",
    {
      onSuccess: async (data) => {
        console.log("data from login", data)
        //kindly modify data.token.token depending on the schema of data
        localStorage.setItem("userToken", data.data.token);
        setToken(data.data.token)
        //handle response from data here, usually storing data and navigating to dashboard
      },
      onError: (error) => {
        //handle error here

        console.log(error);
      },
    }
  );
  return {
    forgotPasswordMutation,
  };
};
