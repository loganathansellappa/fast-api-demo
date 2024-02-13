import {useMissionControlFetcher} from "../../hooks/useMissionControlFetcher.ts";

export const MissionControlList = () => {

    const {data, isLoading} = useMissionControlFetcher();

    return (
        <div>
            <p>Volocopter Code Challenge</p>
            <p>API DATA: {isLoading ? 'Loading' : JSON.stringify(data)}</p>
        </div>
    );
}