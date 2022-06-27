import { ISearchMovie } from "../movie.service";
import { IAppSearchMovie } from "../../../redux-store/store-modules/movies/movies.types";

const mapSearchMoviesToAppMovies = (searchMovies: ISearchMovie[]): IAppSearchMovie[] => {
  if (!searchMovies) return [];

  const appMovies: IAppSearchMovie[] = searchMovies.map((searchMovie) => ({
    id: searchMovie.imdbID,
    title: searchMovie.Title,
    year: searchMovie.Year,
    type: searchMovie.Type,
    posterUrl: searchMovie.Poster,
  }));

  return appMovies;
};

export default mapSearchMoviesToAppMovies;
