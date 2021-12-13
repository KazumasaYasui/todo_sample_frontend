import React, { Dispatch, SetStateAction } from "react"
import { Container, Link, List, ListSubheader } from "@mui/material"
import styled from "styled-components"

import { TodoItem } from "./TodoItem"
import { Todo } from "../interfaces/todo"

interface TodoListProps {
  todos: Todo[]
  setTodos: Dispatch<SetStateAction<Todo[]>>
}

export const TodoList: React.FC<TodoListProps> = ({ todos, setTodos}) => (
  <Container maxWidth="sm">
    <h1>Todo リスト</h1>
    <LinkWrapper href="/todos/new" underline="none">
      Todoを追加
    </LinkWrapper>
    <List
      sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Todo一覧</ListSubheader>}
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
  </Container>
)

const LinkWrapper = styled(Link)`
  display: block;
  text-align: right;
`
