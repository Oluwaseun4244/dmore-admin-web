import axios, { AxiosResponse } from "axios";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
    UseMutationOptions,
    MutationFunction,

} from '@tanstack/react-query'


export const getData = async (url: string) => {
    const userToken = localStorage.getItem("userToken")
    const baseUrl = "dont know for now";
    try {
        const config = {
            headers: { Authorization: `Bearer ${userToken}` }
        }

        const response = await axios.get(`${baseUrl}/${url}`, config)

        if (response.status === 200 || response.status === 201) {
            return { data: response, error: false }
        }
    } catch (error) {
        console.log("error", error)

        return { error: true, message: error?.response?.data?.message || 'An error occurred' };
    }
}

export const postData = async <T>(url: string, payload: unknown): Promise<T> => {


    return new Promise(async (resolve, reject) => {

        const userToken = localStorage.getItem("userToken");
        const baseUrl = "dont know for now";
        try {
            const config = {
                headers: { Authorization: `Bearer ${userToken}` }
            };

            const response: AxiosResponse<T> = await axios.post(`${baseUrl}/${url}`, payload, config);

            if (response.status === 200 || response.status === 201) {
                resolve(response.data)
            }
            reject(response.statusText)
        } catch (error: any) {
            // if(error?.response?.status === 401 )
            reject(error)
        }
    })
};

export const useGetQuery = (url: string, queryKeys: string[]) => {

    return useQuery({
        queryKey: queryKeys,
        queryFn: () => getData(url)
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

