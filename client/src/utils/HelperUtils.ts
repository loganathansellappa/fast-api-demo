import { toast } from 'react-toastify';

export type ServerConfig = {
    baseUrl: string;
};
export const serverData = () => {
    return {
        baseUrl: process.env.DATA_URL,
    } as ServerConfig;
};

export enum MissionState {
    PreFlight = 'Pre-flight',
    Flight = 'In-Flight',
    PostFlight = 'Post-Flight'
}


export enum MutationType {
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}

export const showSuccessToast = (message: string, id: string | number = 1) => {
    toast.dismiss();
    toast.success(message, { toastId: id, autoClose: 500, style: { background: '#5CDD00', color: "white" } });
};

export const showErrorToast = (message: string, id: string | number) => {
    toast.dismiss();
    toast.error(message, { toastId: id, autoClose: 500 });
};
