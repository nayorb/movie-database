import { combineReducers } from "@reduxjs/toolkit";

import movieReducer from "./store-modules/movies/movies-slice";
import errorReducer from "./store-modules/error/error-slice";
import loadingReducer from "./store-modules/loading/loading-slice";
import favouriteMoviesReducer from "./store-modules/favourite-movies/favourite-movies-slice";

const rootReducer = combineReducers({
  movies: movieReducer,
  error: errorReducer,
  loading: loadingReducer,
  favouriteMovies: favouriteMoviesReducer,
});

export default rootReducer;
