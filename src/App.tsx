import styled from "styled-components";
import { AnimatePresence, Variants, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;


const boxVariants = {
  initial: {
    x: 500,
    opacity: 0,
    scale: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    // rotateZ: 360
  },
  leaving: {
    opacity: 0,
    scale: 0,
    y: 50,
    transition: {
      duration: 1,
    }
  },
  exit: {x: -500, opacity: 0, scale: 0, transition: { duration: 1}}
}


function App() {
  const [visible, setVisible] = useState(1);
  const nextPlease = () => setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  const prevPlease = () => setVisible((prev) => (prev === 1 ? 1 : prev - 1));

  return (<Wrapper>
      <AnimatePresence>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
            i === visible ?   (<Box 
              variants={boxVariants}
              initial="initial"
              animate="visible"
              exit="exit"
              key={i}
            >{i}</Box>) : null)
        }

        
      </AnimatePresence>
      <button onClick={nextPlease}>next</button>
      <button onClick={prevPlease}>prev</button>
  </Wrapper>)
}

export default App;
