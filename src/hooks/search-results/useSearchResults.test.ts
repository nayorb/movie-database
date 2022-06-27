import useSearch from "../search/useSearch";
import {
  selectCurrentPage,
  selectSearchMovies,
  selectTotalSearchResults,
} from "../../redux-store/store-modules/movies/movies-selectors";
import { moviesSliceActions } from "../../redux-store/store-modules/movies/movies-slice";
import useSearchResults from "./useSearchResults";
import { useDispatch } from "react-redux";

jest.mock("../search/useSearch", () => jest.fn());
jest.mock("../../redux-store/store-modules/movies/movies-slice", () => ({
  moviesSliceActions: {
    setCurrentPage: jest.fn(),
  },
}));
jest.mock("../../redux-store/store-modules/movies/movies-selectors", () => ({
  selectCurrentPage: jest.fn(),
  selectSearchMovies: jest.fn(),
  selectTotalSearchResults: jest.fn(),
}));

describe("useSearchResults (hook)", () => {
  test("should propagate values", () => {
    // @ts-ignore
    (selectCurrentPage as jest.Mock).mockReturnValue(2);
    // @ts-ignore
    (selectSearchMovies as jest.Mock).mockReturnValue(["movie-1"]);
    // @ts-ignore
    (selectTotalSearchResults as jest.Mock).mockReturnValue(28);
    (useSearch as jest.Mock).mockReturnValue({
      error: "errror",
      isLoading: true,
      search: jest.fn(),
    });

    const { searchMovies, totalResults, currentPage, pageCount, isLoading, error } = useSearchResults();
    expect(searchMovies).toEqual(["movie-1"]);
    expect(totalResults).toEqual(28);
    expect(currentPage).toEqual(2);
    expect(pageCount).toEqual(3);
    expect(isLoading).toEqual(true);
    expect(error).toEqual("errror");
  });
  test("should call setCurrentPage and search", () => {
    const dispatchMock = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);

    const searchMock = jest.fn();
    (useSearch as jest.Mock).mockReturnValue({
      error: "errror",
      isLoading: true,
      search: searchMock,
    });
    const setCurrentPageMock = jest.fn((val) => val);
    // @ts-ignore
    (moviesSliceActions.setCurrentPage as jest.Mock).mockImplementation(setCurrentPageMock);
    // @ts-ignore
    (selectTotalSearchResults as jest.Mock).mockReturnValue(28);

    const { setPage } = useSearchResults();
    setPage(12);
    expect(dispatchMock).not.toHaveBeenCalled();
    expect(searchMock).not.toHaveBeenCalled();
    expect(setCurrentPageMock).not.toHaveBeenCalled();

    setPage(0);
    expect(dispatchMock).not.toHaveBeenCalled();
    expect(searchMock).not.toHaveBeenCalled();
    expect(setCurrentPageMock).not.toHaveBeenCalled();

    setPage(3);
    expect(dispatchMock).toHaveBeenCalled();
    expect(searchMock).toHaveBeenCalled();
    expect(setCurrentPageMock).toHaveBeenCalledWith(3);
  });
});
