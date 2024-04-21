import { AnimatePresence, motion } from "framer-motion";
import { styled } from "styled-components";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 1000;
`;

const VideoModalWrapper = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;

  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  margin: auto;
  border-radius: 7px;
  overflow-x: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 2000;
`;

const Cover = styled.div<{$bgPhoto:string}>`
  width: 100%;
  background-size: cover;
  background-position: center center;
  background-image: ${props => `linear-gradient(to top, ${props.theme.black.lighter} 0%, transparent 30%)`}, url(${props => props.$bgPhoto});
  height: 400px;
  
`;

const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
`;


const List = styled.ul`
  padding: 0 20px;
`;
const Item = styled.span`
  font-size: 16px;
  font-weight: 400;
  margin-right: 8px;
`;

const Overview = styled.p`
  padding: 40px 20px;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
  font-size: 22px;
  font-weight: 300;
`;


export interface IVideoModalAction {
  onClickOveray: () => void;
}

export interface IVideoModalState {
  layoutId: string;
  title: string;
  overview: string;
  path: string;
  isShow: boolean;
  date: string;
  time: string;
  genres: string[];
}

export interface IVideoModalProps extends IVideoModalState, IVideoModalAction {}

function VideoModal({
  onClickOveray,
  layoutId,
  isShow,
  title,
  overview,
  path,
  date,
  time,
  genres
}: IVideoModalProps) {
  // const matchedRoute = useRouteMatch<{id: string}>("/movies/:id");
  // const matchedRoute2 = useRouteMatch<{id: string}>("/tvshow/:id");
  // const { state } = useLocation<IVideoItemState>();

  return <>
    <AnimatePresence>
      {isShow ? <>
        <Overlay 
          onClick={onClickOveray}
          exit={{ opacity: 0}}
          animate={{ opacity: 1}}
        />
        <VideoModalWrapper
          layoutId={layoutId}
        > 
          <Cover 
            $bgPhoto={path}
          />
          <Title>{title}</Title>

          <List>
            {date && <Item>{date}</Item>}
            {time && <Item>{time}</Item>}
            {genres.map((item, index)=> <Item key={index}>{item}</Item>)}

          </List>

          <Overview>{overview}</Overview>
        </VideoModalWrapper>
      </> : null}
    </AnimatePresence>
  </>;
}

export default VideoModal;