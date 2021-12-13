export interface Todo {
  id?: number
  title: string
  body?: string
  status?: string
}

export interface GetResp {
  status: number
  message: string
  data: {
    [todos: string]: Todo[]
  }
}

export interface PostDeleteResp {
  status: number
  message: string
  data: {
    [todo: string]: Todo
  }
}
