import { render } from "@testing-library/react";
import { Header } from '../Header.tsx';
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
  element = render(<Header />);
});

describe("Header", () => {

  test("renders Header component", () => {
    expect(element.container.firstChild).toMatchSnapshot();
  });

  test("displays title and button", () => {
    expect(element.container.getElementsByTagName('h1')[0].textContent).toContain("Flight Mission Control");
    expect(element.container.getElementsByTagName('button')[0].textContent).toContain("Add Mission Control");
  });
});
