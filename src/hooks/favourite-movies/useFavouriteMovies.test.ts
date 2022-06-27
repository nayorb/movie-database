import { selectFavouriteMovies } from "../../redux-store/store-modules/favourite-movies/favourite-movies-selectors";
import { favouriteMoviesSliceActions } from "../../redux-store/store-modules/favourite-movies/favourite-movies-slice";
import useFavouriteMovies from "./useFavouriteMovies";

jest.mock("../../redux-store/store-modules/favourite-movies/favourite-movies-selectors", () => ({
  selectFavouriteMovies: jest.fn(),
}));
jest.mock("../../redux-store/store-modules/favourite-movies/favourite-movies-slice", () => ({
  favouriteMoviesSliceActions: {
    removeFavouriteMovie: jest.fn(),
    addFavouriteMovie: jest.fn(),
  },
}));

describe("useFavouriteMovies (hook)", () => {
  test("should return favourite movies", () => {
    // @ts-ignore
    (selectFavouriteMovies as jest.Mock).mockReturnValue(["godfather"]);
    const { favouriteMovies } = useFavouriteMovies();
    expect(favouriteMovies).toEqual(["godfather"]);
  });

  test("should call add", () => {
    const addFavouriteMovieMock = jest.fn();
    // @ts-ignore
    (favouriteMoviesSliceActions.addFavouriteMovie as jest.Mock).mockImplementation(addFavouriteMovieMock);
    const { add } = useFavouriteMovies();
    add({
      id: "id-1",
      title: "Title 1",
    });
    expect(addFavouriteMovieMock).toHaveBeenCalledWith({ id: "id-1", title: "Title 1" });
  });

  test("should call remove", () => {
    const removeFavouriteMovieMock = jest.fn();
    // @ts-ignore
    (favouriteMoviesSliceActions.removeFavouriteMovie as jest.Mock).mockImplementation(removeFavouriteMovieMock);
    const { remove } = useFavouriteMovies();
    remove("id-1");
    expect(removeFavouriteMovieMock).toHaveBeenCalledWith("id-1");
  });
});
