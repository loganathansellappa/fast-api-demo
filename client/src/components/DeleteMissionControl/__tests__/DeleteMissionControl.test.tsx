import { render } from '@testing-library/react';
import * as Hooks from '../../../hooks/useMissionControlMutation.ts';
import { DeleteMissionControl, DeleteMissionControlProps } from '../DeleteMissionControl.tsx';

describe("DeleteMissionControl", () => {
  let element: { container: HTMLElement };
  const clickHandler = jest.fn();
  const submitHandler = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(Hooks, "useMissionControlUpdate")
      .mockReturnValue(
        {
          mutate: submitHandler,
          isLoading: false,
          isError: false,
          error: false,
          isSuccess: false,
        }
      );
    const props: DeleteMissionControlProps = {
      onCancel: clickHandler,
      id: 1,
    };
    element = render(<DeleteMissionControl {...props} />);
  });

  test("renders DeleteMissionControl component", () => {
    expect(element.container.firstChild).toMatchSnapshot();
  });

  test("displays text", () => {
    expect(element.container.textContent).toContain("Are you sure? You can't undo this action afterwards.");
  });

  test("trigger click on cancel button click", () => {
    const cancelButton = element.container.getElementsByClassName("cancel-delete")[0] as HTMLElement;
    cancelButton.click();
    expect(clickHandler).toBeCalledTimes(1);
  });
});