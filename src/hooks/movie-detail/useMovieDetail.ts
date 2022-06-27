import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetMovieDetailAction } from "../app-actions";
import { selectMovieDetail, selectSelectedMovieId } from "../../redux-store/store-modules/movies/movies-selectors";
import useFavouriteMovies from "../favourite-movies/useFavouriteMovies";
import { selectIsMovieFavourite } from "../../redux-store/store-modules/favourite-movies/favourite-movies-selectors";

const useMovieDetail = () => {
  const movieDetail = useSelector(selectMovieDetail);
  const id = useSelector(selectSelectedMovieId);
  const isFavourite = useSelector(selectIsMovieFavourite(id));
  const { action: getMovieDetailAction, isLoading, error } = useGetMovieDetailAction();
  const { add, remove } = useFavouriteMovies();

  useEffect(() => {
    if (!id) return;
    getMovieDetailAction({ id });
  }, [id, getMovieDetailAction]);

  const toggleFavourite = () => {
    if (!movieDetail) return;

    if (isFavourite) {
      remove(movieDetail.id);
    } else {
      add({
        id: movieDetail.id,
        title: movieDetail.title,
      });
    }
  };

  return { movieDetail, isLoading, error, isFavourite, toggleFavourite, id };
};

export default useMovieDetail;
