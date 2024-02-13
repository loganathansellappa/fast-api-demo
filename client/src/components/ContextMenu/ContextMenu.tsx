import React from "react";
import { MissionState } from '../../utils/HelperUtils.ts';
import 'react-toastify/dist/ReactToastify.css';

export interface ContextMenuProps {
  showMenu: boolean;
  position: { top: number; left: number };
  options: MissionState[];
  currentItem?: string;
  handleClick: (a: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
                                                          showMenu,
                                                          position,
                                                          options,
                                                          currentItem,
                                                          handleClick,
                                                        }) => {

  if (!showMenu) return null;

  return (
    <div
      className="flex flex-col bg-gradient-to-tr border border-gray-300 rounded-md shadow-md absolute z-10 h-100 min-w-100 w-200"
      style={{ top: position.top, left: position.left }}
    >
      <div className="font-bold border-gray-50  p-5">Move to</div>
      {options.map(option => <div key={option} className="border-b-2 border-gray-50 hover:bg-amber-200 hover:cursor-pointer py-2 p-5 " onClick={(e) => handleClick(currentItem as string, e)}>{option}</div>)}
    </div>
  );
};