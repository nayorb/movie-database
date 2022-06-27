import { IMovieDetail } from "../movie.service";
import { IAppMovieDetail } from "../../../redux-store/store-modules/movies/movies.types";

const mapMovieToAppMovieDetail = (movie: IMovieDetail): IAppMovieDetail => {
  const appMovieDetail: IAppMovieDetail = {
    id: movie.imdbID,
    title: movie.Title,
    actors: movie.Actors.split(",").map((a) => a.trim()),
    boxOffice: movie.BoxOffice,
    countries: movie.Country.split(",").map((a) => a.trim()),
    dvd: movie.DVD,
    director: movie.Director,
    genre: movie.Genre.split(",").map((a) => a.trim()),
    languages: movie.Language.split(",").map((l) => l.trim()),
    metascore: parseInt(movie.Metascore),
    plot: movie.Plot,
    posterUrl: movie.Poster,
    production: movie.Production,
    rated: movie.Rated,
    released: movie.Released,
    response: movie.Response,
    runtime: movie.Runtime,
    type: movie.Type,
    website: movie.Website,
    writers: movie.Writer.split(",").map((a) => a.trim()),
    year: parseInt(movie.Year),
    imdbRating: movie.imdbRating,
    imdbVotes: movie.imdbVotes,
  };

  return appMovieDetail;
};

export default mapMovieToAppMovieDetail;
