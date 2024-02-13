import {useRef} from "react";
import {serverData} from "./utils/HelperUtils.ts";
import {createMissionControlApiClient} from "./services/missionControlClient.ts";
import {AxiosClientProvider} from "./context/AxiosClientContext.ts";
import {QueryClientProvider} from "react-query";
import { Header } from './components/Header/Header.tsx';
import { MissionControlList } from './components/MissionControlList/MissionControlList.tsx';

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
				<div className="w-full flex flex-col h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-10">
					<Header />
					<MissionControlList />
				</div>
			</QueryClientProvider>
		</AxiosClientProvider>
	);
};

