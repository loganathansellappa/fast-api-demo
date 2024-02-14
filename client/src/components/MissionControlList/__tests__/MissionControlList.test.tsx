import { render } from "@testing-library/react";
import { MissionState } from '../../../utils/HelperUtils.ts';
import * as Hooks from '../../../hooks/useMissionControlFetcher.ts';
import { MissionControlList } from '../MissionControlList.tsx';
import { AxiosClientProvider, AxiosClientService } from '../../../context/AxiosClientContext.ts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createContext } from 'react';
import * as Contexts from '../../../context/DialogContext.ts';

let element: { container: HTMLElement };


beforeEach(() => {

  const context = createContext<Contexts.DialogContextType>({
    dialog: {
      isOpen: false,
      content: null,
      handler: () => jest.fn(),
      title: "",
      noBtnText: "",
      yesBtnText: "",
    },
    setDialog: () => {}
  })
  jest
    .spyOn(Contexts, "useDialogContext")
    .mockReturnValue(context);
  jest.spyOn(Hooks, "useMissionControlFetcher").mockReturnValue({
    data: {
      [MissionState.PreFlight]: [
        {
          "title": "string",
          "description": "string",
          "mission_state": "Pre-flight",
          "id": 319,
          "created_at": "2024-02-14T00:45:50",
          "updated_at": "2024-02-14T00:54:26"
        },
        {
          "title": "new",
          "description": "ew",
          "mission_state": "Pre-flight",
          "id": 327,
          "created_at": "2024-02-14T00:52:04",
          "updated_at": "2024-02-14T00:52:04"
        },
      ],
      [MissionState.Flight]: [
        {
          "title": "dsa",
          "description": "dsa",
          "mission_state": "In-Flight",
          "id": 328,
          "created_at": "2024-02-14T00:54:12",
          "updated_at": "2024-02-14T00:54:28"
        }
      ],
    },
    isLoading: false,
    isError: false,
    error: false,
  });

  element = render(
    <AxiosClientProvider value={new AxiosClientService({ endpoint: 'url' })}>
      <QueryClientProvider client={new QueryClient()}>
        <MissionControlList />
      </QueryClientProvider>
    </AxiosClientProvider>
  );
});

describe("MissionControlList", () => {
  test("renders MissionControlList component", () => {
    expect(element.container.firstChild).toMatchSnapshot();
  });
});
