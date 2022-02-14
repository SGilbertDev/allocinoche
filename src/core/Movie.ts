import moment from "moment";

export default class Movie implements MovieInterface {
  readonly adult: boolean;
  readonly backdrop_path: string;
  readonly genre_ids?: number[];
  readonly genres?: { id: number; name: string }[];
  readonly homepage?: string;
  readonly id: number;
  readonly original_language: string;
  readonly original_title: string;
  readonly overview: string;
  readonly popularity: number;
  readonly poster_path: string;
  readonly release_date: moment.Moment;
  readonly title: string;
  readonly video: boolean;
  readonly vote_average: number;
  readonly vote_count: number;

  constructor(data: MovieInterface) {
    const {
      id,
      adult,
      backdrop_path,
      genre_ids,
      original_language,
      original_title,
      overview,
      homepage,
      popularity,
      poster_path,
      release_date,
      title,
      video,
      vote_average,
      vote_count,
      genres,
    } = data || {};
    this.id = id;
    this.adult = adult;
    this.backdrop_path = backdrop_path;
    this.genre_ids = genre_ids;
    this.genres = genres;
    this.original_language = original_language;
    this.original_title = original_title;
    this.overview = overview;
    this.popularity = popularity;
    this.poster_path = poster_path;
    this.release_date = moment(release_date);
    this.title = title;
    this.video = video;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.homepage = homepage;
  }

  static toggleFavorite(
    isFavorite: boolean,
    favorites: number[],
    movieId: number
  ) {
    return isFavorite
      ? favorites.filter((id: number) => id !== movieId)
      : [...favorites, movieId];
  }

  isReleased() {
    return Math.sign(moment().diff(this.release_date)) === 1;
  }

  isFavorite(favorites: number[]) {
    return favorites.includes(this.id);
  }

  getReleaseDateFromNow() {
    return `${
      this.isReleased() ? "Released" : "To be released"
    } ${this.release_date.fromNow()}`;
  }

  getImageLink(path: string, width?: number) {
    const validWidth = [200, 300, 400, 1280];
    return `https://image.tmdb.org/t/p/${
      width && validWidth.includes(width) ? "w" + width : "original"
    }${path}`;
  }

  getMoviePoster(width?: number) {
    return this.getImageLink(this.poster_path, width);
  }

  getMovieBackdrop(width?: number) {
    return this.getImageLink(this.backdrop_path, width);
  }

  getTruncatedOverview(limit: number = 200) {
    return this.overview?.length > limit
      ? `${this.overview.substring(0, limit)}...`
      : this.overview || '';
  }
}
