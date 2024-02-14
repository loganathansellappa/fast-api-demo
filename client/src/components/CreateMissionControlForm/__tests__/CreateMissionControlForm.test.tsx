import { render } from '@testing-library/react';
import { CreateMissionControlForm, CreateMissionControlFormProps } from '../CreateMissionControlForm.tsx';
import * as Hooks from '../../../hooks/useMissionControlMutation.ts';

describe("CreateMissionControlForm", () => {
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
    const props: CreateMissionControlFormProps = {
      onCancel: clickHandler,
    };
    element = render(<CreateMissionControlForm {...props} />);
  });

  test("renders CreateMissionControlForm component", () => {
    expect(element.container.firstChild).toMatchSnapshot();
  });

  test("displays form", () => {
    expect(
      element.container.getElementsByClassName("mission-title")!.length,
    ).toBe(1);
    expect(
      element.container.getElementsByClassName("mission-description")!.length,
    ).toBe(1);
  });

  test("trigger click on cancel button click", () => {
    const cancelButton = element.container.getElementsByClassName("cancel-create")[0] as HTMLElement;
    cancelButton.click();
    expect(clickHandler).toBeCalledTimes(1);
  });
});