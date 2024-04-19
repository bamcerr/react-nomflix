import styled from "styled-components";
import { Variants, motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion"
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;


function App() {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);
  useMotionValueEvent(scale, 'change', (e) => console.log(e))
  // useEffect(() => {
  //   scaleValue.on('change',() => console.log(scaleValue.get()))
  // })
  
  return (<Wrapper>
    <Box 
      style={{x, scale }} drag="x" dragSnapToOrigin
    >
    </Box>
  </Wrapper>)
}

export default App;
