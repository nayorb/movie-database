import loadingReducer, { loadingSliceActions } from "./loading-slice";
import { APP_ACTIONS } from "../../../config/actions";

describe("loading-slice", () => {
  test("should return initial state", () => {
    // @ts-ignore
    expect(loadingReducer(undefined, {})).toEqual({
      [APP_ACTIONS.SEARCH_MOVIES]: false,
      [APP_ACTIONS.GET_MOVIE_DETAIL]: false,
    });
  });

  test("should set loading true", () => {
    expect(
      loadingReducer(
        {
          [APP_ACTIONS.SEARCH_MOVIES]: false,
          [APP_ACTIONS.GET_MOVIE_DETAIL]: false,
        },
        loadingSliceActions.setLoading({ action: APP_ACTIONS.SEARCH_MOVIES, isLoading: true }),
      ),
    ).toEqual({
      [APP_ACTIONS.SEARCH_MOVIES]: true,
      [APP_ACTIONS.GET_MOVIE_DETAIL]: false,
    });
  });

  test("should set loading to false", () => {
    expect(
      loadingReducer(
        {
          [APP_ACTIONS.SEARCH_MOVIES]: true,
          [APP_ACTIONS.GET_MOVIE_DETAIL]: false,
        },
        loadingSliceActions.setLoading({ action: APP_ACTIONS.SEARCH_MOVIES, isLoading: false }),
      ),
    ).toEqual({
      [APP_ACTIONS.SEARCH_MOVIES]: false,
      [APP_ACTIONS.GET_MOVIE_DETAIL]: false,
    });
  });
});
