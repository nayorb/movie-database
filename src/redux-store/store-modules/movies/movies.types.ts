export interface IAppSearchMovie {
  id: string;
  title: string;
  year: string;
  type: string;
  posterUrl: string;
}

export interface IAppMovieDetail {
  id: string;
  title: string;
  actors: string[];
  boxOffice: string;
  countries: string[];
  dvd: string;
  director: string;
  genre: string[];
  languages: string[];
  metascore: number;
  plot: string;
  posterUrl: string;
  production: string;
  rated: string;
  released: string;
  response: string;
  runtime: string;
  type: string;
  website: string;
  writers: string[];
  year: number;
  imdbRating: string;
  imdbVotes: string;
}

export interface IAppMovieSearchResponse {
  totalResults: number;
  movies: IAppSearchMovie[];
}
