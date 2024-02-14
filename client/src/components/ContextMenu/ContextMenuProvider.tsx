import React, { useMemo, useState } from 'react';
import { ContextMenu } from "./ContextMenu";
import { MissionState } from '../../utils/HelperUtils.ts';
export interface ContextMenuProviderProps {
  children: React.ReactNode;
  options: MissionState[],
  handleClick: (id: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const ContextMenuProvider: React.FC<ContextMenuProviderProps> = ({
                                                                          children,
                                                                          options,
                                                                          handleClick
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
