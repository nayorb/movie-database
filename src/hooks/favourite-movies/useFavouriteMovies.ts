import { useDispatch, useSelector } from "react-redux";
import { selectFavouriteMovies } from "../../redux-store/store-modules/favourite-movies/favourite-movies-selectors";
import { favouriteMoviesSliceActions } from "../../redux-store/store-modules/favourite-movies/favourite-movies-slice";
import { IAppMovieSnapshot } from "../../redux-store/store-modules/favourite-movies/favourite-movies.types";

const useFavouriteMovies = () => {
  const favouriteMovies = useSelector(selectFavouriteMovies);
  const dispatch = useDispatch();

  const remove = (id: string) => {
    dispatch(favouriteMoviesSliceActions.removeFavouriteMovie(id));
  };

  const add = (movie: IAppMovieSnapshot) => {
    dispatch(favouriteMoviesSliceActions.addFavouriteMovie(movie));
  };

  return { favouriteMovies, add, remove };
};

export default useFavouriteMovies;
