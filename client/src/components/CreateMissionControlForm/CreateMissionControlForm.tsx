import { MissionControlInput, useMissionControlUpdate } from '../../hooks/useMissionControlMutation.ts';
import { MissionState, MutationType, showErrorToast, showSuccessToast } from '../../utils/HelperUtils.ts';
import { useForm } from 'react-hook-form';
import { useId } from 'react';

interface FormInputs {
  title: string
  description: string
}
interface CreateMissionControlFormProps {
  onCancel: () => void;
}
export const CreateMissionControlForm = ({ onCancel }: CreateMissionControlFormProps ) => {
  const {  mutate, isError, isSuccess, error } = useMissionControlUpdate();
  const uId = useId();

  const { register, formState: { errors }, handleSubmit } = useForm<FormInputs>();

  if(isError) {
    showErrorToast(`Mission Creation Failed ${error}`, `createMissionControlFailed${uId}`);
  }

  if(isSuccess) {
    showSuccessToast('Mission Creation Success', `createMissionControlSuccess${uId}`);
    onCancel();
  }
  const onSubmit = (data: FormInputs) => {
    const requestData: MissionControlInput = {
      title: data.title,
      description: data.description,
      missionState: MissionState.PreFlight,
      mutationType: MutationType.POST,
    }
    mutate(requestData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title:</label>
          <input
            {...register('title', { required: 'This is required.' })}
            type="text"
            id="title"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <p className="text-red-500">{errors?.title?.message}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description:</label>
          <textarea
            {...register('description', { required: 'This is required.' })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            id="description"
          ></textarea>
          <p className="text-red-500">{errors?.description?.message}</p>

        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md focus:outline-none focus:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-800 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:bg-blue-600"
          >
            Create
          </button>
        </div>
      </form>
  );
};
