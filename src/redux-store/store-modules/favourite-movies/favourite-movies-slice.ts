import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAppMovieSnapshot } from "./favourite-movies.types";
import FavouriteMoviesService from "../../../services/favourite-movies/favourite-movies.service";

export interface FavouriteMoviesReducerState {
  movies: IAppMovieSnapshot[];
}

const initialState: FavouriteMoviesReducerState = {
  movies: FavouriteMoviesService.getFavouriteMovies(),
};

const favouriteMoviesSlice = createSlice({
  name: "favourite-movies",
  initialState,
  reducers: {
    addFavouriteMovie(state, action: PayloadAction<IAppMovieSnapshot>) {
      return {
        ...state,
        movies: FavouriteMoviesService.addFavouriteMovie(action.payload),
      };
    },
    removeFavouriteMovie(state, action: PayloadAction<string>) {
      return {
        ...state,
        movies: FavouriteMoviesService.removeFavouriteMovie(action.payload),
      };
    },
  },
});

export const favouriteMoviesSliceActions = favouriteMoviesSlice.actions;
export default favouriteMoviesSlice.reducer;
