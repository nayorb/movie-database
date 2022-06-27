import { takeLatest } from "redux-saga/effects";
import { APP_ACTIONS } from "../config/actions";
import runSearchMoviesAction from "./saga-actions/search-movie/search-movie.action-saga";
import runGetMovieDetailAction from "./saga-actions/search-movie/get-movie-detail.action-saga";

function* actionSagas() {
  yield takeLatest(APP_ACTIONS.SEARCH_MOVIES, runSearchMoviesAction);
  yield takeLatest(APP_ACTIONS.GET_MOVIE_DETAIL, runGetMovieDetailAction);
}

export default actionSagas;
