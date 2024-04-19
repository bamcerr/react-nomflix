import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import styled from "styled-components";
import { boardState, boardsSortedByIndexState, toDoState, toDosByBoardState } from "./atoms";
import Board from "./components/Board";
import Trash from "./components/Trash";
import CreateBoard from "./CreateBoard";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 100px auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export enum EDrappableType {
  withBd = "withBd",
  withCd = "withCd"
}

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const setBoards = useSetRecoilState(boardState);
  const boards = useRecoilValue(boardsSortedByIndexState)
  const toDosByBoard = useRecoilValue(toDosByBoardState);
  const onDragEnd: OnDragEndResponder = (info) => {
    const {destination, source, type} = info;
    if (!destination) return;

    if (type === EDrappableType.withBd) {
      setBoards(boards => {
        const array = [...boards];
        const sourceTargetIndex = array.findIndex(item => item.index === source.index);
        const destinationTargetIndex = array.findIndex(item => item.index === destination.index);

        array[sourceTargetIndex] = {
          ...array[sourceTargetIndex],
          index: destination.index
        }
        array[destinationTargetIndex] = {
          ...array[destinationTargetIndex],
          index: source.index
        }
        return array
      });
      return;
    }
    
    if(type === EDrappableType.withCd) {
      if (destination?.droppableId === "trash") {
        setToDos((toDos) => {
          const array = [...toDos];
          let sourceArray = array.filter(item => item.boardId === source.droppableId);
          const extraArray = array.filter(item => item.boardId !== source.droppableId && item.boardId !== destination.droppableId);

          const sourceTargetIndex = sourceArray.findIndex(item => item.index === source.index);
          sourceArray.splice(sourceTargetIndex, 1);
          sourceArray.sort((a, b) => a.index - b.index)
          sourceArray = sourceArray.map((item, index) => ({...item, index}));

          return [
            ...extraArray,
            ...sourceArray
          ];
        })
        return;
      }
  
      if (destination?.droppableId === source.droppableId) {
        setToDos((toDos) => {
          const array = [...toDos];
          const sourceTargetIndex = array.findIndex(item => item.index === source.index && item.boardId === source.droppableId);
          const destinationTargetIndex = array.findIndex(item => item.index === destination.index && item.boardId === destination.droppableId);
          array[sourceTargetIndex] = {
            ...array[sourceTargetIndex],
            index: destination.index
          }
          array[destinationTargetIndex] = {
            ...array[destinationTargetIndex],
            index: source.index
          }
          return array
        })
      }
  
      if (destination?.droppableId !== source.droppableId) {
        setToDos(toDos => {
          const array = [...toDos];

          let sourceArray = array.filter(item => item.boardId === source.droppableId);
          let destinationArray = array.filter(item => item.boardId === destination.droppableId);
          const extraArray = array.filter(item => item.boardId !== source.droppableId && item.boardId !== destination.droppableId);


          const sourceTargetIndex = sourceArray.findIndex(item => item.index === source.index);
          sourceArray.sort((a, b) => a.index - b.index);
          const target = sourceArray.splice(sourceTargetIndex, 1);
          sourceArray = sourceArray.map((item, index) => ({...item, index}));
          

          const destinationTargetIndex = destinationArray.findIndex(item => item.index === destination.index);
          destinationArray.sort((a, b) => a.index - b.index);
          destinationArray.splice(destinationTargetIndex, 0, {...target[0], boardId: destination.droppableId});
          destinationArray = destinationArray.map((item, index) => ({...item, index}));


          return [
            ...extraArray,
            ...sourceArray,
            ...destinationArray
          ]
        })
        return;
      }
    }
  }

  return (
  <DragDropContext onDragEnd={onDragEnd}>
    <CreateBoard />
    <Trash />
    <Wrapper>
      <Droppable droppableId={"boards"} type={EDrappableType.withBd} direction="horizontal">
        {(provided, snapshot) => (
          <Boards ref={provided.innerRef}>
            {boards.map(({id: boardId, title:boardTitle}, index) => (
              <Board 
                key={boardId} 
                index={index}
                boardId={boardId}
                title={boardTitle}
                toDos={toDosByBoard[boardId]}
              />
            ))}
            {provided.placeholder}
          </Boards>
        )}
      </Droppable>
    </Wrapper>
  </DragDropContext>)
}

export default App;
