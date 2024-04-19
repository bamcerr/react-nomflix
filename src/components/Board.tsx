import { Draggable, Droppable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import DragableCard from "./DragableCard";
import { ITodo, toDoState } from "../atoms";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { EDrappableType } from "../App";


const Wrapper = styled.div`
margin: 0 5px;
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
  flex-grow: 0;
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
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  input {
    font-size: 16px;
    border: 0;
    background-color: white;
    width: 80%;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    margin: 0 auto;
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
  index: number;
  title: string;
}

interface IForm {
  toDo: string;
}

function Board({toDos, boardId, index, title}: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const {register, setValue, handleSubmit} = useForm<IForm>();
  const onValid = ({toDo}:IForm) => {
    setToDos((toDos) => {
      const index = toDos.filter(item => item.boardId === boardId).length;
      return [
        ...toDos,
        {
          id: crypto.randomUUID(),
          text: toDo,
          boardId,
          index
        }
      ]
    })
    setValue("toDo", "");
  }

  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided, snapshot) => (
        <Wrapper 
          ref={provided.innerRef} 
          {...provided.draggableProps}
        >
          <Title {...provided.dragHandleProps}>{title}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input 
            {...register('toDo', {required: true})} 
            placeholder={`Add Task on '${title}'`} 
            />
          </Form>
          <Droppable droppableId={boardId} type={EDrappableType.withCd}>
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
                    toDoId={String(toDo.id)} 
                    toDoText={toDo.text}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  )
}

export default Board;