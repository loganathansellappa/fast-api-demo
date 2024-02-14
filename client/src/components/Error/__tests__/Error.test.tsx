import { render } from "@testing-library/react";
import { Error } from '../Error.tsx';

let element: { container: HTMLElement };

test("renders Loader component", () => {
  element = render(<Error />);
  expect(element.container.firstChild).toMatchSnapshot();
  expect(element.container.textContent).toContain("Something went wrong!");
});