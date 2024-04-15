import { useRecoilValue } from "recoil";
import { toDoState } from "./atoms";
import CreateToDo from "./components/CreateToDo";
import ToDo from "./ToDo";



function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <CreateToDo />
      <ul>
        {toDos.map(toDo => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  )
}

export default ToDoList