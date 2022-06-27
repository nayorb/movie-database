import FavouriteMoviesService from "./favourite-movies.service";

describe("favourite-movies.service", () => {
  describe("getFavouriteMovies", () => {
    test("should return filled array", () => {
      Storage.prototype.getItem = jest.fn(() => '[{"id": "movie-id-1", "title": "Title 1"}]');
      expect(FavouriteMoviesService.getFavouriteMovies()).toEqual([{ id: "movie-id-1", title: "Title 1" }]);
      expect(global.localStorage.getItem).toHaveBeenCalledWith("FAVOURITE_MOVIES_KEY");
    });

    test("should return empty array", () => {
      Storage.prototype.getItem = jest.fn(() => "[]");
      expect(FavouriteMoviesService.getFavouriteMovies()).toEqual([]);
      expect(global.localStorage.getItem).toHaveBeenCalledWith("FAVOURITE_MOVIES_KEY");
    });

    test("should return empty array with undefined localStorage", () => {
      Storage.prototype.getItem = jest.fn(() => null);
      expect(FavouriteMoviesService.getFavouriteMovies()).toEqual([]);
      expect(global.localStorage.getItem).toHaveBeenCalledWith("FAVOURITE_MOVIES_KEY");
    });
  });

  describe("addFavouriteMovie", () => {
    test("should add to filled array", () => {
      Storage.prototype.getItem = jest.fn(() => '[{"id": "movie-id-1", "title": "Title 1"}]');
      Storage.prototype.setItem = jest.fn();
      expect(FavouriteMoviesService.addFavouriteMovie({ id: "movie-id-2", title: "Title 2" })).toEqual([
        { id: "movie-id-1", title: "Title 1" },
        { id: "movie-id-2", title: "Title 2" },
      ]);
      expect(global.localStorage.getItem).toHaveBeenCalledWith("FAVOURITE_MOVIES_KEY");
      expect(global.localStorage.setItem).toHaveBeenCalledWith(
        "FAVOURITE_MOVIES_KEY",
        '[{"id":"movie-id-1","title":"Title 1"},{"id":"movie-id-2","title":"Title 2"}]',
      );
    });

    test("should add to empty array", () => {
      Storage.prototype.getItem = jest.fn(() => null);
      Storage.prototype.setItem = jest.fn();
      expect(FavouriteMoviesService.addFavouriteMovie({ id: "movie-id-1", title: "Title 1" })).toEqual([
        { id: "movie-id-1", title: "Title 1" },
      ]);
      expect(global.localStorage.getItem).toHaveBeenCalledWith("FAVOURITE_MOVIES_KEY");
      expect(global.localStorage.setItem).toHaveBeenCalledWith(
        "FAVOURITE_MOVIES_KEY",
        '[{"id":"movie-id-1","title":"Title 1"}]',
      );
    });
  });

  describe("removeFavouriteMovie", () => {
    test("should remove from filled array", () => {
      Storage.prototype.getItem = jest.fn(
        () => '[{"id": "movie-id-1", "title": "Title 1"},{"id": "movie-id-2", "title": "Title 2"}]',
      );
      Storage.prototype.setItem = jest.fn();
      expect(FavouriteMoviesService.removeFavouriteMovie("movie-id-1")).toEqual([
        { id: "movie-id-2", title: "Title 2" },
      ]);
      expect(global.localStorage.getItem).toHaveBeenCalledWith("FAVOURITE_MOVIES_KEY");
      expect(global.localStorage.setItem).toHaveBeenCalledWith(
        "FAVOURITE_MOVIES_KEY",
        '[{"id":"movie-id-2","title":"Title 2"}]',
      );
    });

    test("should NOT remove with wrong id", () => {
      Storage.prototype.getItem = jest.fn(
        () => '[{"id": "movie-id-1", "title": "Title 1"},{"id": "movie-id-2", "title": "Title 2"}]',
      );
      Storage.prototype.setItem = jest.fn();
      expect(FavouriteMoviesService.removeFavouriteMovie("movie-id-4")).toEqual([
        { id: "movie-id-1", title: "Title 1" },
        { id: "movie-id-2", title: "Title 2" },
      ]);
      expect(global.localStorage.getItem).toHaveBeenCalledWith("FAVOURITE_MOVIES_KEY");
      expect(global.localStorage.setItem).toHaveBeenCalledWith(
        "FAVOURITE_MOVIES_KEY",
        '[{"id":"movie-id-1","title":"Title 1"},{"id":"movie-id-2","title":"Title 2"}]',
      );
    });

    test("should work with empty array", () => {
      Storage.prototype.getItem = jest.fn(() => null);
      Storage.prototype.setItem = jest.fn();
      expect(FavouriteMoviesService.removeFavouriteMovie("movie-id-4")).toEqual([]);
      expect(global.localStorage.getItem).toHaveBeenCalledWith("FAVOURITE_MOVIES_KEY");
      expect(global.localStorage.setItem).toHaveBeenCalledWith("FAVOURITE_MOVIES_KEY", "[]");
    });
  });
});
