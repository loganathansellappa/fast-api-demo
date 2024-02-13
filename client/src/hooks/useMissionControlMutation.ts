import { useAxiosClient } from '../context/AxiosClientContext.ts';
import { useMutation, useQueryClient } from 'react-query';
import { missionControlKeys } from '../services/queryKeyFactory.ts';
import { MissionState, MutationType } from '../utils/HelperUtils.ts';

type MissionControlUpdate = {
  id: string;
  missionState: MissionState;
  mutationType: MutationType;
};
export function useMissionControlUpdate() {
  const axiosClientService = useAxiosClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, missionState, mutationType }: MissionControlUpdate) =>
      axiosClientService.axiosClient.request({
        url: `flight_missions/${id}`,
        method: mutationType,
        data: { mission_state: missionState }
      }),
    onSuccess: () => {
      queryClient.cancelQueries({ queryKey: missionControlKeys.all() });
      queryClient.invalidateQueries({ queryKey: missionControlKeys.all() });
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const mutateMissionControl = (id: string, missionState: MissionState, mutationType: MutationType) => {
    mutation.mutate({ id, missionState, mutationType });
  };

  return {
    mutate: mutateMissionControl,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
