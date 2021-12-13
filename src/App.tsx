import React, { useState, useEffect } from 'react'
import { Container } from "@mui/material"

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
    <Container maxWidth="sm">
      <h1>Todo リスト</h1>
      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </Container>
  )
};

export default App;
