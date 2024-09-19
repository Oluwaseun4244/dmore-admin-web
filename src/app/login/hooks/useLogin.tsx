import React from "react";
import { useGetQuery, usePostQuery } from "@/app/utils/apiUtils";
import {
  LoginResponseType,
  LoginApiData,
  ProfileResponse,
} from "@/app/types/auth.types";
import { useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const queryClient = useQueryClient()
  const [token, setToken] = React.useState("")




  // React.useEffect(() => {

  //   if (profileQuery.data && !profileQuery.isPending) {
  //     //KINDLY MODIFY THIS profileQuery.data as well, depending on the schema
  //     queryClient.setQueryData(['user'], profileQuery.data)
  //   }
  // }, [queryClient, profileQuery.isPending, profileQuery.data])



  const loginMutation = usePostQuery<LoginResponseType, LoginApiData>(
    "/get-token",
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
    loginMutation,
  };
};
