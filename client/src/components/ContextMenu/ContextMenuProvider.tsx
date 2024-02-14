import React, { useCallback, useMemo, useState } from 'react';
import { ContextMenu } from "./ContextMenu";
import { MissionState, MutationType, showErrorToast, showSuccessToast } from '../../utils/HelperUtils.ts';
import { MissionControlInput, useMissionControlUpdate } from '../../hooks/useMissionControlMutation.ts';
export interface ContextMenuProviderProps {
  children: React.ReactNode;
  options: MissionState[],
}

export const ContextMenuProvider: React.FC<ContextMenuProviderProps> = ({
                                                                          children,
                                                                          options,
                                                                        }) => {
  const [contextMenu, setContextMenu] = useState<{
    show: boolean;
    top: number;
    left: number;
    item?: number;
  }>({
    show: false,
    top: 0,
    left: 0,
    item: 0,
  });
  const {  mutate, isError, isSuccess} = useMissionControlUpdate();


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


  if(isError) {
    showErrorToast('Mission Control state update failed', `missionControlStateUpdateFailed$`);
  }

  if(isSuccess) {
    showSuccessToast('Mission Control state updated', `missionControlStateUpdateSuccess`);
  }

  const menuOptions = useMemo(() => Object.values(options).map(state => state),[options]);
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const element = e.target as HTMLElement;
    setContextMenu({ show: true, top: e.clientY, left: e.clientX, item: element.dataset.itemId as unknown as number});
  };

  const handleContextMenuClose = () => {
    setContextMenu({ show: false, top: 0, left: 0, item: 0});
  };

  return (
    <div onContextMenu={handleContextMenu} onClick={handleContextMenuClose}>
      {children}
      <ContextMenu
        showMenu={contextMenu.show}
        position={{ top: contextMenu.top, left: contextMenu.left }}
        currentItem={contextMenu.item as number}
        options={menuOptions}
        handleClick={handleClick}
      />
    </div>
  );
};
