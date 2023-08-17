'use client'

import { useEffect, useState } from "react";
import { Todo, Todos } from "../types/todo";
// import DateTime from "./components/date";

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [todos, setTodos] = useState<Todos>([]);

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const addTodos = (): void | undefined => {
    if (!inputValue) {
      window.alert("入力してください");
      return;
    };

    const todo: Todo = {
      id: todos.length + 1,
      label: inputValue,
      status: "todo",
      startDate: String(new Date().toLocaleDateString()),
      limitDate: String(new Date().toLocaleDateString()),
    };

    const newTodos = [...todos];
    newTodos.push(todo);
    setTodos(newTodos);
    setInputValue("");
    setStorageData(newTodos);
  };

  const deleteTodo = (index: number): void => {
    const newTodos = [...todos];
    const status = newTodos[index].status;
    newTodos[index].status = status === "todo" ? "done" : "todo";
    setTodos(newTodos);
    setStorageData(newTodos);
  };

  const getStorageData = (): string | null => {
    return window.localStorage.getItem("todos");
  };

  const setStorageData = (todos: Todos): void => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  };

  const showTodo = (flag: boolean): void => {
    setIsActive(flag);
  };

  useEffect(() => {
    const storageData = getStorageData();
    if (storageData) {
      setTodos(JSON.parse(storageData));
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 w-full">
      <h1 className='text-3xl font-bold'>Todo App</h1>
      <div className='mt-5'>
        <input type="text" value={inputValue} onChange={changeInputValue} className='border border-gray-500 p-2'/>
        <button onClick={addTodos} className='ml-5 border border-gray-500 pl-5 pr-5'>追加</button>
      </div>
      <div className='mt-10'>
        <ul className='flex item-center justify-center'>
          <li><button onClick={() => showTodo(true)} className='ml-5 border border-gray-500 pl-5 pr-5'>todo</button></li>
          <li><button onClick={() => showTodo(false)} className='ml-5 border border-gray-500 pl-5 pr-5'>done</button></li>
        </ul>
        <ul className='max-w-screen-md'>
          {isActive && todos.map((todo, index) => (
            <li key={index}
              className={todo.status === "done" ? "hidden" : "flex flex-col justify-between flex-wrap mt-3 border border-gray-500 p-3"}
            >
              <p className='flex-1 whitespace-pre break-words'>task: {todo.label}</p>
              <p className='flex-1 whitespace-pre break-words mt-2'>status: {todo.status}</p>
              <p className='flex-1 whitespace-pre break-words mt-2'>
                {/* <DateTime dateString={todo.startDate}></DateTime> */}
              </p>
              <p className='flex-1 whitespace-pre break-words mt-2'>
                {/* <DateTime dateString={todo.limitDate}></DateTime> */}
              </p>
              <button onClick={() => deleteTodo(index)} className='border border-gray-500 p-1 mt-2'>完了</button>
            </li>
          ))}
          {!isActive && todos.map((todo, index) => (
            <li key={index}
              className={todo.status === "done" ? "flex flex-col justify-between flex-wrap mt-3 border border-gray-500 p-3" : "hidden"}
            >
              <p className='flex-1 whitespace-pre break-words'>task: {todo.label}</p>
              <p className='flex-1 whitespace-pre break-words mt-2'>status: {todo.status}</p>
              <p className='flex-1 whitespace-pre break-words mt-2'>
                {/* <DateTime dateString={todo.startDate}></DateTime> */}
              </p>
              <p className='flex-1 whitespace-pre break-words mt-2'>
                {/* <DateTime dateString={todo.limitDate}></DateTime> */}
              </p>
              <button onClick={() => deleteTodo(index)} className='border border-gray-500 p-1 mt-2'>戻す</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
