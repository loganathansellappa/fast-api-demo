import { render } from '@testing-library/react';
import { ContextMenu, ContextMenuProps } from '../ContextMenu.tsx';
import { MissionState } from '../../../utils/HelperUtils.ts';

describe("ContextMenu", () => {
  let element: { container: HTMLElement };
  const clickHandler = jest.fn();
  beforeEach(() => {
    const props: ContextMenuProps = {
      showMenu: true,
      currentItem: 1,
      handleClick: clickHandler,
      position: { top: 0, left: 0 },
      options: Object.values(MissionState).map(state => state)
    };
    element = render(<ContextMenu {...props} />);
  });

  test("renders ContextMenu component", () => {
    expect(element.container.firstChild).toMatchSnapshot();
  });

  test("displays menu options", () => {
    expect(element.container.textContent).toContain(MissionState.PreFlight);
    expect(element.container.textContent).toContain(MissionState.Flight);
    expect(
      element.container.getElementsByClassName("context-menu-item")!.length,
    ).toBe(3);
  });

  test("trigger click on menu click", () => {
    const menuItem = element.container.getElementsByClassName("context-menu-item")[0] as HTMLElement;
    menuItem.click();
    expect(clickHandler).toBeCalledTimes(1);
  });
});