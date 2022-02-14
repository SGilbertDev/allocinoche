import movieData from "./__data__/movie.json";
import Movie from "../../core/Movie";

const movieInstance = new Movie(movieData);

it("should return an instance of Movie", () => {
  expect(movieInstance).toBeInstanceOf(Movie);
});

describe("methods", () => {
  describe("static toggleFavorite()", () => {
    it("should return an array with the movie id added", () => {
      const favorites = [123456, 654321];
      expect(Movie.toggleFavorite(false, favorites, 414906)).toEqual([
        123456, 654321, 414906,
      ]);
    });
    it("should return an array with the movie id removed", () => {
      const favorites = [123456, 654321, 414906];
      expect(Movie.toggleFavorite(true, favorites, 414906)).toEqual([
        123456, 654321,
      ]);
    });
  });
  describe("isReleased()", () => {
    it("should return true value when movie release_date is from the past", () => {
      expect(movieInstance.isReleased()).toEqual(true);
    });
  });
  describe("isFavorite(favorites)", () => {
    it("should return true when the movie is a favorite", () => {
      expect(movieInstance.isFavorite([123456, 654321, 414906])).toEqual(true);
    });
    it("should return false when the movie isnt a favorite", () => {
      expect(movieInstance.isFavorite([123456, 654321])).toEqual(false);
    });
  });
  describe("getReleaseDateFromNow()", () => {
    it("should return a string containing keyword 'Released' for released movies", () => {
      expect(movieInstance.getReleaseDateFromNow()).toMatch(/(Released)/i);
    });
    it("should return a string containing keyword 'To be released' for future movies", () => {
      const futureMovieInstance = new Movie({
        ...movieData,
        release_date: "2050-01-01",
      });
      expect(futureMovieInstance.getReleaseDateFromNow()).toMatch(
        /(To be released)/i
      );
    });
  });
  describe("getImageLink(path, width)", () => {
    it("should return original poster link when theres no width passed", () => {
      expect(movieInstance.getImageLink(movieInstance.poster_path)).toEqual(
        "https://image.tmdb.org/t/p/original/3VFI3zbuNhXzx7dIbYdmvBLekyB.jpg"
      );
    });
    it("should return original poster link when theres an invalid width passed", () => {
      expect(
        movieInstance.getImageLink(movieInstance.poster_path, 453)
      ).toEqual(
        "https://image.tmdb.org/t/p/original/3VFI3zbuNhXzx7dIbYdmvBLekyB.jpg"
      );
    });
    it("should return poster with image size when there is a valid width passed", () => {
      expect(
        movieInstance.getImageLink(movieInstance.poster_path, 200)
      ).toEqual(
        "https://image.tmdb.org/t/p/w200/3VFI3zbuNhXzx7dIbYdmvBLekyB.jpg"
      );
    });
  });
  describe("getMoviePoster(width)", () => {
    it("should return poster path", () => {
      expect(movieInstance.getMoviePoster(400)).toEqual(
        "https://image.tmdb.org/t/p/w400/3VFI3zbuNhXzx7dIbYdmvBLekyB.jpg"
      );
    });
  });
  describe("getMovieBackdrop(width)", () => {
    it("should return backdrop path", () => {
      expect(movieInstance.getMovieBackdrop(400)).toEqual(
        "https://image.tmdb.org/t/p/w400/rvtdN5XkWAfGX6xDuPL6yYS2seK.jpg"
      );
    });
  });
  describe("getTruncatedOverview(limit)", () => {
    it("should return an empty string if overview is undefined", () => {
      const movieNoOverviewInstance = new Movie({
        ...movieData,
        overview: undefined,
      });
      expect(movieNoOverviewInstance.getTruncatedOverview(1000)).toEqual("");
    });
    it("should return original overview text when under the limit", () => {
      expect(movieInstance.getTruncatedOverview(1000)).toEqual(
        movieInstance.overview
      );
    });
    it("should return truncated overview text when over the limit", () => {
      expect(movieInstance.getTruncatedOverview(20)).toEqual(
        "In his second year o..."
      );
    });
  });
});
