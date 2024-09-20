import axios, { AxiosResponse } from "axios";
import {
    useQuery,
    useMutation,
    UseMutationOptions,
    UseQueryOptions,
    QueryKey,
} from '@tanstack/react-query'
import { BASE_URL } from "./constants";
import { getSession } from "next-auth/react";


interface getConfig {
    url: string;
    queryKeys: (string | boolean | any)[]
}

const willExpireInFiveMinutes = () => {
    const expirationTimestamp = parseInt(localStorage.getItem('expiration') || "0", 10);
    const currentTimestamp = Date.now(); // Get current timestamp
    const fiveMinutesInMs = 5 * 60 * 1000; // 5 minutes in milliseconds

    if (expirationTimestamp - currentTimestamp <= fiveMinutesInMs) {
        console.log("Expiration is happening in the next 5 minutes.", expirationTimestamp, currentTimestamp);
        return true
    } else {
        console.log("Expiration is not happening within the next 5 minutes.", expirationTimestamp, currentTimestamp);
        return false
    }

}

export function decodeJwt(token: string) {
    // Split the JWT into its 3 parts
    const base64Url = token.split('.')[1];

    // Decode Base64 (replace characters to make it URL-safe)
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    // Decode the Base64-encoded payload into a JSON string
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );

    // Parse the JSON string into an object
    const payload = JSON.parse(jsonPayload);
    return payload;
}


export const getData = async<T>(url: string): Promise<T> => {
    return new Promise(async (resolve, reject) => {

        const session = await getSession()
        console.log("session", session)
        try {

            // if (willExpireInFiveMinutes()) {
            //     //need to refetch token
            // }

            const config = {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                    'Content-Type': 'application/json'
                }
            };

            const response: AxiosResponse<T> = await axios.get(`${BASE_URL}/${url}`, config);

            if (response.status < 200 || response.status >= 300) {
                reject(response.statusText)
            }
            resolve(response.data)
        } catch (error: any) {
            // if(error?.response?.status === 401 )
            reject(error)
        }
    })
}

export const postData = async <T>(url: string, payload: unknown): Promise<T> => {


    return new Promise(async (resolve, reject) => {

        const session = await getSession()

        try {
            const config = {
                headers: { Authorization: `Bearer ${session?.accessToken}` }
            };

            const response: AxiosResponse<T> = await axios.post(`${BASE_URL}/${url}`, payload, config);

            if (response.status === 200 || response.status === 201) {
                resolve(response.data)
            }
            reject(response.statusText)
        } catch (error: any) {

            reject(error)
        }
    })
};

export const useGetQuery = <T>(config: getConfig, options?: Omit<UseQueryOptions<T, ApiErrorResponse, T, QueryKey>, 'queryFn'>) => {

    return useQuery<T, ApiErrorResponse>({
        queryKey: config.queryKeys,
        queryFn: () => getData<T>(config.url),
        ...options
    })
}


export const usePostQuery = <ResponseType, MutationVariables>(
    url: string,
    options?: UseMutationOptions<ResponseType, ApiErrorResponse, MutationVariables>,
    mutationKeys?: string[]
) => {

    return useMutation<ResponseType, ApiErrorResponse, MutationVariables>({
        mutationFn: (payload: MutationVariables) => postData<ResponseType>(url, payload),
        mutationKey: mutationKeys,
        ...options,
    });
};

