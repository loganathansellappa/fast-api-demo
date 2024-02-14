import { render } from "@testing-library/react";
import { App } from './App.tsx';

let element: { container: HTMLElement };

test("renders App component", () => {
  element = render(<App />);
  expect(element.container.firstChild).toMatchSnapshot();
  expect(element.container.textContent).toContain("Flight Mission ControlAdd Mission Control");
});