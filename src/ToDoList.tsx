/* import { useState } from "react"

function ToDoList() {
  const [toDo, setTodo] = useState("");
  const [toDoError, setToDoError] = useState("");

  const onChange = (event:React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTodo(value);
    setToDoError("");
  }

  const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }

    console.log("submit");
  }

  return <>
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  </>
} */

import {useForm} from "react-hook-form";

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

function ToDoList() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setError
  } = useForm<IForm>({
    // mode: "onChange",
    defaultValues: {
      email: "@naver.com"
    }
  });
  const onValid = (data:IForm) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        {message: "Password are not the same"},
        {shouldFocus: true}
      );
    }
    // setError("extraError", {message: "Server offline"});
  }

  return (
    <div>
      <form 
      style={{display: "flex", flexDirection: "column"}}
      onSubmit={handleSubmit(onValid)}>
        <input 
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com&/,
              message: "Only naver.com emails allowed"
            }
          })} 
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input 
          {...register("firstName", {
            required: "write here",
            validate: {
              noNico: (value) => value.includes("nico") ? "no nicos allowed" : true,
              noNick: (value) => value.includes("nick") ? "no nick allowed" : true
            }
          })} 
          placeholder="First Name" 
        />
        <span>{errors?.firstName?.message}</span>
        <input 
          {...register("lastName", {required: "write here"})} 
          placeholder="Last Name" 
        />
        <span>{errors?.lastName?.message}</span>
        <input 
          {...register("username", {required: "write here", minLength: 10})} 
          placeholder="Username" 
        />
        <span>{errors?.username?.message}</span>
        <input 
          {...register("password", {required: "write here", minLength: 5})} 
          placeholder="Password" 
        />
        <span>{errors?.password?.message}</span>
        <input 
          {...register("password1", {
            required: true, 
            minLength: {
              value: 5,
              message: "Your password is too short."
            }})} 
          placeholder="Password1" 
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  )
}

export default ToDoList