import {useAxiosClient} from "../context/AxiosClientContext.ts";
import {useMemo} from "react";
import {missionControlKeys} from "../services/queryKeyFactory.ts";
import {useQuery} from "react-query";
import { MissionControlSchema, NormalizedMissionControlSchema } from '../@types/zodSchema.ts';

type TransformedMissionControlData = {
    [key: string]: MissionControlSchema[]
}
export function useMissionControlFetcher() {
    const axiosClientService = useAxiosClient()

    const { isLoading, isError, error, data } = useQuery({
        queryKey: missionControlKeys.all(),
        queryFn: () => axiosClientService.axiosClient.request({ url: 'flight_missions?skip=0&limit=100' }),
    })

    const memoedData = useMemo(() => {
        if (data && data.data) {
            const validData = NormalizedMissionControlSchema.parse(data.data);
            const groupedData: { [key: string]: MissionControlSchema[] } =  validData.reduce((acc: TransformedMissionControlData, obj: MissionControlSchema) => {
                const key = obj.mission_state;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(obj);
                return acc;
            }, {})
            return groupedData
        }

        return {}

    }, [data])

    return {
        data: memoedData,
        isLoading,
        isError,
        error,
    }
}
