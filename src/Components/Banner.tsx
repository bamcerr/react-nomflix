import { styled } from "styled-components";

const Wrapper = styled.div<{$bgPhoto: string}>`
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)), url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
`;


const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

interface IBannerProps {
  path: string;
  title: string;
  overview: string;
}

function Banner({path, title, overview}:IBannerProps) {
  return <>
    <Wrapper $bgPhoto={path}>
      <Title>{title}</Title>
      <Overview>{overview}</Overview>
    </Wrapper>
  </>
}

export default Banner