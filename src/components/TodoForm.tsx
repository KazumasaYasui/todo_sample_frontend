import React, {useState, SetStateAction, Dispatch } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Container, TextField } from "@mui/material"
import styled from "styled-components"

import { createTodo } from "../apis/todo"
import { Todo } from "../interfaces/todo"

interface TodoFormProps {
  todos: Todo[]
  setTodos: Dispatch<SetStateAction<Todo[]>>
}

export const TodoForm: React.FC<TodoFormProps> = ({ todos, setTodos }) => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const navigate = useNavigate()

  const handleCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data: Todo = {
      title,
      body
    }

    try {
      const res = await createTodo(data)
      console.log(res)

      if (res.status === 200) {
        setTodos([...todos, res.data.data.todo])
      } else {
        console.log(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }

    setTitle("")
    setBody("")
    navigate("/todos")
  }

  return (
    <Container maxWidth="sm">
      <h1>新しい Todo</h1>
      <form onSubmit={handleCreateTodo}>
        <TextField
          variant="filled"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }}
        />
        <TextField
          variant="filled"
          fullWidth
          margin="normal"
          value={body}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBody(e.target.value)
          }}
        />
        <ButtonWrapper>
          <Button type="submit" variant="contained" size="large" disabled={!title}>作成</Button>
        </ButtonWrapper>
      </form>
    </Container>
  )
}

const ButtonWrapper = styled.div`
  margin-top: 1rem;
  text-align: right;
`
