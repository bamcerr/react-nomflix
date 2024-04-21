import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useState } from "react";
import { styled } from "styled-components";


const Wrapper = styled(motion.div)<{$bgPhoto: string}>`
  position: relative;
  background-color: ${(props) => props.theme.black.darker};
  background-image: url(${props => props.$bgPhoto});
  background-size: cover;
  background-position: center;
  aspect-ratio: 16 / 9;
  font-size: 66px;
  height: calc(((100vw - 3vw) / 6 - (3px * 5)) * (9/16));

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  opacity: 0;
  /* background-color: ${(props) => props.theme.black.lighter}; */
  background: linear-gradient(-170deg, rgba(0,0,0,0) 80%, rgba(0,0,0,0.4)), linear-gradient(-170deg, rgba(0,0,0,0) 54%, rgba(0,0,0,0.4)), linear-gradient(-180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2));
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    font-size: 14px;
  }
`;

const infoVariants = {
  initial: {
    opacity: 0.6,
    background: 'linear-gradient(-170deg, rgba(0,0,0,0) 80%, rgba(0,0,0,0.4)), linear-gradient(-170deg, rgba(0,0,0,0) 54%, rgba(0,0,0,0.4)), linear-gradient(-180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2))'
  },
  hover: {
    opacity: 1,
    background: 'linear-gradient(-170deg, rgba(0,0,0,0) 80%, rgba(0,0,0,0.4)), linear-gradient(-170deg, rgba(0,0,0,0) 54%, rgba(0,0,0,0.4)), linear-gradient(-180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8))',
    transition: {
      delay: 0.2,
      duration: 0.3,
      type: "tween"
    }
  }
}

const boxVariants = {
  normal: {
    scale: 1,
    zIndex: 1,
  },
  scaleUp: {
    scale: 1.3,
    zIndex: 3,
    transition: {
      delay: 0.25,
      duration: 0.25,
      type: "tween"
    },
  },
  scaleDown: {
    scale: 1,
    transition: {
      duration: 0.25,
      type: "tween"
    },
    transitionEnd: {
      zIndex: 1
    },
  }
}

export interface IVideoItemAction {
  onClickItem: (id:string, state: IVideoItemState) => void;
}
export interface IVideoItemState {
  id: string;
  layoutId: string;
  path: string;
  title: string;
  overview: string;
}
export interface IVideoItemProps extends IVideoItemAction, IVideoItemState {}
 
function VideoItem({layoutId, id, title, path, overview, onClickItem}: IVideoItemProps) {
  const [isHover, setIsHover] = useState(false);
  const [, setState] = useState(false);
  
  return <>
    <AnimatePresence initial={true}>
      <Wrapper 
        layoutId={layoutId}
        $bgPhoto={path}
        variants={boxVariants} 
        animate={isHover ? 'scaleUp' : 'scaleDown'}
        onHoverStart={() => setIsHover(true)} 
        onHoverEnd={() => setIsHover(false)}
        style={{zIndex: 1}}
        onClick={() => {
          setState(prev => !prev)
          onClickItem(id, {layoutId, id, path, title, overview})
        }}
      >
        <Info 
          variants={infoVariants} 
          animate={isHover ? "hover" : 'initial' } 
          initial="initial"
        >
          <h4>{title}</h4>
        </Info>
      </Wrapper>
    </AnimatePresence>
    </>
}

export default VideoItem