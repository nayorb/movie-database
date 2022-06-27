import favouriteMoviesReducer, { favouriteMoviesSliceActions } from "./favourite-movies-slice";
import FavouriteMoviesService from "../../../services/favourite-movies/favourite-movies.service";

jest.mock("../../../services/favourite-movies/favourite-movies.service", () => ({
  getFavouriteMovies: jest.fn(() => [
    {
      id: "id-11",
      title: "Title 11",
    },
  ]),
  addFavouriteMovie: jest.fn(),
  removeFavouriteMovie: jest.fn(),
}));

describe("favourite-movies-slice", () => {
  test("should return initial state", () => {
    // @ts-ignore
    expect(favouriteMoviesReducer(undefined, {})).toEqual({
      movies: [
        {
          id: "id-11",
          title: "Title 11",
        },
      ],
    });
  });

  test("addFavouriteMovie action", () => {
    const addFavouriteMovieMock = jest.fn(() => "new-fm-value");

    (FavouriteMoviesService.addFavouriteMovie as jest.Mock).mockImplementation(addFavouriteMovieMock);

    expect(
      favouriteMoviesReducer(
        {
          movies: [],
        },
        favouriteMoviesSliceActions.addFavouriteMovie({
          id: "id-2",
          title: "Title 2",
        }),
      ),
    ).toEqual({
      movies: "new-fm-value",
    });

    expect(addFavouriteMovieMock).toHaveBeenCalledWith({ id: "id-2", title: "Title 2" });
  });

  test("removeFavouriteMovie action", () => {
    const removeFavouriteMovieMock = jest.fn(() => "new-fm-value");

    (FavouriteMoviesService.removeFavouriteMovie as jest.Mock).mockImplementation(removeFavouriteMovieMock);

    expect(
      favouriteMoviesReducer(
        {
          movies: [],
        },
        favouriteMoviesSliceActions.removeFavouriteMovie("id-7"),
      ),
    ).toEqual({
      movies: "new-fm-value",
    });

    expect(removeFavouriteMovieMock).toHaveBeenCalledWith("id-7");
  });
});
