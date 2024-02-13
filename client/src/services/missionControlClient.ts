import {QueryClient, QueryClientConfig} from "react-query";
import {AxiosClientService} from "../context/AxiosClientContext.ts";

export const defaultQueryClientConfig: QueryClientConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
}
export function createMissionControlApiClient({
                                              endpoint,
                                              queryClientConfig,
                                          }: {
    endpoint?: string
    queryClientConfig?: QueryClientConfig
}) {
    return {
        axiosClientService: new AxiosClientService({ endpoint }),
        queryClient: new QueryClient(queryClientConfig ?? defaultQueryClientConfig),
    }
}
