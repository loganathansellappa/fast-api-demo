import React, { useState } from "react";
import { ContextMenu } from "./ContextMenu";
import { MissionState } from '../../utils/HelperUtils.ts';
export interface ContextMenuProviderProps {
  children: React.ReactNode;
  options: MissionState[],
  handleClick: (a: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
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
    item?: string;
  }>({
    show: false,
    top: 0,
    left: 0,
    item: '',
  });

  const menuOptions = Object.values(options).map(state => state);
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const element = e.target as HTMLElement;
    setContextMenu({ show: true, top: e.clientY, left: e.clientX, item: element.dataset.itemId });
  };

  const handleContextMenuClose = () => {
    setContextMenu({ show: false, top: 0, left: 0, item: ''});
  };

  return (
    <div onContextMenu={handleContextMenu} onClick={handleContextMenuClose}>
      {children}
      <ContextMenu
        showMenu={contextMenu.show}
        position={{ top: contextMenu.top, left: contextMenu.left }}
        currentItem={contextMenu.item}
        options={menuOptions}
        handleClick={handleClick}
      />
    </div>
  );
};
