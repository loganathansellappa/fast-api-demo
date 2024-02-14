import { useDialogContext } from '../../context/DialogContext.ts';
import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
export const Dialog= () => {
  const { dialog, setDialog } = useDialogContext();
  const { isOpen, content, title } = dialog;

  const resetDialog = useCallback(() => {
    setDialog({ isOpen: false, content: "", handler: null });
  }, [setDialog]);


  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") resetDialog();
    };
    window.addEventListener("keydown", handleKeydown);
    return ()=> window.removeEventListener("keydown", handleKeydown);
  }, [resetDialog]);

  if (!isOpen) return null;

  return  createPortal(
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="w-full bg-white p-8 rounded-lg max-w-md  min-w-[35%]">
        <div className="max-w-[100%]  bottom-4 right-4 bg-white rounded-lg">
          <div className="flex  border-b-2 pb-2  mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button className="text-gray-600 hover:text-gray-800 focus:outline-none ml-auto"
                    onClick={resetDialog}>
              x
            </button>
          </div>
          {content}
        </div>
      </div>
    </div>,
    document.getElementById('dialog-root') as HTMLElement
  );
}