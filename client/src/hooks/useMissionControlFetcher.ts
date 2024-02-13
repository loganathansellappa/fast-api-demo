import {useAxiosClient} from "../context/AxiosClientContext.ts";
import {useMemo} from "react";
import {missionControlKeys} from "../services/queryKeyFactory.ts";
import {useQuery} from "react-query";
import {cacheTimes} from "../services/cacheTimes.ts";

export function useMissionControlFetcher() {
    const axiosClientService = useAxiosClient()

    const { isLoading, isError, error, data, isRefetching, refetch } = useQuery({
        queryKey: missionControlKeys.all(),
        queryFn: () => axiosClientService.axiosClient.request({ url: 'flight_missions?skip=0&limit=100' }),
    })

    const memoedData = useMemo(() => {
        console.log("data", data)
        if (data && data.data) {
            const groupedData: { [key: string]: any[] } =  data.data.reduce((acc, obj) => {
                const key = obj.mission_state;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(obj);
                return acc;
            }, {})
            console.log("groupedData", groupedData)
            return groupedData

        }

        return {}

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
