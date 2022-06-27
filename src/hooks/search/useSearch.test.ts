import { useDispatch } from "react-redux";
import { useSearchMovieAction } from "../app-actions";
import { moviesSliceActions } from "../../redux-store/store-modules/movies/movies-slice";
import useSearch from "./useSearch";

jest.mock("../app-actions", () => ({ useSearchMovieAction: jest.fn() }));
jest.mock("../../redux-store/store-modules/movies/movies-selectors", () => ({
  selectSearchQuery: () => "godfather",
}));
jest.mock("../../redux-store/store-modules/movies/movies-slice", () => ({
  moviesSliceActions: {
    setSearchQuery: jest.fn(),
  },
}));

describe("useSearch (hook)", () => {
  test("should propagate values", () => {
    const setSearchQueryMock = jest.fn();
    (useSearchMovieAction as jest.Mock).mockReturnValue({
      isLoading: false,
      error: "error",
      action: jest.fn(),
    });

    const { isLoading, error, query } = useSearch();
    expect(isLoading).toEqual(false);
    expect(error).toEqual("error");
    expect(query).toEqual("godfather");
  });

  test("should trigger searchMovieAction", () => {
    const searchMovieActionMock = jest.fn();
    (useSearchMovieAction as jest.Mock).mockReturnValue({
      isLoading: false,
      error: "error",
      action: searchMovieActionMock,
    });

    const { search } = useSearch();
    search();
    expect(searchMovieActionMock).toHaveBeenCalled();
  });

  test("should trigger dispatch", () => {
    const setSearchQueryMock = jest.fn((val) => val);
    const dispatchMock = jest.fn();
    // @ts-ignore
    (moviesSliceActions.setSearchQuery as jest.Mock).mockImplementation(setSearchQueryMock);
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);

    (useSearchMovieAction as jest.Mock).mockReturnValue({
      isLoading: false,
      error: "error",
      action: jest.fn(),
    });

    const { setQuery } = useSearch();
    setQuery("batman");
    expect(dispatchMock).toHaveBeenCalledWith("batman");
  });
});
