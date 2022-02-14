import movieData from "./__data__/movie.json";
import Movie from "../../core/Movie";

const movie = new Movie(movieData);

it("should return an instance of Movie", () => {
  expect(movie).toBeInstanceOf(Movie);
});

describe("methods", () => {
  describe("getReleaseDateFromNow()", () => {
    it("should return ", () => {
      expect(movie.getReleaseDateFromNow()).toEqual('8 days ago')
    })
  })
});
