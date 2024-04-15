import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, categoriesState, categoryState, toDoState } from "./atoms";

function ToDo({text, id}: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const selectedCategory = useRecoilValue(categoryState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: {name}
    } = event;

    setToDos(prev => {
      const targetIndex = prev.findIndex(toDo => toDo.id === id);
      const category = categories.find(item => item.id === name)!;
      const newToDo = {text, id, category};
      return [
        ...prev.slice(0, targetIndex),
        newToDo,
        ...prev.slice(targetIndex + 1)
      ]
    })
  };

  return (
    <li>
      <span>{text}</span>
      {
        categories.filter(item => item.id !== selectedCategory.id).map(item => {
          return <button key={item.id} name={item.id} onClick={onClick}>{item.displayName}</button>
        })
      }
    </li>
  )
}


export default ToDo;