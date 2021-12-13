import React, { Dispatch, SetStateAction } from "react"
import { List, ListSubheader } from "@mui/material";

import { TodoItem } from "./TodoItem"
import { Todo } from "../interfaces/todo"

interface TodoListProps {
  todos: Todo[]
  setTodos: Dispatch<SetStateAction<Todo[]>>
}

export const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => (
  <List
    sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}
    subheader={<ListSubheader>Todo</ListSubheader>}
  >
    {
      todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          setTodos={setTodos}
        />
      )).reverse()
    }
  </List>
)
