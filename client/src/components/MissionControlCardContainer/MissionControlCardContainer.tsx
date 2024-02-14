import { MissionControlCard } from '../MissionControlCard/MissionControlCard.tsx';
import { MissionState } from '../../utils/HelperUtils.ts';
import { MissionControlSchema } from '../../@types/zodSchema.ts';
import { useDialogContext } from '../../context/DialogContext.ts';
import { useCallback } from 'react';
import { DeleteMissionControl } from '../DeleteMissionControl/DeleteMissionControl.tsx';

export type MissionControlCardContainerProps = {
  missionControl: MissionControlSchema[];
  title: MissionState;
}

export const MissionControlCardContainer = ({ missionControl, title }: MissionControlCardContainerProps) => {

  const { setDialog } = useDialogContext();

  const closeDialog = useCallback(() => {
    setDialog({
      isOpen: false,
      text: "",
      handler: null,
      noBtnText: "",
      yesBtnText:""
    });
  }, [setDialog]);

  const openDialog = useCallback((id: number) => {
    setDialog({
      isOpen: true,
      title: 'DELETE - Mission',
      content: <DeleteMissionControl id={id} onCancel={closeDialog}  />
    });
  }, [setDialog, closeDialog]);

  const borderColor =
    title === MissionState.PreFlight ? 'orange' : title === MissionState.PostFlight ? 'green' : 'blue'

  return (
    <>
      <div className="bg-gray-100 text-black font-bold mb-12 rounded sticky">{title}</div>
      <div className="no-scrollbar overflow-y-scroll ">
        {missionControl.map((control: MissionControlSchema) => (
          <MissionControlCard key={control.id} missionControl={control} borderColor={borderColor}
                              onDeleteClick={openDialog} />
        ))}
      </div>
    </>
  );
}
