import { useState } from 'react';
import './App.css'
import { Task } from './Component/Task';


function App() {
  const [todolist, setTodolist] = useState([])
  const [getText, setGetText] = useState("")

  const handleChange = (event) => {
    setGetText(event.target.value)
  }

  const addTask = () => {
    const task = {
      id: todolist.length === 0 ? 1 : todolist[todolist.length - 1].id + 1,
      taskName: getText,
      completed: false,
    }
    setTodolist([...todolist, task])
  }
  const deleteTask = (id) => {
    const newTodoList = todolist.filter((task) => {
      return task.id !== id
    })
    setTodolist(newTodoList);
  }

  const completedTask = (id) => {
    setTodolist(
      todolist.map((task) => {
        if (task.id === id) {
          return { ...task, completed: true }
        } else {
          return task
        } 
      })
    )
  }


  return (
    <div className='App'>
      <div className='addTask'>
        <input type='text' onChange={handleChange}></input>
        <button onClick={addTask}>ADDTask</button>
      </div>
      <div className='listTask'>
        {todolist.map((task) => {
          return <Task taskName={task.taskName}
            id={task.id}
            deleteTask={deleteTask}
            completed={task.completed}
            completedTask={completedTask} />
        })}
      </div>

    </div>
  )
}

export default App;
