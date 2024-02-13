import {useAxiosClient} from "../context/AxiosClientContext.ts";
import {useMemo} from "react";
import {missionControlKeys} from "../services/queryKeyFactory.ts";
import {useQuery} from "react-query";
import {cacheTimes} from "../services/cacheTimes.ts";

export function useMissionControlFetcher() {
    const axiosClientService = useAxiosClient()

    const { isLoading, isError, error, data, isRefetching, refetch } = useQuery({
        queryKey: missionControlKeys.all(),
        queryFn: () => axiosClientService.axiosClient.request({ url: 'flight_missions' }),
        staleTime: cacheTimes.twoMinutes,
    })

    const memoedData = useMemo(() => {
        return data ? data : []
    }, [data])

    return {
        data: memoedData,
        isLoading,
        isError,
        error,
        isRefetching,
        refetch,
    }
}
