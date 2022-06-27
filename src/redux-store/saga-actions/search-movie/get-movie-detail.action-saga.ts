import { call, put } from "redux-saga/effects";
import { TSagaPayloadAction } from "../../../hooks/dispatch/useActionDispatch";
import { loadingSliceActions } from "../../store-modules/loading/loading-slice";
import { errorSliceActions, IAppError } from "../../store-modules/error/error-slice";
import { moviesSliceActions } from "../../store-modules/movies/movies-slice";
import { IAppMovieDetail } from "../../store-modules/movies/movies.types";
import MovieService from "../../../services/movie/movie.service";

export type TGetMovieDetailActionData = {
  id: string;
};
export type TGetMovieDetailAction = TSagaPayloadAction<TGetMovieDetailActionData>;

function* runGetMovieDetailAction(action: TGetMovieDetailAction) {
  const { onSuccess, onFailure, data } = action.payload;

  try {
    yield put(loadingSliceActions.setLoading({ action: action.type, isLoading: true }));
    yield put(moviesSliceActions.removeMovieDetail());

    const appMovie: IAppMovieDetail = yield call(MovieService.getMovieDetail, data.id);

    yield put(moviesSliceActions.addMovieDetail(appMovie));
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
    onFailure(error);
  }
}

export default runGetMovieDetailAction;
