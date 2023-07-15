import { useEffect, useState } from 'react';
import './App.css'
import { Task } from './Component/Task';
import  Axios  from 'axios';


function App() {
  const [todolist, setTodolist] = useState([])
  const [getText, setGetText] = useState("")
  const [catFact,setCatFact] = useState("")
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

  const fetchCatFact =() =>{
    Axios.get('https://catfact.ninja/fact').then((resp)=>{
    setCatFact(resp.data.fact)
  }) 
  }
  useEffect(()=>{
  fetchCatFact()

  },[])
  

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
        <div className='Cat'>
          <button onClick={fetchCatFact}>Generate Cat Image</button>
          <p>{catFact}</p>
        </div>
    </div>
  )
}

export default App;
