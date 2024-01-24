import { makeAutoObservable } from 'mobx'

export interface ITodo {
  id: number
  title: string
  complited: boolean
}

export interface IFetchedTodo extends ITodo {
  userId: number
}

export type FilterType = 'all' | 'complited' | 'uncomplited'

class Todos {
  todos: ITodo[] = [
    { id: 0, title: 'TODO 1', complited: true },
    { id: 1, title: 'TODO 2', complited: false },
  ]
  id = 2
  filter: FilterType = 'all'
  fetchedTodos: IFetchedTodo[] = []

  constructor() {
    makeAutoObservable(this)
  }

  addTodo(text: string) {
    this.todos.push({ id: this.id++, title: text, complited: false })
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id)
  }

  toggleTodo(id: number) {
    this.todos.forEach((todo) =>
      todo.id === id ? (todo.complited = !todo.complited) : null
    )
  }

  changeFilter(filter: FilterType) {
    this.filter = filter
  }

  get filteredTodos() {
    return this.todos.filter((todo) => {
      switch (this.filter) {
        case 'all':
          return todo
        case 'complited':
          return todo.complited
        case 'uncomplited':
          return !todo.complited
      }
    })
  }

  setFetchedTodos(todos: IFetchedTodo[]) {
    this.fetchedTodos = todos
  }

  async fetchTodos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/')
    const json = await response.json()
    this.setFetchedTodos(json)
  }
}

export default new Todos()
