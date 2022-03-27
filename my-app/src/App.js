import React, {useState, useEffect} from 'react'
import {Print_taskList, Form} from './index.js'


const defaultValues = {
  name: "",
  description: ""
}

function App(){
  
  const [data, setData] = useState({});
  const [addTask, setAddTask] = useState(defaultValues)

  useEffect(() => {
    fetch("http://localhost:5000/api").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
    }
    )
  }, [])

  const processFormChange = (inputVal) => {
    setAddTask(inputVal)
  } 

  const processFormSubmit = () =>{
    fetch("http://localhost:5000/create_task", {
      method: 'POST',
      body: JSON.stringify({
        name: addTask.name,
        description: addTask.description
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json())
    .then(message => {console.log(message)
    setAddTask(defaultValues)
    getLatestTasks()
  })
  }



  const getLatestTasks = () =>{
    fetch("http://localhost:5000/api").then(response => response.json())
    .then(data => setData(data))
  }

  

  return (
    <div>
      <Form userInput={addTask} onFormChange={processFormChange} onFormSubmit={processFormSubmit}/>
      <Print_taskList taskList={data} LatestTasks = {getLatestTasks}/>
    </div>
  );
}


export default App
