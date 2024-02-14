import { useMissionControlFetcher } from '../../hooks/useMissionControlFetcher.ts';
import { MissionControlCardContainer } from '../MissionControlCardContainer/MissionControlCardContainer.tsx';
import { MissionState } from '../../utils/HelperUtils.ts';
import { useCallback } from 'react';
import { ContextMenuProvider } from '../ContextMenu/ContextMenuProvider.tsx';
export const MissionControlList = () => {
  const { data, isLoading } = useMissionControlFetcher();

  const containerData = useCallback(() => {
    return Object.values(MissionState).map(state => {
      data[state] = data[state] || []
      const options = Object.values(MissionState).filter(title => title !== state);
      return (
        <div className="shadow-md flex-col w-[40%] m-10 bg-gray-100 p-8 max-2xl no-scrollbar overflow-y-scroll">
          <ContextMenuProvider options={options} key={`ctxProvider-${state}`}>
            <MissionControlCardContainer key={state} missionControl={data[state]} title={state} />
          </ContextMenuProvider>
        </div>
        )
    })
  }, [data])


  if (!data || isLoading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="flex flex-row gap-1 h-full py-10 justify-items-center">
        {containerData()}
      </div>
  );
};



