import { MissionControlInput, useMissionControlUpdate } from '../../hooks/useMissionControlMutation.ts';
import { MutationType, showErrorToast, showSuccessToast } from '../../utils/HelperUtils.ts';
import { useCallback, useId } from 'react';

export type DeleteMissionControlProps = {
  onCancel: () => void;
  id: number;
}
export const DeleteMissionControl = ({ onCancel, id }: DeleteMissionControlProps ) => {
  const {  mutate, isError, isSuccess } = useMissionControlUpdate();
  const uId = useId();
  const onDeleteClick = useCallback(() => {
    const requestData: MissionControlInput = {
      mutationType: MutationType.DELETE,
      id,
    }
    mutate(requestData);
  }, [mutate, id]);


  if(isError) {
    showErrorToast('Mission Deletion Failed', `MissionDeletionFailed${uId}${id}`);
    onCancel();
  }

  if(isSuccess) {
    showSuccessToast('Mission Deletion Success', `MissionDeletionSuccess${uId}${id}`);
    onCancel();
  }

  return (
    <div className="flex flex-col">
      <div className="mb-12 pt-3">
        Are you sure? You can't undo this action afterwards.
      </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="cancel-delete mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md focus:outline-none focus:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onDeleteClick}
            className="mission-delete px-4 py-2 bg-blue-800 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:bg-blue-600"
          >
            Delete
          </button>
        </div>
      </div>
  );
};
