import { useHistory, useLocation } from "react-router-dom"
import { IMovieList, ITvShowList, getMovieSearch, getTvSearch } from "../api";
import { useQuery } from "@tanstack/react-query";
import { mapMovieDataToProps, mapTvShowDataToProps } from "../utils";
import Spacer from "../Components/Spacer";
import { Wrapper } from "../Components/Layout";
import VideoList from "../Components/VideoList";

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');

  const { data: movieSearchData, isLoading: movieSearchIsLoading } = useQuery({queryKey: ['movie', 'search', keyword], queryFn: () => getMovieSearch(keyword || '')});
  const { data: tvSearchData, isLoading: tvSearchIsLoading } = useQuery({queryKey: ['tv', 'search', keyword], queryFn: () => getTvSearch(keyword || '')});

  const movieSearchState = mapMovieDataToProps(movieSearchData as IMovieList, {onClickItem: () => {}});
  const tvSearchState = mapTvShowDataToProps(tvSearchData as ITvShowList, {onClickItem: () => {}});

  return <>
    <Wrapper>
      {!movieSearchIsLoading && <>
        <VideoList
          title={'Movie'}
          videoItems={movieSearchState}
        />
        
        <Spacer />
      </>}

      {!tvSearchIsLoading && <>
        <VideoList
          title={'TvShow'}
          videoItems={tvSearchState}
        />

        <Spacer />
      </>}
    </Wrapper>
  </>
}

export default Search