import { createContext, SetStateAction, useContext } from 'react';
import { Dispatch } from 'react';

interface DialogContextType {
  dialog: {
    isOpen: boolean,
    content: null | React.ReactNode,
    handler: () => void,
    noBtnText: string,
    yesBtnText: string,
    title: string,
  };
  setDialog: Dispatch<SetStateAction<{
    isOpen: boolean,
    content: null | React.ReactNode | string,
    handler: () => void,
    noBtnText: string,
    yesBtnText: string,
    title: string,
  }>>;
}
export const DialogContext = createContext<DialogContextType | null>(null)

export const useDialogContext = () => {
  const context: any = useContext(DialogContext)
  if (context === undefined) {
    throw new Error('useAxiosClient must be used within a AxiosClientProvider')
  }
  return context
}