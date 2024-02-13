import { TMissionControl } from '../MissionControlList/MissionControlList.tsx';
import { MissionControlCard } from '../MissionControlCard/MissionControlCard.tsx';
import { MissionState } from '../../utils/HelperUtils.ts';

interface MissionControlCardProps {
  missionControl: TMissionControl[];
  title: MissionState;
}

export const MissionControlCardContainer = ({ missionControl, title }: MissionControlCardProps) => {
  return (
    <div className="flex-col min-w-[30%] m-10 bg-gray-100 p-8 max-2xl no-scrollbar overflow-y-scroll">
        <div className="bg-gray-100 text-black font-bold mb-12 rounded sticky">{title}</div>
        <div className="no-scrollbar overflow-y-scroll ">
          {missionControl.map((control: TMissionControl) => (
            <MissionControlCard key={control.id} missionControl={control} />
          ))}
      </div>
    </div>
  );
}
