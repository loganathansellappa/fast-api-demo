import { useMissionControlFetcher } from '../../hooks/useMissionControlFetcher.ts';
import { MissionControlCardContainer } from '../MissionControlCardContainer/MissionControlCardContainer.tsx';
import { MissionState } from '../../utils/HelperUtils.ts';
import { useCallback } from 'react';
export const MissionControlList = () => {
  const { data, isLoading } = useMissionControlFetcher();
  const containerData = useCallback(() => {
    return Object.values(MissionState).map(state => {
      data[state] = data[state] || []
      return <MissionControlCardContainer key={state} missionControl={data[state]} title={state} />
    })
  }, [data])


  if (!data || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-row gap-1 h-full py-10">
        {containerData()}
      </div>
    </>

  );
};



