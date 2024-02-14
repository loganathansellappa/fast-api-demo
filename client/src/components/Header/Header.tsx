import { useDialogContext } from '../../context/DialogContext.ts';
import { CreateMissionControlForm } from '../CreateMissionControlForm/CreateMissionControlForm.tsx';
import { useCallback } from 'react';

export const Header = () => {
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

  const openDialog = useCallback(() => {
    setDialog({
      isOpen: true,
      title: 'Add - Mission',
      content: <CreateMissionControlForm  onCancel={closeDialog} />
    });
  }, [setDialog, closeDialog]);

    return (
      <div className="flex">
        <h1 className="bg-gray-100 text-black font-bold py-2 px-4 rounded"
        >Flight Mission Control</h1>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ml-auto"
          onClick={() => openDialog()}
        >
          Add Mission Control
        </button>
      </div>
    );
}