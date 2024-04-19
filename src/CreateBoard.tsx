import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { boardState } from "./atoms";
import styled from "styled-components";


const Input = styled.input`
  width: 200px;
  height: 40px;
  margin: 10px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
`;


interface IForm {
  boardName: string;
}

function CreateBoard() {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setBoard = useSetRecoilState(boardState);
  const onValid = (data:IForm) => {
    setBoard(boards => {
      return [
        ...boards,
        { id: crypto.randomUUID(), title: data.boardName, index: boards.length}
      ]
    })

    setValue("boardName", '');
  }

  return <div>
    <form onSubmit={handleSubmit(onValid)}>
      <Input 
        type="text"
        {...register('boardName', {required: true})}
        placeholder={`Add Board`}
      />
    </form>
  </div>
}


export default CreateBoard;