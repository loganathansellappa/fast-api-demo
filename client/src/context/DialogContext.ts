import { Dispatch } from 'react';
import { createContext, SetStateAction, useContext } from 'react';

export type DialogState = {
  isOpen: boolean;
  content: React.ReactNode | null;
  handler: () => void;
  title: string;
  noBtnText: string;
  yesBtnText: string;
};

export type DialogContextType = {
  dialog: DialogState;
  setDialog: Dispatch<SetStateAction<DialogState>>;
};

export const DialogContext = createContext<DialogContextType | null>(null);


export const useDialogContext = () => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const context: any = useContext(DialogContext)
  if (context === undefined) {
    throw new Error('useAxiosClient must be used within a AxiosClientProvider')
  }
  return context;
}