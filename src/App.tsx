import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import todosState, { FilterType, ITodo } from './store/todosState'

const Todo: FC<ITodo> = observer(({ id, title, complited }) => {
  const handleRemoveTodo = () => todosState.removeTodo(id)
  const handleToggleTodo = () => todosState.toggleTodo(id)

  return (
    <li>
      <label>
        <input
          type='checkbox'
          checked={complited}
          onChange={handleToggleTodo}
        />
        <span style={{ textDecoration: complited ? 'line-through' : 'none' }}>
          {title}
        </span>
      </label>
      <button onClick={handleRemoveTodo}>X</button>
    </li>
  )
})

const App: FC = observer(() => {
  const [todoText, setTodoText] = useState<string>('')

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTodoText(e.target.value)

  const handleAddTodo = () => {
    todosState.addTodo(todoText)
    setTodoText('')
  }

  const handleChangeFilter = (filter: FilterType) => {
    todosState.changeFilter(filter)
  }

  const handleFetchTodos = () => todosState.fetchTodos()

  return (
    <>
      <div>
        <input type='text' value={todoText} onChange={handleChangeText} />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <div>
        <button
          style={{ background: todosState.filter === 'all' ? '#ccc' : '' }}
          onClick={() => handleChangeFilter('all')}
        >
          All
        </button>
        <button
          style={{
            background: todosState.filter === 'complited' ? '#ccc' : '',
          }}
          onClick={() => handleChangeFilter('complited')}
        >
          Complited
        </button>
        <button
          style={{
            background: todosState.filter === 'uncomplited' ? '#ccc' : '',
          }}
          onClick={() => handleChangeFilter('uncomplited')}
        >
          Uncomplited
        </button>
      </div>

      <ul>
        {todosState.filteredTodos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
      <button onClick={handleFetchTodos}>Fetch todos</button>
      <ul>
        {todosState.fetchedTodos.map((todo) => {
          return <li key={todo.id}>{todo.title}</li>
        })}
      </ul>
    </>
  )
})

export default App
