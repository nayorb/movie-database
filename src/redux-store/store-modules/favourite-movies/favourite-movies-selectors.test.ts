import { TRootState } from "../../index";
import { FavouriteMoviesReducerState } from "./favourite-movies-slice";
import { selectFavouriteMovies, selectFavouriteMoviesState } from "./favourite-movies-selectors";

describe("favourite-movies-selectors", () => {
  const favouriteMoviesSliceState: FavouriteMoviesReducerState = {
    movies: [
      { id: "id-1", title: "Title 1" },
      { id: "id-2", title: "Title 2" },
    ],
  };

  const state: Partial<TRootState> = {
    favouriteMovies: favouriteMoviesSliceState,
  };

  test("selectFavouriteMoviesState", () => {
    // @ts-ignore
    expect(selectFavouriteMoviesState(state)).toEqual(favouriteMoviesSliceState);
  });

  test("selectFavouriteMovies", () => {
    // @ts-ignore
    expect(selectFavouriteMovies(state)).toEqual(favouriteMoviesSliceState.movies);
  });
});
