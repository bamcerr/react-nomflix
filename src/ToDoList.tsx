import { useRecoilState, useRecoilValue } from "recoil";
import { categoriesState, categoryState, toDoSelector } from "./atoms";
import CreateToDo from "./components/CreateToDo";
import ToDo from "./ToDo";
import CreateCategory from "./components/CreateCategory";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const categories = useRecoilValue(categoriesState);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const id = event.currentTarget.value;
    const category = categories.find(item => item.id === id);
    setCategory(category!);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <CreateCategory />
      <hr />
      <select value={category.id} onInput={onInput}>
        {
          categories.map((item) => <option key={item.id} value={item.id}>{item.displayName}</option>)
        }
      </select>
      <CreateToDo />
      <h2>To Do</h2>
      <ul>
        {toDos.map(toDo => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  )
}

export default ToDoList