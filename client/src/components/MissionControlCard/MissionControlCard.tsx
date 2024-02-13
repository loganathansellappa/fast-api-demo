import { TMissionControl } from '../MissionControlList/MissionControlList.tsx';

interface MissionControlCardProps {
  missionControl: TMissionControl;
}
export const MissionControlCard = ({ missionControl }: MissionControlCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 min-w-[40%]  border-amber-100 border-2">
      <div className="text-lg font-semibold mb-2 border-b-2 pb-10">{missionControl.title}</div>
      <div className="text-gray-600">{missionControl.description}</div>
    </div>
  );
}
