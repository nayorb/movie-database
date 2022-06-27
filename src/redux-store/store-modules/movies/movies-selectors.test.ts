import { TRootState } from "../../index";
import { MoviesReducerState } from "./movies-slice";
import {
  selectCurrentPage,
  selectSearchMovies,
  selectTotalSearchResults,
  selectMovieDetail,
  selectMoviesState,
  selectSearchQuery,
} from "./movies-selectors";

describe("movies-selectors", () => {
  const moviesSliceState: MoviesReducerState = {
    // @ts-ignore
    searchMovies: [{ id: "id-1" }],
    currentPage: 14,
    totalSearchResults: 554,
    // @ts-ignore
    movieDetail: {
      id: "movie-detail-id",
    },
    searchQuery: "batman",
  };

  const state: Partial<TRootState> = {
    movies: moviesSliceState,
  };

  test("selectMoviesState", () => {
    // @ts-ignore
    expect(selectMoviesState(state)).toEqual(moviesSliceState);
  });

  test("selectSearchMovies", () => {
    // @ts-ignore
    expect(selectSearchMovies(state)).toEqual([{ id: "id-1" }]);
  });

  test("selectCurrentPage", () => {
    // @ts-ignore
    expect(selectCurrentPage(state)).toEqual(14);
  });

  test("selectTotalSearchResults", () => {
    // @ts-ignore
    expect(selectTotalSearchResults(state)).toEqual(554);
  });

  test("selectMovieDetail", () => {
    // @ts-ignore
    expect(selectMovieDetail(state)).toEqual({
      id: "movie-detail-id",
    });
  });

  test("selectSearchQuery", () => {
    // @ts-ignore
    expect(selectSearchQuery(state)).toEqual("batman");
  });
});
