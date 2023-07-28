'use client'

import { useEffect, useState } from "react";

type todos = string[];

export default function Home() {
  const [inputValue,setInputValue] = useState<string>('')
  const [todos, setTodos] = useState<todos>([]);

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const addTodos = (): void | undefined => {
    if (!inputValue) {
      window.alert("入力してください");
      return;
    };
    const newTodos = [...todos];
    newTodos.push(inputValue);
    setTodos(newTodos);
    setInputValue("");
    setStorageData(newTodos);
  };

  const deleteTodo = (index: number): void => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setStorageData(newTodos);
  };

  const getStorageData = (): string | null => {
    return window.localStorage.getItem("todos");
  };

  const setStorageData = (todos: todos): void => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  };

  useEffect(() => {
    const storageData = getStorageData();
    if (storageData) {
      setTodos(JSON.parse(storageData));
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 w-full">
      <div>
        <input type="text" value={inputValue} onChange={changeInputValue} className='border'/>
        <button onClick={addTodos} className='ml-5 border pl-5 pr-5'>追加</button>
      </div>
      <div className='mt-10'>
        <ul className='max-w-screen-md'>
          {todos.map((todo, index) => (
            <li key={index} className='flex justify-between items-center flex-wrap'>
              <p className='flex-1 whitespace-pre break-words'>{todo}</p>
              <button onClick={() => deleteTodo(index)} className='border p-1 ml-2'>完了</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
