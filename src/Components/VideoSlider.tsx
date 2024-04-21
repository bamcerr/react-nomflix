import { styled } from "styled-components";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import VideoItem, { IVideoItemProps } from "./VideoItem";
import { useState } from "react";


const Wrapper = styled.div`
`;

const Title = styled.h4`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  color: whitesmoke;
  margin-left: 3vw;
`;
const Slider = styled.div`
  position: relative;
  height: calc(((100vw - 3vw) / 6 - (3px * 5)) * (9/16));
`;


const Row = styled(motion.div)`
  position: absolute;
  display: flex;
  gap: 3px;
  width: calc(100% - 6vw);
  left: 0;
  right: 0;
  margin: auto;
`;

const PrevButton = styled(motion.button)`
  position: absolute;
  font-size: 30px;
  width: 3vw;
  height: 100%;
  border: 0;
  left: 0;
  bottom: 0;
  top: 0;
  box-sizing: border-box;
  padding: 0;
  padding-left: 2px;
`;

const NextButton = styled(PrevButton)`
  left: auto;
  right: 0;
  padding-left: 0;
  padding-right: 2px;
`;

const buttonVariant = {
  initial: {
    backgroundColor: "rgba(255,255,255,0)"
  },
  hover: {
    backgroundColor: "rgba(255,255,255,0.2)"
  }
}

const rowVariants = {
  initial: (direction:EDirection) => {
    return ({
    x: EDirection.next === direction ? '100%' : '-100%',
    opacity: 1
  })},
  animate: {
    x: 0,
    opacity: 1
  },
  exit: (direction:EDirection) => {
    return ({
    x: EDirection.next === direction ? '-100%' : '100%',
    opacity: 1
  })}
}

interface IVideoSliderProps {
  title: string;
  videoItems: IVideoItemProps[]
}

enum EDirection {
  prev,
  next
}

function VideoSlider({ title, videoItems }: IVideoSliderProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<EDirection>();
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const maxIndex = Math.floor(videoItems.length / VideoSlider.offset);
  const minIndex = 0;
  const toPrev = () => {
    if (index === minIndex) return;
    if (leaving) return;
    toggleLeaving();
    setDirection(EDirection.prev);
    setIndex((prev) => (prev - 1));
  }
  const toNext = () => {
    if (index === maxIndex) return;
    if (leaving) return;
    toggleLeaving();
    setDirection(EDirection.next);
    setIndex((prev) => (prev + 1));
  }

  const videos = videoItems.slice(
    VideoSlider.offset * index, 
    VideoSlider.offset * index + VideoSlider.offset
  ) as any[];

  return <Wrapper>
      <Title>{title}</Title>
      <Slider> 
        <AnimatePresence
          initial={false}
          custom={direction}
          onExitComplete={toggleLeaving}
        >
          <Row
            key={index}
            custom={direction}
            variants={rowVariants}
            initial={'initial'}
            animate={'animate'}
            exit={'exit'}
            transition={{ease: "linear", duration: 2}}
          >
          
            {videos?.map((item) => 
              <VideoItem
                {...item}      
                key={item.layoutId}
              />
            )}
            
          </Row>
          
        </AnimatePresence>
        <PrevButton 
          whileHover={"hover"} 
          initial={"initial"} 
          variants={buttonVariant}
          onClick={toPrev}
        >◀︎</PrevButton>
        <NextButton 
          whileHover={"hover"} 
          initial={"initial"} 
          variants={buttonVariant}
          onClick={toNext}
        >▶︎</NextButton>
      </Slider>
    
  </Wrapper>
}

VideoSlider.offset = 6


export default VideoSlider;