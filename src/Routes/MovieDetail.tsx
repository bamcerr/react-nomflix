import { useLocation, useRouteMatch } from "react-router-dom";
import { IVideoItemState } from "../Components/VideoItem";
import { useQuery } from "@tanstack/react-query";
import VideoModal, { IVideoModalAction } from "../Components/VideoModal";
import { IMovie, getMovieDetails } from "../api";
import { makeImagePath } from "../utils";

interface IMovieDetailProps extends IVideoModalAction {}

function MovieDetail({onClickOveray}: IMovieDetailProps) {
  const matchedRoute = useRouteMatch<{id: string}>("/movies/:id");
  const { state } = useLocation<IVideoItemState>();
  const {data} = useQuery<IMovie>({
    queryKey: ['movie', 'detail', matchedRoute?.params.id],
    queryFn: () => getMovieDetails(matchedRoute?.params.id || '')
  })

  // mapping data to state
  
  return <>
    <VideoModal 
      onClickOveray={onClickOveray} 
      layoutId={state?.layoutId || ''}
      title={state?.title || ''} 
      overview={state?.overview || ''} 
      path={state?.path || ''}
      date={data?.release_date || ''}
      time={data?.runtime ? data?.runtime+"m" : ''}
      isShow={!!matchedRoute?.params.id}
      genres={data?.genres?.map(item => item.name) || []}
    ></VideoModal>
  </>
}

export default MovieDetail