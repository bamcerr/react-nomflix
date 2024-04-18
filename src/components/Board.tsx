import { Droppable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import DragableCard from "./DragableCard";
import { useRef } from "react";
import { ITodo } from "../atoms";
import { useForm } from "react-hook-form";


const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
  $isDraggingFromThis: boolean;
  $isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) => 
    props.$isDraggingOver 
    ? "#dfe6e9"
    : props.$isDraggingFromThis 
    ? "#b2bec3"
    : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({toDos, boardId}: IBoardProps) {
  const {register, setValue, handleSubmit} = useForm<IForm>();
  const onValid = ({toDo}:IForm) => {
    setValue("toDo", "");
  }

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input 
        {...register('toDo', {required: true})} 
        placeholder={`Add Task on ${boardId}`} 
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area 
          $isDraggingOver={info.isDraggingOver}
          $isDraggingFromThis={Boolean(info.draggingFromThisWith)}
          ref={magic.innerRef} 
          {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragableCard 
              key={toDo.id} 
              index={index} 
              toDoId={toDo.text} 
              toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  )
}

export default Board;