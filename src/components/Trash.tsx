import { Droppable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import { EDrappableType } from "../App";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 80px;
  height: 80px;
  margin: auto;
  font-size: 50px;
  display: flex;
  align-content: center;
  justify-content: center;
`;

function Trash() {

  return <>
    <Droppable droppableId="trash" type={EDrappableType.withCd}>
      {(provided) => (<Wrapper ref={provided.innerRef}>
        🗑️
      </Wrapper>)}
    </Droppable>
  </>
}

export default Trash;