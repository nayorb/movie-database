import { APP_ACTIONS } from "../../../config/actions";
import { TRootState } from "../../index";
import { selectIsActionLoading, selectIsAnyActionLoading } from "./loading-selectors";

describe("loading-selectors", () => {
  test("should return loading state", () => {
    const state: Partial<TRootState> = {
      loading: {
        [APP_ACTIONS.SEARCH_MOVIES]: true,
        [APP_ACTIONS.GET_MOVIE_DETAIL]: false,
      },
    };

    // @ts-ignore
    expect(selectIsActionLoading(APP_ACTIONS.SEARCH_MOVIES)(state)).toEqual(true);
    // @ts-ignore
    expect(selectIsActionLoading(APP_ACTIONS.GET_MOVIE_DETAIL)(state)).toEqual(false);
  });

  test("should return true when at least one action has loading state is true", () => {
    const state: Partial<TRootState> = {
      loading: {
        [APP_ACTIONS.SEARCH_MOVIES]: true,
        [APP_ACTIONS.GET_MOVIE_DETAIL]: false,
      },
    };

    // @ts-ignore
    expect(selectIsAnyActionLoading(state)).toEqual(true);
  });

  test("should return false when every action has loading state is false", () => {
    const state: Partial<TRootState> = {
      loading: {
        [APP_ACTIONS.SEARCH_MOVIES]: false,
        [APP_ACTIONS.GET_MOVIE_DETAIL]: false,
      },
    };

    // @ts-ignore
    expect(selectIsAnyActionLoading(state)).toEqual(false);
  });
});
