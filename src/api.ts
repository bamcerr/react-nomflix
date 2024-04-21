const API_KEY = "f9c83b2d476960508972c715e8997ba7"
const BASE_PATH = "https://api.themoviedb.org/3"

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  genres: {id: number, name: string}[];
  runtime: number;

}

export interface IMovieList {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovieNowPlayingList() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then((response) => response.json())
}

export function getMoviceTopRated() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then((response) => response.json())
}
export function getMovieLatestList() {
  return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`).then(response => response.json())
}

export function getMovieUpcomingList() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(response => response.json())
}

export function getMovieSearch(keyword:string) {
  return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`).then(response => response.json())
}

export function getMovieDetails(movie_id:string) {
  return fetch(`${BASE_PATH}/movie/${movie_id}?api_key=${API_KEY}`).then(response => response.json())
}


export interface ITvShow {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
  first_air_date: string;
  genres: {id: number, name: string}[];
  episode_run_time: number[];
}

export interface ITvShowList {
  page: number;
  results: ITvShow[];
  total_pages: number;
  total_results: number;
}

export function getTvLatestList() {
  return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}`).then(response => response.json())
}

export function getTvAiringList() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(response => response.json())
}

export function getTvPopularList() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then(response => response.json())
}

export function getTvTopRatedList() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(response => response.json())
}

export function getTvSearch(keyword:string) {
  return fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`).then(response => response.json())
}

export function getTvDetails(series_id:string) {
  return fetch(`${BASE_PATH}/tv/${series_id}?api_key=${API_KEY}`).then(response => response.json())
}