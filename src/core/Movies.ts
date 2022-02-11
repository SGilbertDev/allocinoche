import axios, { AxiosInstance } from "axios";

export default class Movies {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "https://api.themoviedb.org/3/",
      timeout: 1000,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
      },
    });
  }

  fetchUpcomingMovies(page = 1) {
    return this.axiosInstance.get("movie/upcoming/", { params: { page } });
  }

  fetchMovieById(id: number) {
    return this.axiosInstance.get(`movie/${id}`);
  }
}
