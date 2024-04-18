import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";

import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

// input style
// local storage
// delete task
// change board order
//  board state
// create board

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd: OnDragEndResponder = (info) => {
    const {destination, source} = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy
        }
      }));
    }

    if (destination?.droppableId !== source.droppableId) {
      setToDos(allBoards => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        }
      });
    }
  }

  return (
  <DragDropContext onDragEnd={onDragEnd}>
    <Wrapper>
      <Boards>
        {Object.keys(toDos).map((boardId) => (
          <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
        ))}
      </Boards>
    </Wrapper>
  </DragDropContext>)
}

export default App;
