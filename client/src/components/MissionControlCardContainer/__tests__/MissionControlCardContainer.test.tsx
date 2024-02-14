import { render } from "@testing-library/react";
import { MissionControlCardContainer, MissionControlCardContainerProps } from '../MissionControlCardContainer.tsx';
import { createContext } from 'react';
import * as Contexts from '../../../context/DialogContext.ts';
import { MissionState } from '../../../utils/HelperUtils.ts';

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
  const props: MissionControlCardContainerProps = {
    missionControl:  [
        {
          "title": "string",
          "description": "string",
          "mission_state": "Pre-flight",
          "id": 319,
          "created_at": "2024-02-14T00:45:50",
          "updated_at": "2024-02-14T00:54:26"
      }],
    title: MissionState.PreFlight,
  };
  element = render(<MissionControlCardContainer {...props} />);
});

describe("MissionControlCardContainer", () => {

  test("renders MissionControlCardContainer component", () => {
    expect(element.container.firstChild).toMatchSnapshot();
  });

  test("displays title", () => {
    expect(element.container.firstChild?.textContent).toContain(MissionState.PreFlight);
  });
});
