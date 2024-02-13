import { TMissionControl } from '../MissionControlList/MissionControlList.tsx';
import { MissionControlCard } from '../MissionControlCard/MissionControlCard.tsx';
import { MissionState, MutationType } from '../../utils/HelperUtils.ts';
import { ContextMenuProvider } from '../ContextMenu/ContextMenuProvider.tsx';
import { useMissionControlUpdate } from '../../hooks/useMissionControlMutation.ts';
import { toast } from 'react-toastify';

interface MissionControlCardProps {
  missionControl: TMissionControl[];
  title: MissionState;
}

export const MissionControlCardContainer = ({ missionControl, title }: MissionControlCardProps) => {
  const { mutate } = useMissionControlUpdate();
  const handleClick = (currentItem: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const currentState = target.innerHTML as MissionState;
    toast.success(`Mission Control moved to ${currentState}`);
    mutate(currentItem, currentState, MutationType.PUT);
  }

  const borderColor =
    title === MissionState.PreFlight ? 'orange' : title === MissionState.PostFlight ? 'green' : 'blue'


  const options = Object.values(MissionState).filter(state => state !== title);

  return (
      <div className="flex-col min-w-[30%] m-10 bg-gray-100 p-8 max-2xl no-scrollbar overflow-y-scroll">
        <div className="bg-gray-100 text-black font-bold mb-12 rounded sticky">{title}</div>
        <ContextMenuProvider options={options} handleClick={handleClick}>
          <div className="no-scrollbar overflow-y-scroll ">
            {missionControl.map((control: TMissionControl) => (
              <MissionControlCard key={control.id} missionControl={control} borderColor={borderColor}/>
            ))}
          </div>
        </ContextMenuProvider>
      </div>
  );
}
