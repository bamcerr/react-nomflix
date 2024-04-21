import { makeImagePath, mapMovieDataToProps } from "../utils";
import { useHistory } from "react-router-dom";
import { useHomeQuery } from "../Hooks/useMultipleQuery";
import { IMovie, IMovieList } from "../api";
import VideoSlider from "../Components/VideoSlider";
import MovieDetailModal from "../Components/VideoModal";
import Spacer from "../Components/Spacer";
import Banner from "../Components/Banner";
import { ContentWrapper, Wrapper } from "../Components/Layout";
import { Loader } from "../Components/Loader";
import { IVideoItemState } from "../Components/VideoItem";
import { useState } from "react";
import MovieDetail from "./MovieDetail";

function Home() {
  const history = useHistory();

  const [
    {data: movieLatestData, isLoading: latestIsLoading}, 
    {data: movieNowPlayingData, isLoading: nowPlayingIsLoading}, 
    {data: movieTopRatedData, isLoading: topRatedIsLoading}, 
    {data: movieUpcomingData, isLoading: upcomingIsLoading}
  ] = useHomeQuery();

  const onOverlayClick = () => {
    history.push('/');
  }
  const onClickVideoItem = (id:string, state:IVideoItemState) => {
    history.push({pathname:`/movies/${id}`, state});

  };

  const movieLatest = movieLatestData as IMovie | undefined;
  const movieNowPlayingList = mapMovieDataToProps(movieNowPlayingData as IMovieList, {onClickItem: onClickVideoItem}),
        movieTopaRateList = mapMovieDataToProps(movieTopRatedData as IMovieList, {onClickItem: onClickVideoItem}),
        movieUpcomingList =  mapMovieDataToProps(movieUpcomingData as IMovieList, {onClickItem: onClickVideoItem});

  return(
    <Wrapper>
      {latestIsLoading 
        ? <Loader>Loading...</Loader> 
        : <>
        
          <Banner 
            path={makeImagePath((movieLatest?.backdrop_path || movieLatest?.poster_path) ?? '')} 
            title={movieLatest?.title ?? ''} 
            overview={movieLatest?.overview ?? ''}
          />

          <ContentWrapper>
            {!nowPlayingIsLoading && <>
              <VideoSlider
                title={'Now Playing'}
                videoItems={movieNowPlayingList}
              />
              <Spacer />
            </>}

            {!topRatedIsLoading && <>
              <VideoSlider
                title={'Top Rated'}
                videoItems={movieTopaRateList}
              />
              <Spacer />
            </>}

            {!upcomingIsLoading && <>
              <VideoSlider
                title={'Upcoming'}
                videoItems={movieUpcomingList}
              />
            </>}
          </ContentWrapper>

          <MovieDetail 
            onClickOveray={onOverlayClick}            
          />
        </>
      }
    </Wrapper>
  )
}

export default Home