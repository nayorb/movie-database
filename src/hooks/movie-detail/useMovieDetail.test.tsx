import { useEffect } from "react";
import { render } from "@testing-library/react";
import { selectIsMovieFavourite } from "../../redux-store/store-modules/favourite-movies/favourite-movies-selectors";
import useFavouriteMovies from "../favourite-movies/useFavouriteMovies";
import { selectMovieDetail, selectSelectedMovieId } from "../../redux-store/store-modules/movies/movies-selectors";
import { useGetMovieDetailAction } from "../app-actions";
import useMovieDetail from "./useMovieDetail";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useEffect: jest.fn(),
}));
jest.mock("../favourite-movies/useFavouriteMovies", () => jest.fn());
jest.mock("../../redux-store/store-modules/favourite-movies/favourite-movies-selectors", () => ({
  selectIsMovieFavourite: jest.fn(),
}));
jest.mock("../app-actions", () => ({
  useGetMovieDetailAction: jest.fn(),
}));
jest.mock("../../redux-store/store-modules/movies/movies-selectors", () => ({
  selectMovieDetail: jest.fn(),
  selectSelectedMovieId: jest.fn(),
}));

const TestComponent = () => {
  useMovieDetail();
  return <div>TestComponent</div>;
};

describe("useMovieDetail (hook)", () => {
  test("should call get detail action when id changes", () => {
    (useEffect as jest.Mock).mockImplementation(jest.requireActual("react").useEffect);
    const getMovieDetailActionMock = jest.fn();
    (useGetMovieDetailAction as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      action: getMovieDetailActionMock,
    });
    (selectIsMovieFavourite as jest.Mock).mockReturnValue(() => () => false);
    // @ts-ignore
    (selectSelectedMovieId as jest.Mock).mockReturnValue(undefined);
    // @ts-ignore
    (selectMovieDetail as jest.Mock).mockReturnValue({ id: "selected-movie-id" });
    (useFavouriteMovies as jest.Mock).mockReturnValue({
      add: jest.fn(),
      remove: jest.fn(),
    });

    const { rerender } = render(<TestComponent />);
    expect(getMovieDetailActionMock).not.toHaveBeenCalled();

    // @ts-ignore
    (selectSelectedMovieId as jest.Mock).mockReturnValue("selected-movie-id");
    rerender(<TestComponent />);
    expect(getMovieDetailActionMock).toHaveBeenCalledWith({ id: "selected-movie-id" });
    getMovieDetailActionMock.mockReset();

    rerender(<TestComponent />);
    expect(getMovieDetailActionMock).not.toHaveBeenCalled();

    getMovieDetailActionMock.mockReset();
    // @ts-ignore
    (selectSelectedMovieId as jest.Mock).mockReturnValue("selected-movie-id-2");
    rerender(<TestComponent />);
    expect(getMovieDetailActionMock).toHaveBeenCalledWith({ id: "selected-movie-id-2" });
  });

  test("should return proper values", () => {
    (useGetMovieDetailAction as jest.Mock).mockReturnValue({
      isLoading: false,
      error: "error",
      action: jest.fn(),
    });
    (selectIsMovieFavourite as jest.Mock).mockReturnValue(() => false);
    // @ts-ignore
    (selectSelectedMovieId as jest.Mock).mockReturnValue("movie-id");
    // @ts-ignore
    (selectMovieDetail as jest.Mock).mockReturnValue({ id: "selected-movie-id" });
    (useFavouriteMovies as jest.Mock).mockReturnValue({
      add: jest.fn(),
      remove: jest.fn(),
    });

    const { movieDetail, isLoading, error, isFavourite, id } = useMovieDetail();

    expect(movieDetail).toEqual({ id: "selected-movie-id" });
    expect(isLoading).toEqual(false);
    expect(error).toEqual("error");
    expect(isFavourite).toEqual(false);
    expect(id).toEqual("movie-id");
  });

  test("should call toggle remove", () => {
    (useGetMovieDetailAction as jest.Mock).mockReturnValue({
      isLoading: false,
      error: "error",
      action: jest.fn(),
    });
    (selectIsMovieFavourite as jest.Mock).mockReturnValue(() => false);
    // @ts-ignore
    (selectSelectedMovieId as jest.Mock).mockReturnValue("movie-id");
    // @ts-ignore
    (selectMovieDetail as jest.Mock).mockReturnValue({ id: "selected-movie-id", title: "Title" });
    const addMock = jest.fn();
    const removeMock = jest.fn();
    (useFavouriteMovies as jest.Mock).mockReturnValue({
      add: addMock,
      remove: removeMock,
    });

    const { toggleFavourite } = useMovieDetail();

    toggleFavourite();
    expect(addMock).toHaveBeenCalledWith({ id: "selected-movie-id", title: "Title" });
    expect(removeMock).not.toHaveBeenCalled();

    addMock.mockReset();
    removeMock.mockReset();
    (selectIsMovieFavourite as jest.Mock).mockReturnValue(() => true);
    const { toggleFavourite: toggle } = useMovieDetail();
    toggle();
    expect(removeMock).toHaveBeenCalledWith("selected-movie-id");
    expect(addMock).not.toHaveBeenCalled();
  });
});
