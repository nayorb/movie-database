import { IAppMovieSnapshot } from "../../redux-store/store-modules/favourite-movies/favourite-movies.types";

const FAVOURITE_MOVIES_KEY = "FAVOURITE_MOVIES_KEY";

const getItems = (): IAppMovieSnapshot[] => JSON.parse(localStorage.getItem(FAVOURITE_MOVIES_KEY) || "[]");
const setItems = (movies: IAppMovieSnapshot[]) => localStorage.setItem(FAVOURITE_MOVIES_KEY, JSON.stringify(movies));

const FavouriteMoviesService = {
  getFavouriteMovies: (): IAppMovieSnapshot[] => {
    const favouriteMovies = getItems();

    return favouriteMovies;
  },
  addFavouriteMovie: (movie: IAppMovieSnapshot): IAppMovieSnapshot[] => {
    const favouriteMovies = getItems();
    const newFavouriteMovies = [...favouriteMovies, movie];
    setItems(newFavouriteMovies);

    return newFavouriteMovies;
  },
  removeFavouriteMovie: (id: string): IAppMovieSnapshot[] => {
    const favouriteMovies = getItems();
    const newFavouriteMovies = favouriteMovies.reduce<IAppMovieSnapshot[]>((acc, movie) => {
      if (movie.id === id) return acc;
      acc.push(movie);
      return acc;
    }, []);
    setItems(newFavouriteMovies);

    return newFavouriteMovies;
  },
};

export default FavouriteMoviesService;
