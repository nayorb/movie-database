import { call, put } from "redux-saga/effects";
import { APP_ACTIONS } from "../../../config/actions";
import { loadingSliceActions } from "../../store-modules/loading/loading-slice";
import { errorSliceActions } from "../../store-modules/error/error-slice";
import { moviesSliceActions } from "../../store-modules/movies/movies-slice";
import MovieService from "../../../services/movie/movie.service";
import runGetMovieDetailAction from "./get-movie-detail.action-saga";

describe("get-movie-detail.action-saga", () => {
  test("should successfully finish", () => {
    const onSuccessMock = jest.fn();
    const onFailureMock = jest.fn();

    const actionSaga = runGetMovieDetailAction({
      type: APP_ACTIONS.GET_MOVIE_DETAIL,
      payload: {
        data: { id: "movie-detail-id" },
        onSuccess: onSuccessMock,
        onFailure: onFailureMock,
      },
    });

    expect(actionSaga.next().value).toEqual(
      put(loadingSliceActions.setLoading({ action: APP_ACTIONS.GET_MOVIE_DETAIL, isLoading: true })),
    );

    expect(actionSaga.next().value).toEqual(put(moviesSliceActions.removeMovieDetail()));

    expect(actionSaga.next().value).toEqual(call(MovieService.getMovieDetail, "movie-detail-id"));

    // @ts-ignore
    expect(actionSaga.next({ id: "movie-01" }).value).toEqual(
      // @ts-ignore
      put(moviesSliceActions.addMovieDetail({ id: "movie-01" })),
    );

    expect(actionSaga.next().value).toEqual(put(errorSliceActions.removeError(APP_ACTIONS.GET_MOVIE_DETAIL)));

    expect(actionSaga.next().value).toEqual(
      put(loadingSliceActions.setLoading({ action: APP_ACTIONS.GET_MOVIE_DETAIL, isLoading: false })),
    );

    actionSaga.next();

    expect(onSuccessMock).toHaveBeenCalled();
    expect(onFailureMock).not.toHaveBeenCalled();
  });

  test("should raise an error", () => {
    const onSuccessMock = jest.fn();
    const onFailureMock = jest.fn();

    const actionSaga = runGetMovieDetailAction({
      type: APP_ACTIONS.GET_MOVIE_DETAIL,
      payload: {
        data: { id: "movie-detail-id" },
        onSuccess: onSuccessMock,
        onFailure: onFailureMock,
      },
    });

    expect(actionSaga.next().value).toEqual(
      put(loadingSliceActions.setLoading({ action: APP_ACTIONS.GET_MOVIE_DETAIL, isLoading: true })),
    );

    expect(actionSaga.next().value).toEqual(put(moviesSliceActions.removeMovieDetail()));

    expect(actionSaga.next().value).toEqual(call(MovieService.getMovieDetail, "movie-detail-id"));

    expect(actionSaga.throw({ message: "movies-error" }).value).toEqual(
      put(
        errorSliceActions.addError({
          action: APP_ACTIONS.GET_MOVIE_DETAIL,
          sourceError: { message: "movies-error" },
        }),
      ),
    );

    expect(actionSaga.next().value).toEqual(
      put(loadingSliceActions.setLoading({ action: APP_ACTIONS.GET_MOVIE_DETAIL, isLoading: false })),
    );

    actionSaga.next();

    expect(onSuccessMock).not.toHaveBeenCalled();
    expect(onFailureMock).toHaveBeenCalledWith({
      action: APP_ACTIONS.GET_MOVIE_DETAIL,
      sourceError: { message: "movies-error" },
    });
  });
});
