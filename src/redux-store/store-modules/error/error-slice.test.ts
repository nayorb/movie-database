import errorReducer, { errorSliceActions } from "./error-slice";
import { APP_ACTIONS } from "../../../config/actions";

describe("error-slice", () => {
  test("should return initial state", () => {
    // @ts-ignore
    expect(errorReducer(undefined, {})).toEqual({});
  });

  test("should add error", () => {
    expect(
      errorReducer(
        {},
        errorSliceActions.addError({ action: APP_ACTIONS.SEARCH_MOVIES, sourceError: { message: "error" } }),
      ),
    ).toEqual({
      SEARCH_MOVIES: {
        action: APP_ACTIONS.SEARCH_MOVIES,
        sourceError: { message: "error" },
      },
    });
  });

  test("should remove error", () => {
    expect(
      errorReducer(
        {
          SEARCH_MOVIES: {
            action: APP_ACTIONS.SEARCH_MOVIES,
            sourceError: { message: "error" },
          },
        },
        errorSliceActions.removeError(APP_ACTIONS.SEARCH_MOVIES),
      ),
    ).toEqual({});
  });
});
