import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPage,
  selectSearchMovies,
  selectTotalSearchResults,
} from "../../redux-store/store-modules/movies/movies-selectors";
import { moviesSliceActions } from "../../redux-store/store-modules/movies/movies-slice";
import useSearch from "../search/useSearch";

const useSearchResults = () => {
  const dispatch = useDispatch();
  const { search, isLoading, error } = useSearch();

  const searchMovies = useSelector(selectSearchMovies);
  const totalResults = useSelector(selectTotalSearchResults);
  const currentPage = useSelector(selectCurrentPage);

  const pageCount = Math.ceil(totalResults / 10);

  const setPage = (page: number) => {
    if (page < 1 || page > pageCount) return;

    dispatch(moviesSliceActions.setCurrentPage(page));
    search();
  };

  return {
    searchMovies,
    totalResults,
    currentPage,
    pageCount,
    setPage,
    isLoading,
    error,
  };
};

export default useSearchResults;
