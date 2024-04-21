import styled from "styled-components"
import VideoItem, { IVideoItemProps } from "./VideoItem";


const Wrapper = styled.div`
  display: grid;
  margin: 0 3vw;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
`;

const Title = styled.h4`
  font-size: 16px;
  color: ${props => props.theme.white.darker};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IVidoeListProps {
  title?: string;
  videoItems: IVideoItemProps[]
}

function VideoList({title, videoItems}:IVidoeListProps) {
  return <>
    <Wrapper>
      <Title>{title}</Title>
      {videoItems?.map((video) => 
        <VideoItem
          {...video}      
          key={video.layoutId}
        />
      )}
    </Wrapper>
  </>
}

export default VideoList