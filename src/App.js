import { useEffect, useState } from 'react';
import './App.css'
import { Task } from './Component/Task';
import Axios from 'axios';
import { Excuse } from './Component/Excuse';
import { Home } from './Component/Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Menu } from './Component/Menu';
import { Link } from 'react-router-dom';

import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { Form } from './Component/Form';



function App() {
  const client = new QueryClient({
    defaultOptions:{
      queries:{
        refetchOnWindowFocus:true
      }
    }
  });
  const [todolist, setTodolist] = useState([])
  const [getText, setGetText] = useState("")
  const [catFact, setCatFact] = useState("")
  const [name, setName] = useState('')
  const [age, setPredictAge] = useState({})
  const [isVisible,setIsVisible] = useState(false)



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

  const fetchCatFact = () => {
    Axios.get('https://catfact.ninja/fact').then((resp) => {
      setCatFact(resp.data.fact)
    })
  }
  useEffect(() => {
    fetchCatFact()

  }, [])

  const getName = (event) => {
    setName(event.target.value)
  }

  const predictAge = () => {
    Axios.get(`https://api.agify.io/?name[]=${name}`).then((resp) => {
      console.log(resp.data)
      setPredictAge(resp.data[0])
    })
  }

  useEffect(() => {
    if (name) {
      predictAge();
    }
  }, [name])


  return (
    <div className='App'>
      
     <QueryClientProvider client={client}>
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
      <input type='text' onChange={getName} />
      <p>{name}</p>
      <div className='predictAge'>
        <button onClick={predictAge}>PredictAge</button>
        <p>Age of {name} is {age?.age}</p>
      </div>
      <Excuse />
      <div className='routes'>
        <Router>
       
        <Link to='/home'>Home</Link>
        <Link to='/menu'>Menu</Link> 

      
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='*' element={<h1> Error page not found</h1>} />

          </Routes>
        </Router>
        
      </div>
      <Form />
      </QueryClientProvider>
      <button onClick={() =>setIsVisible((prev)=>!prev)}>
        {isVisible ? "Hide":"show"}
      </button>
      {isVisible && <h1>Hidden text</h1>}
    </div>

  )
}

export default App;
