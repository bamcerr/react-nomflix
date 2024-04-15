import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import { useForm } from "react-hook-form";

enum EForm {
  empty = "",
  toDo = "toDo"
}
interface IForm {
  toDo: EForm;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const {register, handleSubmit, setValue} = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos(prev => [
      {text: toDo, id: Date.now(), category},
      ...prev
    ]);
    setValue(EForm.toDo, EForm.empty);
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input 
        {...register(EForm.toDo, {required: "Please write a To Do"})} 
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  )
}

export default CreateToDo;