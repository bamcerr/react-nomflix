import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist();

export enum Categories {
  "TO_DO",
  "DOING",
  "DONE"
}

export type TCategories = Categories | string;

export interface ICategory {
  displayName: string;
  name: TCategories;
  id: string;
}

export interface IToDo {
  text: string;
  id: number;
  category: ICategory;
}

export const categoriesState = atom<ICategory[]>({
  key: 'categories',
  default: [
    {name: Categories[0], id: String(Categories.TO_DO), displayName: "To do"},
    {name: Categories[1], id: String(Categories.DOING), displayName: "Doing"},
    {name: Categories[2], id: String(Categories.DONE), displayName: "Done"},
  ],
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<ICategory>({
  key: 'category',
  default: {name: Categories[0], id: String(Categories.TO_DO), displayName: "To do"},
  effects_UNSTABLE: [persistAtom],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter(toDo => toDo.category.id === category.id);
  }
});