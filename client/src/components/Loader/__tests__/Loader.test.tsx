import { render } from "@testing-library/react";
import { Loader } from '../Loader.tsx';

let element: { container: HTMLElement };

test("renders Loader component", () => {
  element = render(<Loader />);
  expect(element.container.firstChild).toMatchSnapshot();
  expect(element.container.textContent).toContain("Request is processing!");
});