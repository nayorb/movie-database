import mapSearchMoviesToAppMovies from "./mapSearchMoviesToAppMovies";

describe("mapSearchMoviesToAppMovies", () => {
  test("should return empty array", () => {
    expect(mapSearchMoviesToAppMovies([])).toEqual([]);
    // @ts-ignore
    expect(mapSearchMoviesToAppMovies(undefined)).toEqual([]);
    // @ts-ignore
    expect(mapSearchMoviesToAppMovies(null)).toEqual([]);
  });

  test("should return full array", () => {
    expect(
      mapSearchMoviesToAppMovies([
        {
          imdbID: "imdbID",
          Title: "Title",
          Year: "Year",
          Type: "Type",
          Poster: "Poster",
        },
      ]),
    ).toEqual([
      {
        id: "imdbID",
        title: "Title",
        year: "Year",
        type: "Type",
        posterUrl: "Poster",
      },
    ]);
  });
});
