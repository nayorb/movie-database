import moviesReducer, { moviesSliceActions } from "./movies-slice";

describe("movies-slice", () => {
  test("should return initial state", () => {
    // @ts-ignore
    expect(moviesReducer(undefined, {})).toEqual({
      currentPage: 1,
      searchMovies: [],
      totalSearchResults: 0,
      searchQuery: "",
    });
  });

  test("addSearchMovies action", () => {
    expect(
      moviesReducer(
        {
          currentPage: 1,
          searchMovies: [],
          totalSearchResults: 0,
          searchQuery: "",
        },
        moviesSliceActions.addSearchMovies([
          // @ts-ignore
          {
            id: "id-1",
          },
          // @ts-ignore
          {
            id: "id-2",
          },
        ]),
      ),
    ).toEqual({
      currentPage: 1,
      searchMovies: [
        {
          id: "id-1",
        },
        {
          id: "id-2",
        },
      ],
      totalSearchResults: 0,
      searchQuery: "",
    });
  });

  test("addTotalSearchResults action", () => {
    expect(
      moviesReducer(
        {
          currentPage: 1,
          searchMovies: [],
          totalSearchResults: 0,
          searchQuery: "",
        },
        moviesSliceActions.addTotalSearchResults(774),
      ),
    ).toEqual({
      currentPage: 1,
      searchMovies: [],
      totalSearchResults: 774,
      searchQuery: "",
    });
  });

  test("setCurrentPage action", () => {
    expect(
      moviesReducer(
        {
          currentPage: 1,
          searchMovies: [],
          totalSearchResults: 0,
          searchQuery: "",
        },
        moviesSliceActions.setCurrentPage(14),
      ),
    ).toEqual({
      currentPage: 14,
      searchMovies: [],
      totalSearchResults: 0,
      searchQuery: "",
    });
  });

  test("addMovieDetail action", () => {
    expect(
      moviesReducer(
        {
          currentPage: 1,
          searchMovies: [],
          totalSearchResults: 0,
          searchQuery: "",
        },
        // @ts-ignore
        moviesSliceActions.addMovieDetail({
          id: "movie-detail-id",
        }),
      ),
    ).toEqual({
      currentPage: 1,
      searchMovies: [],
      totalSearchResults: 0,
      movieDetail: {
        id: "movie-detail-id",
      },
      searchQuery: "",
    });
  });

  test("removeMovieDetail action", () => {
    expect(
      moviesReducer(
        {
          currentPage: 1,
          searchMovies: [],
          totalSearchResults: 0,
          searchQuery: "",
          // @ts-ignore
          movieDetail: {
            id: "movie-detail-id",
          },
        },
        moviesSliceActions.removeMovieDetail(),
      ),
    ).toEqual({
      currentPage: 1,
      searchMovies: [],
      totalSearchResults: 0,
      searchQuery: "",
    });
  });

  test("setSearchQuery action", () => {
    expect(
      moviesReducer(
        {
          currentPage: 1,
          searchMovies: [],
          totalSearchResults: 0,
          searchQuery: "",
        },
        moviesSliceActions.setSearchQuery("batman"),
      ),
    ).toEqual({
      currentPage: 1,
      searchMovies: [],
      totalSearchResults: 0,
      searchQuery: "batman",
    });
  });
});
