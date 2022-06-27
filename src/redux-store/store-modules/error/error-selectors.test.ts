import { APP_ACTIONS } from "../../../config/actions";
import { selectActionError } from "./error-selectors";
import { TRootState } from "../../index";

describe("error-selectors", () => {
  test("should return action error", () => {
    const state: Partial<TRootState> = {
      error: {
        [APP_ACTIONS.SEARCH_MOVIES]: { action: APP_ACTIONS.SEARCH_MOVIES, sourceError: { message: "error" } },
      },
    };

    // @ts-ignore
    expect(selectActionError(APP_ACTIONS.SEARCH_MOVIES)(state)).toEqual({
      action: APP_ACTIONS.SEARCH_MOVIES,
      sourceError: { message: "error" },
    });
  });
});
