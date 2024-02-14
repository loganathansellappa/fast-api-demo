import React, { useState } from 'react';
import { DialogContext } from '../../context/DialogContext.ts';

interface DialogProviderProps {
  children: React.ReactNode;
}
export const DialogProvider = ({ children, ...props }: DialogProviderProps) => {
  const [dialog, setDialog] = useState({
    isOpen: false,
    content: null as null | React.ReactNode,
    handler: () => {},
    noBtnText: "",
    yesBtnText: "",
    title: ""
  });
  return (
    <DialogContext.Provider value={{  dialog, setDialog }} {...props}>
      {children}
    </DialogContext.Provider>
  );
};
