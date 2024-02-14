import { RiDeleteBin6Line } from 'react-icons/ri';
import './MissionControlCard.scss'
import { MissionControlSchema } from '../../@types/zodSchema.ts';
import { cn } from '../../utils/HelperUtils.ts';

interface MissionControlCardProps {
  missionControl: MissionControlSchema;
  borderColor: string;
  onDeleteClick: (id: number) => void;
}
export const MissionControlCard = ({ missionControl, borderColor, onDeleteClick }: MissionControlCardProps) => {
  const borderStyle = `${borderColor}-border`;

  return (
    <div className={cn('relative bg-white shadow-md rounded-md p-4 mb-4 min-w-[40%] border-2  hover:cursor-pointer', borderStyle)} data-item-id={missionControl.id}>
      <div className="flex border-b-2 pb-2" data-item-id={missionControl.id}>
        <div className="text-lg font-semibold" data-item-id={missionControl.id}>{missionControl.title}</div>
        <div className="ml-auto" data-item-id={missionControl.id}><RiDeleteBin6Line onClick={() => onDeleteClick(missionControl.id)}/></div>
      </div>
      <div className="text-gray-600 mt-4" data-item-id={missionControl.id}>{missionControl.description}</div>
    </div>
  );
}
