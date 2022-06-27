import { useDispatch, useSelector } from "react-redux";
import { selectSearchQuery } from "../../redux-store/store-modules/movies/movies-selectors";
import { moviesSliceActions } from "../../redux-store/store-modules/movies/movies-slice";
import { useSearchMovieAction } from "../app-actions";

const useSearch = () => {
  const dispatch = useDispatch();
  const query = useSelector(selectSearchQuery);

  const { isLoading, error, action } = useSearchMovieAction();

  const search = () => {
    action();
  };

  const setQuery = (value: string) => {
    dispatch(moviesSliceActions.setSearchQuery(value));
  };

  return {
    isLoading,
    error,
    search,
    setQuery,
    query,
  };
};

export default useSearch;
