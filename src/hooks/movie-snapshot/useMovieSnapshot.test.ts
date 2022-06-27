import useFavouriteMovies from "../favourite-movies/useFavouriteMovies";
import { selectSearchMovies } from "../../redux-store/store-modules/movies/movies-selectors";
import useMovieSnapshot from "./useMovieSnapshot";

jest.mock("../favourite-movies/useFavouriteMovies", () => jest.fn());

jest.mock("../../redux-store/store-modules/movies/movies-selectors", () => ({
  selectSearchMovies: jest.fn(),
}));

describe("useMovieSnapshot (hook)", () => {
  test("should return proper isInFavourites value", () => {
    (useFavouriteMovies as jest.Mock).mockReturnValue({
      add: jest.fn(),
      remove: jest.fn(),
      favouriteMovies: [{ id: "id-2" }],
    });
    // @ts-ignore
    (selectSearchMovies as jest.Mock).mockReturnValue([]);

    let movieSnapshot = useMovieSnapshot("id-1");
    expect(movieSnapshot.isInFavourites).toEqual(false);

    movieSnapshot = useMovieSnapshot("id-2");
    expect(movieSnapshot.isInFavourites).toEqual(true);
  });

  test("should return movie snapshot", () => {
    (useFavouriteMovies as jest.Mock).mockReturnValue({
      add: jest.fn(),
      remove: jest.fn(),
      favouriteMovies: [{ id: "id-2" }],
    });
    // @ts-ignore
    (selectSearchMovies as jest.Mock).mockReturnValue([{ id: "id-3" }]);

    let movieSnapshot = useMovieSnapshot("id-1");
    expect(movieSnapshot.movieSnapshot).toEqual(null);

    movieSnapshot = useMovieSnapshot("id-2");
    expect(movieSnapshot.movieSnapshot).toEqual({ id: "id-2" });

    movieSnapshot = useMovieSnapshot("id-3");
    expect(movieSnapshot.movieSnapshot).toEqual({ id: "id-3" });
  });

  describe("toggle", () => {
    test("should NOT call toggle without movieSnapshot present", () => {
      const addMock = jest.fn();
      const removeMock = jest.fn();
      (useFavouriteMovies as jest.Mock).mockReturnValue({
        add: addMock,
        remove: removeMock,
        favouriteMovies: [{ id: "id-2" }],
      });
      // @ts-ignore
      (selectSearchMovies as jest.Mock).mockReturnValue([{ id: "id-3" }]);

      let movieSnapshot = useMovieSnapshot("id-1");
      movieSnapshot.toggle();
      expect(addMock).not.toHaveBeenCalled();
      expect(removeMock).not.toHaveBeenCalled();
    });

    test("should call remove from favourite movie", () => {
      const addMock = jest.fn();
      const removeMock = jest.fn();
      (useFavouriteMovies as jest.Mock).mockReturnValue({
        add: addMock,
        remove: removeMock,
        favouriteMovies: [{ id: "id-2" }],
      });
      // @ts-ignore
      (selectSearchMovies as jest.Mock).mockReturnValue([{ id: "id-3" }]);

      let movieSnapshot = useMovieSnapshot("id-2");
      movieSnapshot.toggle();
      expect(addMock).not.toHaveBeenCalled();
      expect(removeMock).toHaveBeenCalledWith("id-2");
    });

    test("should call add from search movie", () => {
      const addMock = jest.fn();
      const removeMock = jest.fn();
      (useFavouriteMovies as jest.Mock).mockReturnValue({
        add: addMock,
        remove: removeMock,
        favouriteMovies: [{ id: "id-2" }],
      });
      // @ts-ignore
      (selectSearchMovies as jest.Mock).mockReturnValue([{ id: "id-3", title: "Title 3" }]);

      let movieSnapshot = useMovieSnapshot("id-3");
      movieSnapshot.toggle();
      expect(addMock).toHaveBeenCalledWith({ id: "id-3", title: "Title 3" });
      expect(removeMock).not.toHaveBeenCalled();
    });
  });
});
