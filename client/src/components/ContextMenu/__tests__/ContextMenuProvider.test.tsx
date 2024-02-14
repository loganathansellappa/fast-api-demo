import React from 'react';
import { render } from '@testing-library/react';
import { MissionState} from '../../../utils/HelperUtils.ts';
import { ContextMenuProvider, ContextMenuProviderProps } from '../ContextMenuProvider.tsx';
import * as Hooks from '../../../hooks/useMissionControlMutation.ts';


describe('ContextMenuProvider', () => {
  let element: { container: HTMLElement };
  const mutateMissionControl = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest
      .spyOn(Hooks, "useMissionControlUpdate")
      .mockReturnValue(
        {
          mutate: mutateMissionControl,
          isLoading: false,
          isError: false,
          error: false,
          isSuccess: false,
        }
      );
    const props: ContextMenuProviderProps = {
      children: React.createElement('div', { className: 'dummy-child', 'data-testid': 'child' }),
      options: Object.values(MissionState).map(state => state)
    };
    element = render(<ContextMenuProvider {...props} />);
  });

  test("renders ContextMenuProvider component", () => {
    expect(element.container.firstChild).toMatchSnapshot();
  });

  test("renders children ", () => {
    expect(
      element.container.getElementsByClassName("dummy-child")!.length,
    ).toBe(1);
  });
});
