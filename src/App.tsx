import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
  div:first-child,
  div:last-child {
    grid-column: span 1;
  }
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, .45);
  border-radius: 3px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0,0,0,0)"},
  visible: { backgroundColor: "rgba(0,0,0,0.5)"},
  exit: { backgroundColor: "rgba(0,0,0,0)"},
}

const Circle = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  box-shadow: rgba(0,0,0,0.02);
`;

const Button = styled(motion.button)`
  position: absolute;
  top: 80vh;
  border: 1px solid #eee;
  background-color: white;
  padding: 8px;
  border-radius: 3px;
  font-size: 18px;
`;


const box = {
  initial:(position:string) =>  {
    switch (position) {
      case "1": 
        return {scale: 1, originX: 1, originY: 1}
      case "2":
        return {scale: 1, originX: 0, originY: 1}
      case "3":
        return {scale: 1, originX: 1, originY: 0}
      case "4":
        return {scale: 1, originX: 0, originY: 0}
    }
    return {scale: 1, originX: 1, originY: 1}
  },
  hover: (position:string) => {
    switch (position) {
      case "1": 
        return {scale: 1.2, originX: 1, originY: 1}
      case "2":
        return {scale: 1.2, originX: 0, originY: 1}
      case "3":
        return {scale: 1.2, originX: 1, originY: 0}
      case "4":
        return {scale: 1.2, originX: 0, originY: 0}
    }
    return {scale: 1.2, originX: 1, originY: 1}
  },
  tapped: {
    scale: 1
  },
  overlay: {
    backgroundColor: 'white',
    width: '200px', 
    height: '200px',
    scale: 1,
  }
}

const button = {
  initial: {
    color: 'red',
    scale: 1
  },
  tap: {
    color: 'blue',
    scale: 1.2
  }
}


function App() {
  const [id, setId] = useState<null | string>(null);
  const [switching, setSwitching] = useState(false);

  return (<Wrapper>
    <Grid>
      {['1', '2', '3', '4'].map(n => (
        <Box 
          custom={n}
          variants={box}
          initial={"initial"}
          whileHover={'hover'}
          onClick={() => setId(n)}
          key={n} 
          layoutId={n}
        >
          { (n == "2" && !switching || n == "3" && switching) 
          ? <Circle layoutId="circle" />
          : null}

        </Box>)
      )}
    </Grid>
    {id ? (
      <AnimatePresence>
          <Overlay 
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box layoutId={id} style={{scale: 1, width: '300px', height: '200px', backgroundColor: 'white'}} />
          </Overlay>
      </AnimatePresence>
    ) : null}

    <Button 
      variants={button}
      initial="initial"
      whileTap={"tap"}
      onClick={() => setSwitching(prev => !prev)}
    >Switch</Button>
  </Wrapper>)
}

export default App;
