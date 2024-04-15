import { useRecoilValue } from "recoil";
import { toDoSelector, toDoState } from "./atoms";
import CreateToDo from "./components/CreateToDo";
import ToDo from "./ToDo";



function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  const [toDo, doing, done] = useRecoilValue(toDoSelector);

  return (
    <div>
      <CreateToDo />
      <h2>To Do</h2>
      <ul>
        {toDo.map(toDo => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />

      <h2>Doing</h2>
      <ul>
        {doing.map(toDo => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />

      <h2>Done</h2>
      <ul>
        {done.map(toDo => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />

    </div>
  )
}

export default ToDoList