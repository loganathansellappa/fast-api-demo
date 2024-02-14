import { useAxiosClient } from '../context/AxiosClientContext.ts';
import { useMutation, useQueryClient } from 'react-query';
import { missionControlKeys } from '../services/queryKeyFactory.ts';
import { MissionState, MutationType } from '../utils/HelperUtils.ts';

export type MissionControlMutation = {
  missionState?: MissionState;
  mutationType: MutationType;
  url: string;
  description?: string;
  title?: string;
};

export type MissionControlInput = {
  mutationType: MutationType;
  id?: number;
  missionState?: MissionState;
  mission_state?: MissionState;
  description?: string;
  title?: string;
};

type RequestData = {
  url: string;
  method: MutationType;
  mission_state?: MissionState;
  data?: Record<string, unknown>;
};

export function useMissionControlUpdate() {
  const axiosClientService = useAxiosClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (requestData: MissionControlMutation) => {
      const { url, mutationType, missionState, ...data } = requestData;
      const requestObject: RequestData = {
          url: url,
          method: mutationType
      }
      if (mutationType !== MutationType.DELETE) {
        requestObject.data  = {
          ...data,
          mission_state: missionState
        }
      }
      return axiosClientService.axiosClient.request({...requestObject })
    },
    onSuccess: () => {
      queryClient.cancelQueries({ queryKey: missionControlKeys.all() });
      queryClient.invalidateQueries({ queryKey: missionControlKeys.all() });
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const mutateMissionControl = ({ id, missionState = MissionState.PreFlight, mutationType, description, title }: MissionControlInput) => {
    const url = mutationType === MutationType.POST ? `flight_missions` : `flight_missions/${id}`;
    if (mutationType === MutationType.DELETE) {
      mutation.mutate({ mutationType, url });
    }  else {
      mutation.mutate({ missionState, mutationType, description, title, url });
    }

  };

  return {
    mutate: mutateMissionControl,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
