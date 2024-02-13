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