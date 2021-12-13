import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { TodoList } from "./components/TodoList"
import { TodoForm } from "./components/TodoForm"

import { getTodos } from "./apis/todo"
import { Todo } from "./interfaces/todo"

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const handleGetTodos = async () => {
    try {
      const res = await getTodos()
      console.log(res)

      if (res.status === 200) {
        setTodos(res.data.data.todos)
      } else {
        console.log(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    void handleGetTodos()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList todos={todos} setTodos={setTodos} />} />
        <Route path="/todos" element={<TodoList todos={todos} setTodos={setTodos} />} />
        <Route path="/todos/new" element={<TodoForm todos={todos} setTodos={setTodos} />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
