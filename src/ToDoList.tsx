import {useForm} from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: []
})

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const {register, handleSubmit, setValue} = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos(prev => [
      {text: toDo, id: Date.now(), category: "TO_DO"},
      ...prev
    ]);
    setValue("toDo", "");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <input 
          {...register("toDo", {required: "Please write a To Do"})} 
          placeholder="Write a to do"
        />
        <button>Add</button>
        <ul>
          {toDos.map(toDo => (
            <li key={toDo.id}>{toDo.text}</li>
          ))}
        </ul>
      </form>
    </div>
  )
}

export default ToDoList