import { useQuery } from "@tanstack/react-query"
import { ITvShow, ITvShowList, getTvAiringList, getTvLatestList, getTvPopularList, getTvTopRatedList } from "../api"
import { makeImagePath, mapTvShowDataToProps } from "../utils";
import VideoSlider from "../Components/VideoSlider";
import Spacer from "../Components/Spacer";
import { ContentWrapper, Wrapper } from "../Components/Layout";
import { Loader } from "../Components/Loader";
import Banner from "../Components/Banner";
import VideoDetailModal from "../Components/VideoModal";
import { useHistory } from "react-router-dom";
import { IVideoItemState } from "../Components/VideoItem";
import TvShowDetail from "./TvShowDetail";

function TvShow() {
  const history = useHistory();

  const {data:tvLatestData, isLoading: tvLatestIsLoading} = useQuery<ITvShow>({queryKey:['tv', 'latest'], queryFn: getTvLatestList});
  const {data:tvAiringListData, isLoading: tvAiringIsLoading} = useQuery<ITvShowList>({queryKey:['tv', 'airingToday'], queryFn: getTvAiringList});
  const {data:tvPopularListData, isLoading: tvPopularIsLoading} = useQuery<ITvShowList>({queryKey:['tv', 'popular'], queryFn: getTvPopularList});
  const {data:tvTopRatedListData, isLoading: tvTopRatedIsLoading} = useQuery<ITvShowList>({queryKey:['tv', 'topRated'], queryFn: getTvTopRatedList});

  const onOverlayClick = () => history.push('/tvshow');
  const onClickVideoItem = (id:string, state:IVideoItemState) => {
    history.push({pathname:`/tvshow/${id}`, state});
  };
  
  const tvShowLatestState = tvLatestData as ITvShow | undefined;  
  const tvShowsAiringState = mapTvShowDataToProps(tvAiringListData as ITvShowList, {onClickItem: onClickVideoItem}),
        tvShowsPopularState =  mapTvShowDataToProps(tvPopularListData as ITvShowList, {onClickItem: onClickVideoItem}),
        tvShowsTopRatedState =  mapTvShowDataToProps(tvTopRatedListData as ITvShowList, {onClickItem: onClickVideoItem})

  return <>
    <Wrapper>
    {tvLatestIsLoading 
        ? <Loader>Loading...</Loader> 
        : <>
          <Banner 
            path={makeImagePath((tvShowLatestState?.backdrop_path || tvShowLatestState?.poster_path) ?? '')} 
            title={tvShowLatestState?.name ?? ''} 
            overview={tvShowLatestState?.overview ?? ''}
          />
        
          <ContentWrapper>
            {!tvAiringIsLoading && <>
              <VideoSlider
                title={'Airing'}
                videoItems={tvShowsAiringState}
              />

              <Spacer />
            </>}

            {!tvPopularIsLoading && <>
              <VideoSlider
                title={'Popular'}
                videoItems={tvShowsPopularState}
              />

              <Spacer />
            </>}

            {!tvTopRatedIsLoading && <>
              <VideoSlider
                title={'Top Rated'}
                videoItems={tvShowsTopRatedState}
              />

              <Spacer />
            </>}
          </ContentWrapper>

          <TvShowDetail
            onClickOveray={onOverlayClick}            
          />
        </>
    }
    </Wrapper>
  </>
}

export default TvShow