import { useQuery } from "@tanstack/react-query"
import { getMovieNowPlayingList, getMovieLatestList, getMoviceTopRated, getMovieUpcomingList, IMovie } from "../api"
import { IMovieList } from "../api";

export function useHomeQuery() {
  return [
    useQuery<IMovie>({queryKey: ['movies','latest'], queryFn: getMovieLatestList}),
    useQuery<IMovieList>({queryKey: ['movies','nowPlaying'], queryFn: getMovieNowPlayingList}),
    useQuery<IMovieList>({queryKey: ['movies','topRated'], queryFn: getMoviceTopRated}),
    useQuery<IMovieList>({queryKey: ['movies','upcoming'], queryFn: getMovieUpcomingList}),
  ]
}