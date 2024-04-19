import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist();

export interface ITodo {
  id: string;
  text: string;
  boardId: string;
  index: number;
}
interface IToDoState extends Array<ITodo> {}

export interface IBoard {
  id: string;
  title: string;
  index: number;
}
interface IBoardState extends Array<IBoard>{}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom]
});

export const boardState = atom<IBoardState>({
  key: "board",
  default: [
    {id: "0", title: "To Do", index: 0},
    {id: "1", title: "Doing", index: 1},
    {id: "2", title: "Done", index: 2}
  ],
  effects_UNSTABLE: [persistAtom]
});


interface ITodosByBoardState {
  [key: string]:ITodo[]
}

export const toDosByBoardState = selector<ITodosByBoardState>({
  key: "toDosByBoard",
  get: ({get}) => {
    const boards = get(boardState);
    const toDos = get(toDoState);

    return boards.reduce<ITodosByBoardState>((previous, current, index) => {
      const todos = toDos.filter(todo => todo.boardId === current.id).sort((a, b) => a.index - b.index);
      previous[current.id] = todos
      return previous
    }, {});
  }
});

export const boardsSortedByIndexState = selector({
  key: "boardsSortedByIndexState",
  get: ({get}) => {
    const boards = get(boardState);
    return [...boards].sort((a,b) => a.index - b.index)
  }

})

