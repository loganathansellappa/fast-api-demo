import {useRef} from "react";
import {serverData} from "./utils/HelperUtils.ts";
import {createMissionControlApiClient} from "./services/missionControlClient.ts";
import {AxiosClientProvider} from "./context/AxiosClientContext.ts";
import {QueryClientProvider} from "react-query";
import {MissionControlList} from "./components/MissionControlList/MissionControlList.tsx";

export const App = () => {
	const {
		current: {
			axiosClientService,
			queryClient,
		},
	} = useRef(
		createMissionControlApiClient({
			endpoint: serverData().baseUrl,
		}),
	)

	return (
		<AxiosClientProvider value={axiosClientService}>
			<QueryClientProvider client={queryClient}>
				<MissionControlList />
			</QueryClientProvider>
		</AxiosClientProvider>
	);
};

