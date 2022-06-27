import { call, put, select } from "redux-saga/effects";
import { APP_ACTIONS } from "../../../config/actions";
import { loadingSliceActions } from "../../store-modules/loading/loading-slice";
import { errorSliceActions } from "../../store-modules/error/error-slice";
import runSearchMoviesAction from "./search-movie.action-saga";
import { moviesSliceActions } from "../../store-modules/movies/movies-slice";
import MovieService from "../../../services/movie/movie.service";
import { selectCurrentPage, selectSearchQuery } from "../../store-modules/movies/movies-selectors";

describe("search-movies.action-saga", () => {
  test("should successfully finish", () => {
    const onSuccessMock = jest.fn();
    const onFailureMock = jest.fn();

    const actionSaga = runSearchMoviesAction({
      type: APP_ACTIONS.SEARCH_MOVIES,
      payload: {
        data: undefined,
        onSuccess: onSuccessMock,
        onFailure: onFailureMock,
      },
    });

    expect(actionSaga.next().value).toEqual(
      put(loadingSliceActions.setLoading({ action: APP_ACTIONS.SEARCH_MOVIES, isLoading: true })),
    );

    expect(actionSaga.next().value).toEqual(select(selectCurrentPage));
    // @ts-ignore
    expect(actionSaga.next(14).value).toEqual(select(selectSearchQuery));
    // @ts-ignore
    expect(actionSaga.next("batman").value).toEqual(call(MovieService.searchMovies, { page: 14, query: "batman" }));

    // @ts-ignore
    expect(actionSaga.next({ movies: [{ id: "movie-01" }], totalResults: 552 }).value).toEqual(
      // @ts-ignore
      put(moviesSliceActions.addSearchMovies([{ id: "movie-01" }])),
    );

    expect(actionSaga.next().value).toEqual(put(moviesSliceActions.addTotalSearchResults(552)));

    expect(actionSaga.next().value).toEqual(put(errorSliceActions.removeError(APP_ACTIONS.SEARCH_MOVIES)));

    expect(actionSaga.next().value).toEqual(
      put(loadingSliceActions.setLoading({ action: APP_ACTIONS.SEARCH_MOVIES, isLoading: false })),
    );

    actionSaga.next();

    expect(onSuccessMock).toHaveBeenCalled();
    expect(onFailureMock).not.toHaveBeenCalled();
  });

  test("should raise an error", () => {
    const onSuccessMock = jest.fn();
    const onFailureMock = jest.fn();

    const actionSaga = runSearchMoviesAction({
      type: APP_ACTIONS.SEARCH_MOVIES,
      payload: {
        data: undefined,
        onSuccess: onSuccessMock,
        onFailure: onFailureMock,
      },
    });

    expect(actionSaga.next().value).toEqual(
      put(loadingSliceActions.setLoading({ action: APP_ACTIONS.SEARCH_MOVIES, isLoading: true })),
    );

    expect(actionSaga.next().value).toEqual(select(selectCurrentPage));
    // @ts-ignore
    expect(actionSaga.next(14).value).toEqual(select(selectSearchQuery));
    // @ts-ignore
    expect(actionSaga.next("batman").value).toEqual(call(MovieService.searchMovies, { page: 14, query: "batman" }));

    expect(actionSaga.throw({ message: "movies-error" }).value).toEqual(
      put(
        errorSliceActions.addError({
          action: APP_ACTIONS.SEARCH_MOVIES,
          sourceError: { message: "movies-error" },
        }),
      ),
    );

    expect(actionSaga.next().value).toEqual(
      put(loadingSliceActions.setLoading({ action: APP_ACTIONS.SEARCH_MOVIES, isLoading: false })),
    );

    expect(actionSaga.next().value).toEqual(put(moviesSliceActions.resetSearch()));

    actionSaga.next();

    expect(onSuccessMock).not.toHaveBeenCalled();
    expect(onFailureMock).toHaveBeenCalledWith({
      action: APP_ACTIONS.SEARCH_MOVIES,
      sourceError: { message: "movies-error" },
    });
  });
});
