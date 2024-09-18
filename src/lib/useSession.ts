import useSWR from "swr";
import { getSession } from "next-auth/react";

export const useSession = () => {
  const {
    data: session,
    error,
    mutate,
  } = useSWR("session", getSession, {
    refreshInterval: 5 * 60 * 1000, // Refresh every 5 minutes
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });

  return {
    session,
    isLoading: !error && !session,
    isError: error,
    mutate,
  };
};
