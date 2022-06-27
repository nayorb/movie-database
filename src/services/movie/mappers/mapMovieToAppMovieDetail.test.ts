import mapMovieToAppMovieDetail from "./mapMovieToAppMovieDetail";

describe("mapMovieToAppMovieDetail", function () {
  test("should return movie detail", () => {
    expect(
      // @ts-ignore
      mapMovieToAppMovieDetail({
        imdbID: "imdbID",
        Title: "Title",
        Actors: "Actor 1, Actor 2",
        BoxOffice: "BoxOffice",
        Country: "Country 1, Country 2",
        DVD: "DVD",
        Director: "Director",
        Genre: "Genre 1, Genre 2",
        Language: "Language 1, Language 2",
        Metascore: "68",
        Plot: "Plot",
        Poster: "Poster",
        Production: "Production",
        Rated: "Rated",
        Released: "Released",
        Response: "Response",
        Runtime: "Runtime",
        Type: "Type",
        Website: "Website",
        Writer: "Writer 1, Writer 2",
        Year: "1985",
        imdbRating: "imdbRating",
        imdbVotes: "imdbVotes",
      }),
    ).toEqual({
      id: "imdbID",
      title: "Title",
      actors: ["Actor 1", "Actor 2"],
      boxOffice: "BoxOffice",
      countries: ["Country 1", "Country 2"],
      dvd: "DVD",
      director: "Director",
      genre: ["Genre 1", "Genre 2"],
      languages: ["Language 1", "Language 2"],
      metascore: 68,
      plot: "Plot",
      posterUrl: "Poster",
      production: "Production",
      rated: "Rated",
      released: "Released",
      response: "Response",
      runtime: "Runtime",
      type: "Type",
      website: "Website",
      writers: ["Writer 1", "Writer 2"],
      year: 1985,
      imdbRating: "imdbRating",
      imdbVotes: "imdbVotes",
    });
  });
});
