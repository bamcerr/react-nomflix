import { IVideoItemProps, IVideoItemAction } from "./Components/VideoItem"
import { IMovieList, ITvShowList } from "./api"

export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`
}


export function mapMovieDataToProps(data:IMovieList, action: IVideoItemAction):IVideoItemProps[] {
  return data?.results.map(item => ({
    id: String(item.id),
    layoutId: `${item.id}_${crypto.randomUUID()}`,
    path: makeImagePath(item.backdrop_path, 'w500'),
    title: item.title,
    overview: item.overview,
    onClickItem: action.onClickItem
  }))
}

export function mapTvShowDataToProps(data:ITvShowList, action: IVideoItemAction):IVideoItemProps[] {
  return data?.results.map(item => ({
    id: String(item.id),
    layoutId: `${item.id}_${crypto.randomUUID()}`,
    path: makeImagePath(item.backdrop_path, 'w500'),
    title: item.name,
    overview: item.overview,
    onClickItem: action.onClickItem
  }))
}