import MovieService from "./movie.service";
import mapSearchMoviesToAppMovies from "./mappers/mapSearchMoviesToAppMovies";
import mapMovieToAppMovieDetail from "./mappers/mapMovieToAppMovieDetail";

jest.mock("./mappers/mapSearchMoviesToAppMovies", () => jest.fn());
jest.mock("./mappers/mapMovieToAppMovieDetail", () => jest.fn());

describe("movie.service", () => {
  describe("searchMovies", () => {
    test("should successfully finish", async () => {
      // @ts-ignore
      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve({ Search: [], totalResults: 447 }),
      });
      (mapSearchMoviesToAppMovies as jest.Mock).mockReturnValue([{ id: "movie-id-1" }]);

      expect(await MovieService.searchMovies({ page: 14, query: "batman" })).toEqual({
        movies: [{ id: "movie-id-1" }],
        totalResults: 447,
      });

      expect(global.fetch).toHaveBeenCalledWith("http://www.omdbapi.com/?apikey=bee67ab4&s=batman&page=14");
    });

    test("should throw no movies error", async () => {
      // @ts-ignore
      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve({ totalResults: 447 }),
      });

      try {
        await MovieService.searchMovies({ page: 14, query: "batman" });
      } catch (e) {
        expect(e).toEqual(new Error("MovieService.searchMovies | no movies received"));
      }

      expect(global.fetch).toHaveBeenCalledWith("http://www.omdbapi.com/?apikey=bee67ab4&s=batman&page=14");
    });

    test("should throw service error", async () => {
      // @ts-ignore
      global.fetch = jest.fn().mockRejectedValue("search-error");
      try {
        await MovieService.searchMovies({ page: 14, query: "batman" });
      } catch (e) {
        expect(e).toEqual("search-error");
      }

      expect(global.fetch).toHaveBeenCalledWith("http://www.omdbapi.com/?apikey=bee67ab4&s=batman&page=14");
    });
  });

  describe("getMovieDetail", () => {
    test("should successfully finish", async () => {
      // @ts-ignore
      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve({ id: "movie-detail-id-1" }),
      });
      (mapMovieToAppMovieDetail as jest.Mock).mockReturnValue({ id: "movie-detail-id-1" });

      expect(await MovieService.getMovieDetail("movie-id")).toEqual({ id: "movie-detail-id-1" });

      expect(global.fetch).toHaveBeenCalledWith("http://www.omdbapi.com/?apikey=bee67ab4&i=movie-id");
    });

    test("should throw no movie error", async () => {
      // @ts-ignore
      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve(),
      });

      try {
        await MovieService.getMovieDetail("movie-id");
      } catch (e) {
        expect(e).toEqual(new Error("MovieService.getMovieDetail | no movie detail received"));
      }

      expect(global.fetch).toHaveBeenCalledWith("http://www.omdbapi.com/?apikey=bee67ab4&i=movie-id");
    });

    test("should throw service error", async () => {
      // @ts-ignore
      global.fetch = jest.fn().mockRejectedValue("get-detail-error");
      try {
        await MovieService.getMovieDetail("movie-id");
      } catch (e) {
        expect(e).toEqual("get-detail-error");
      }

      expect(global.fetch).toHaveBeenCalledWith("http://www.omdbapi.com/?apikey=bee67ab4&i=movie-id");
    });
  });
});
