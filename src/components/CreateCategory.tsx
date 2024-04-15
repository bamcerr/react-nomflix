import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoriesState } from "../atoms";


enum EForm {
  empty = "",
  categoryName = 'categoryName'
}
interface IForm {
  categoryName: EForm;
}

function CreateCategory() {
  const {handleSubmit, register, setValue} = useForm<IForm>();
  const setCategoriesState = useSetRecoilState(categoriesState);

  const onValid = ({categoryName}:IForm) => {
    setCategoriesState(prev => [      
      ...prev,
      { displayName: categoryName, name: categoryName, id: crypto.randomUUID() }
    ]);
    setValue(EForm.categoryName, EForm.empty);
  }

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input {...register(EForm.categoryName, {required: true})} placeholder="Write a Category" />
      <button>Add Category</button>
    </form>
  )
}

export default CreateCategory;