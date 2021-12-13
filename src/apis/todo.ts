import client from "./config"
import { Todo, GetResp, PostDeleteResp } from "../interfaces/todo"

// Todo 一覧を取得
export const getTodos = () => client.get<GetResp>("/todos")

// Todo を作成
export const createTodo = (data: Todo) => client.post<PostDeleteResp>("/todos", data)

// Todo を更新
export const updateTodo = (id: number, data: Todo) => client.patch<PostDeleteResp>(`/todos/${id}`, data)

// Todo を削除
export const deleteTodo = (id: number) => client.delete<PostDeleteResp>(`/todos/${id}`)
