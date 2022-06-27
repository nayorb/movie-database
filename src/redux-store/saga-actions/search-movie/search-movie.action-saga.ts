import { call, put, select } from "redux-saga/effects";
import { TSagaPayloadAction } from "../../../hooks/dispatch/useActionDispatch";
import { loadingSliceActions } from "../../store-modules/loading/loading-slice";
import { errorSliceActions, IAppError } from "../../store-modules/error/error-slice";
import { moviesSliceActions } from "../../store-modules/movies/movies-slice";
import { IAppSearchMovie } from "../../store-modules/movies/movies.types";
import MovieService from "../../../services/movie/movie.service";
import { selectCurrentPage, selectSearchQuery } from "../../store-modules/movies/movies-selectors";

export type TSearchMoviesActionData = undefined;
export type TSearchMoviesAction = TSagaPayloadAction<TSearchMoviesActionData>;

function* runSearchMoviesAction(action: TSearchMoviesAction) {
  const { onSuccess, onFailure } = action.payload;

  try {
    yield put(loadingSliceActions.setLoading({ action: action.type, isLoading: true }));
    const page: number = yield select(selectCurrentPage);
    const query: string = yield select(selectSearchQuery);

    const { movies, totalResults }: { movies: IAppSearchMovie[]; totalResults: number } = yield call(
      MovieService.searchMovies,
      { query, page },
    );

    yield put(moviesSliceActions.addSearchMovies(movies));
    yield put(moviesSliceActions.addTotalSearchResults(totalResults));
    yield put(errorSliceActions.removeError(action.type));
    yield put(loadingSliceActions.setLoading({ action: action.type, isLoading: false }));
    onSuccess();
  } catch (e: any) {
    const error: IAppError = {
      sourceError: { message: e.message },
      action: action.type,
    };
    yield put(errorSliceActions.addError(error));
    yield put(loadingSliceActions.setLoading({ action: action.type, isLoading: false }));
    yield put(moviesSliceActions.resetSearch());
    onFailure(error);
  }
}

export default runSearchMoviesAction;
