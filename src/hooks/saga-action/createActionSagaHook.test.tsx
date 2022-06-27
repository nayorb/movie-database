import { render } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import createActionSagaHook from "./createActionSagaHook";
import { APP_ACTIONS } from "../../config/actions";
import { selectActionError } from "../../redux-store/store-modules/error/error-selectors";
import { selectIsActionLoading } from "../../redux-store/store-modules/loading/loading-selectors";
import useActionDispatch from "../dispatch/useActionDispatch";

jest.mock("../dispatch/useActionDispatch", () => jest.fn());
jest.mock("../../redux-store/store-modules/error/error-selectors", () => ({
  selectActionError: jest.fn(),
}));
jest.mock("../../redux-store/store-modules/loading/loading-selectors", () => ({
  selectIsActionLoading: jest.fn(),
}));
jest.mock("react-redux", () => ({
  useSelector: (selector: () => any) => selector(),
}));

const useTheAction = createActionSagaHook<{
  first: boolean;
  notSecond: boolean;
}>(APP_ACTIONS.SEARCH_MOVIES);

const TestComponent = () => {
  const { action, error, isLoading } = useTheAction();
  return (
    <div>
      <div>{`error: ${error}`}</div>
      <div>isLoading: {isLoading.toString()}</div>
      <button onClick={() => action({ first: false, notSecond: true })}>action</button>
    </div>
  );
};

describe("useSagaAction (hook)", () => {
  test("should run action", async () => {
    const actionDispatchMock = jest.fn();
    (useActionDispatch as jest.Mock).mockImplementation(() => actionDispatchMock);
    (selectActionError as jest.Mock).mockImplementation(() => () => undefined);
    (selectIsActionLoading as jest.Mock).mockImplementation(() => () => false);

    render(<TestComponent />);

    expect(screen.getByText("isLoading: false")).toBeInTheDocument();
    expect(screen.getByText("error: undefined")).toBeInTheDocument();
    expect(actionDispatchMock).not.toHaveBeenCalled();

    const actionButton = screen.getByRole("button", { name: "action" });

    userEvent.click(actionButton);

    await waitFor(() =>
      expect(actionDispatchMock).toHaveBeenCalledWith({
        payload: {
          data: {
            first: false,
            notSecond: true,
          },
          onFailure: expect.any(Function),
          onSuccess: expect.any(Function),
        },
        type: APP_ACTIONS.SEARCH_MOVIES,
      }),
    );
  });

  test("should render error and loading", async () => {
    const actionDispatchMock = jest.fn();
    (useActionDispatch as jest.Mock).mockImplementation(() => actionDispatchMock);
    (selectActionError as jest.Mock).mockImplementation(() => () => "error");
    (selectIsActionLoading as jest.Mock).mockImplementation(() => () => true);

    render(<TestComponent />);

    expect(screen.getByText("isLoading: true")).toBeInTheDocument();
    expect(screen.getByText("error: error")).toBeInTheDocument();
  });
});
