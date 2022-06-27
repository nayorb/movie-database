import { IAppMovieDetail, IAppSearchMovie } from "../../redux-store/store-modules/movies/movies.types";
import mapSearchMoviesToAppMovies from "./mappers/mapSearchMoviesToAppMovies";
import mapMovieToAppMovieDetail from "./mappers/mapMovieToAppMovieDetail";

export const OMDB_API_KEY = "bee67ab4";
const API_URL_BASE = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&`;

export interface ISearchMovieInput {
  query: string;
  page: number;
}

export interface ISearchMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface IMovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: [
    {
      Source: string;
      Value: string;
    },
    {
      Source: string;
      Value: string;
    },
    {
      Source: string;
      Value: string;
    },
  ];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

const MovieService = {
  searchMovies: async (input: ISearchMovieInput): Promise<{ movies: IAppSearchMovie[]; totalResults: number }> => {
    const response = await fetch(`${API_URL_BASE}s=${input.query}&page=${input.page}`).then((r) => r.json());
    const searchMovies = response?.Search;

    if (response.Error) {
      throw new Error(response.Error);
    }

    if (!searchMovies) {
      throw new Error("MovieService.searchMovies | no movies received");
    }

    const movies = mapSearchMoviesToAppMovies(searchMovies);
    const totalResults = parseInt(response.totalResults);

    return { movies, totalResults };
  },
  getMovieDetail: async (movieId: string): Promise<IAppMovieDetail> => {
    const response = await fetch(`${API_URL_BASE}i=${movieId}`).then((r) => r.json());
    const movieDetail = response;

    if (!movieDetail) {
      throw new Error("MovieService.getMovieDetail | no movie detail received");
    }

    return mapMovieToAppMovieDetail(movieDetail);
  },
};

export default MovieService;
