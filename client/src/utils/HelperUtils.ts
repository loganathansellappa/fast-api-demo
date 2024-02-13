export type ServerConfig = {
    baseUrl: string;
};
export const serverData = () => {
    return {
        baseUrl: process.env.DATA_URL,
    } as ServerConfig;
};
