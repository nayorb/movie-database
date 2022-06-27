import { createSelector } from "reselect";

import { TRootState } from "../../index";

export const selectMoviesState = createSelector(
  (state: TRootState) => state.movies,
  (moviesSlice) => moviesSlice,
);

export const selectSearchMovies = createSelector(selectMoviesState, (moviesSlice) => moviesSlice.searchMovies);

export const selectCurrentPage = createSelector(selectMoviesState, (moviesSlice) => moviesSlice.currentPage);

export const selectTotalSearchResults = createSelector(
  selectMoviesState,
  (moviesSlice) => moviesSlice.totalSearchResults,
);

export const selectMovieDetail = createSelector(selectMoviesState, (moviesSlice) => moviesSlice.movieDetail);

export const selectSearchQuery = createSelector(selectMoviesState, (moviesSlice) => moviesSlice.searchQuery);

export const selectSelectedMovieId = createSelector(selectMoviesState, (moviesSlice) => moviesSlice.selectedMovieId);
