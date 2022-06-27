import { createSelector } from "reselect";

import { TRootState } from "../../index";

export const selectFavouriteMoviesState = createSelector(
  (state: TRootState) => state.favouriteMovies,
  (favouriteMoviesSlice) => favouriteMoviesSlice,
);

export const selectFavouriteMovies = createSelector(
  selectFavouriteMoviesState,
  (favouriteMoviesSlice) => favouriteMoviesSlice.movies,
);

export const selectIsMovieFavourite = (id?: string) =>
  createSelector(selectFavouriteMoviesState, (favouriteMoviesSlice) => {
    if (!id) return false;
    return !!favouriteMoviesSlice.movies.find((m) => m.id === id);
  });
