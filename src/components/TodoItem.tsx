import React, { Dispatch, SetStateAction } from "react"
import { IconButton, ListItem, ListItemText, Switch } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import styled from "styled-components"

import { deleteTodo, updateTodo } from "../apis/todo"
import { Todo } from "../interfaces/todo"

interface TodoItemProps {
  todo: Todo
  setTodos: Dispatch<SetStateAction<Todo[]>>
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, setTodos }) => {
  const handleDeleteTodo = async (id: number) => {
    try {
      const res = await deleteTodo(id)
      console.log(res)

      if (res.status === 200) {
        setTodos((prev: Todo[]) => prev.filter((t: Todo) => t.id !== id))
      } else {
        console.log(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateTodoStatus = async (id: number) => {
    const { status } = todo
    const newStatus = status === 'in_progress' ? 'done' : 'in_progress'
    const newTodo = { ...todo, status: newStatus }
    try {
      const res = await updateTodo(id, newTodo)
      console.log(res)

      if (res.status === 200) {
        setTodos((prev: Todo[]) => prev.map((t: Todo) => {
          if (t.id === id) {
            return { ...t, status: newStatus }
          }

          return t
        }))
      } else {
        console.log(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const isDone = todo.status === 'done'

  return (
    <ListItem>
      <ListItemTextWrapper primary={todo.title} secondary={todo.body} isDone={isDone} />
      <Switch
        edge="end"
        onChange={() => handleUpdateTodoStatus(todo.id || 0)}
        checked={isDone}
      />
      <IconButton type="button" color="primary" onClick={() => handleDeleteTodo(todo.id || 0)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}

const ListItemTextWrapper = styled(ListItemText)<{ isDone: boolean }>`
  text-decoration: ${({isDone}) => isDone ? 'line-through' : 'none' };
`
