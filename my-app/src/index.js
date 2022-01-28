import React, { useEffect } from 'react';
import { useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let el = <div id='header'><h1 > To-do List </h1> </div>
ReactDOM.render(el, document.getElementById('container1'))


export const Form = ({userInput, onFormChange, onFormSubmit}) =>{
    
    const handleChange = (e) => {
        onFormChange(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        onFormSubmit()
      }

    
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" required value={userInput} onChange={handleChange} className="newTaskField" autoFocus placeholder='Enter new task'></input>
                <input type="submit" className='newTaskSubmit'></input>
            </form>
        </>
    )
}


export const Print_taskList = ({taskList, LatestTasks}) => {
const listItems = Object.values(taskList).map((task) => <Task_view id={task.id} name={task.name} getLatestTasks = {LatestTasks} />);
return <ul className='taskUl'>{listItems}</ul>;
}

 
const Task_view = ({id, name, getLatestTasks}) => {

    const [taskEdit, setTaskEdit] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setTaskEdit(name)
        setIsEditing(false)
    }, [id])

    const processDelete = () => {
        fetch("http://localhost:5000/delete_task", {
        method: 'POST',
        body: JSON.stringify({
            id: id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json())
    .then(message => {console.log(message)
    getLatestTasks() 
        })
    }

    const handleEditChange = (input) => {
        setTaskEdit(input)
    }

    const processEditSubmit = () => {

        fetch("http://localhost:5000/edit_task", {
            method: 'POST',
            body: JSON.stringify({
                content: taskEdit,
                id: id
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
            .then(message => {
                console.log(message);
                setIsEditing(false);
                getLatestTasks();
            });
    }

    const startEdit = () => {
        setIsEditing(true)
    }

    
    return(
    <li key={id.toString()} className='taskLi'>
        <ContentSpan editState={isEditing} taskEdit={taskEdit} handleEditChange = {handleEditChange} processEditSubmit = {processEditSubmit}/>
        <button className='taskEdit' style={(isEditing)?{display: 'none'}:{display: 'inline'}} onClick={startEdit}>Edit</button>
        <button className='taskDelete' onClick={processDelete}>Delete</button>
    </li>
    )
}



const ContentSpan = ({editState, taskEdit, handleEditChange, processEditSubmit}) => {
    if (editState){
        return <EditForm editInput={taskEdit} onEditChange={handleEditChange} onEditSubmit={processEditSubmit}/>;
    }
    else{
        return <span className='taskText'> {taskEdit} </span>;
    }
}

const EditForm = ({editInput, onEditChange, onEditSubmit}) => {

    const handleChange = (e) => {
        onEditChange(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        onEditSubmit()
      }


    return(
        <form className='editForm' onSubmit={handleSubmit}>
            <input className="editTextField" type="text" value={editInput} style={{width: editInput.length + "ch"}} required autoFocus onChange={handleChange}/>
            <input className="editSubmit" type="submit" value="Submit" />
        </form>
    )
}


let el1 = <App />
ReactDOM.render(el1, document.getElementById('container2'))



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
