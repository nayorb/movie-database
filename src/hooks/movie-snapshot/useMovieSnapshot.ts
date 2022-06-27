import { IAppMovieSnapshot } from "../../redux-store/store-modules/favourite-movies/favourite-movies.types";
import useFavouriteMovies from "../favourite-movies/useFavouriteMovies";
import { useSelector } from "react-redux";
import { selectSearchMovies } from "../../redux-store/store-modules/movies/movies-selectors";

const useMovieSnapshot = (id: string) => {
  const { add, remove, favouriteMovies } = useFavouriteMovies();
  const searchMovies = useSelector(selectSearchMovies);

  const favouriteMovie = favouriteMovies.find((m) => m.id === id);
  const isInFavourites = !!favouriteMovie;

  const movieSnapshot: IAppMovieSnapshot | null = (() => {
    if (isInFavourites) {
      return favouriteMovie;
    }

    const searchMovie = searchMovies.find((m) => m.id === id);
    if (searchMovie) {
      return {
        id,
        title: searchMovie.title,
      };
    }

    return null;
  })();

  const toggle = () => {
    if (!movieSnapshot) return;

    if (isInFavourites) {
      remove(movieSnapshot.id);
    } else {
      add(movieSnapshot);
    }
  };

  return {
    movieSnapshot,
    toggle,
    isInFavourites,
  };
};

export default useMovieSnapshot;
