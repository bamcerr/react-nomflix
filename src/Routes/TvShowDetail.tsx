import { useLocation, useRouteMatch } from "react-router-dom";
import { IVideoItemState } from "../Components/VideoItem";
import { useQuery } from "@tanstack/react-query";
import VideoModal, { IVideoModalAction } from "../Components/VideoModal";
import { ITvShow, getTvDetails } from "../api";

interface ITvShowDetailProps extends IVideoModalAction {}

function TvShowDetail({onClickOveray}:ITvShowDetailProps) {
  const matchedRoute = useRouteMatch<{id: string}>("/tvshow/:id");
  const { state } = useLocation<IVideoItemState>();
  const {data} = useQuery<ITvShow>({
    queryKey: ['tv', 'detail', matchedRoute?.params.id],
    queryFn: () => getTvDetails(matchedRoute?.params.id || '')
  })

  // mapping data to state

  return <>
    <VideoModal 
      onClickOveray={onClickOveray} 
      layoutId={state?.layoutId || ''}
      title={state?.title || ''} 
      overview={state?.overview || ''} 
      path={state?.path || ''}
      date={data?.first_air_date || ''}
      time={''}
      isShow={!!matchedRoute?.params.id}
      genres={data?.genres?.map(item => item.name) || []}
    ></VideoModal>
  </>
}

export default TvShowDetail