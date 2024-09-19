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

export const getData = async<T>(url: string): Promise<T> => {
    return new Promise(async (resolve, reject) => {

        const session = await getSession()
        try {

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

