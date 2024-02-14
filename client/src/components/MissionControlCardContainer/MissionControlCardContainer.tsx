import { MissionControlCard } from '../MissionControlCard/MissionControlCard.tsx';
import { MissionState, MutationType, showErrorToast, showSuccessToast } from '../../utils/HelperUtils.ts';
import { ContextMenuProvider } from '../ContextMenu/ContextMenuProvider.tsx';
import { MissionControlInput, useMissionControlUpdate } from '../../hooks/useMissionControlMutation.ts';
import { MissionControlSchema } from '../../@types/zodSchema.ts';
import { useDialogContext } from '../../context/DialogContext.ts';
import { useCallback, useId, useMemo } from 'react';
import { DeleteMissionControl } from '../DeleteMissionControl/DeleteMissionControl.tsx';

interface MissionControlCardProps {
  missionControl: MissionControlSchema[];
  title: MissionState;
}

export const MissionControlCardContainer = ({ missionControl, title }: MissionControlCardProps) => {

  const { setDialog } = useDialogContext();
  const {  mutate, isError, isSuccess} = useMissionControlUpdate();
  const id = useId();

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
  }, [setDialog]);


  if(isError) {
    showErrorToast('Mission Control state update failed', `missionControlStateUpdateFailed${id}`);
  }

  if(isSuccess) {
    showSuccessToast('Mission Control state updated', `missionControlStateUpdateSuccess${id}`);
  }

  const handleClick = useCallback((currentItem: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const currentState = target.innerHTML as MissionState;
    const requestData: MissionControlInput = {
      id: currentItem as number,
      missionState: currentState,
      mutationType: MutationType.PUT,
    }
    mutate(requestData);
  },[mutate])

  const borderColor =
    title === MissionState.PreFlight ? 'orange' : title === MissionState.PostFlight ? 'green' : 'blue'


  const options = useMemo(() => {
    return Object.values(MissionState).filter(state => state !== title);
  }, [MissionState])


  const contextMenu = useCallback((options: MissionState[], handleClick: (id: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) => {
    return (
      <ContextMenuProvider options={options} handleClick={handleClick} >
        <div className="no-scrollbar overflow-y-scroll ">
          {missionControl.map((control: MissionControlSchema) => (
            <MissionControlCard key={control.id} missionControl={control} borderColor={borderColor} onDeleteClick={openDialog}/>
          ))}
        </div>
      </ContextMenuProvider>
    );
  },[missionControl, borderColor, openDialog])

  return (
      <div className="shadow-md flex-col min-w-[30%] m-10 bg-gray-100 p-8 max-2xl no-scrollbar overflow-y-scroll">
        <div className="bg-gray-100 text-black font-bold mb-12 rounded sticky">{title}</div>
        {contextMenu(options, handleClick)}
      </div>
  );
}
