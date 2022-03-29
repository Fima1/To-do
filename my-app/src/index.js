import React, { useEffect } from 'react';
import { useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TextField } from '@mui/material';



export const Print_taskList = ({taskList, LatestTasks}) => {
const listItems = Object.values(taskList).map((task) => <Task_view id={task.id} name={task.name} description={task.description} getLatestTasks = {LatestTasks} />);
return <ul className='taskUl'>{listItems}</ul>;
}

 
const Task_view = ({id, name, description, getLatestTasks}) => {

    const [taskEdit, setTaskEdit] = useState({name: name, description: description});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setTaskEdit({name: name, description: description})
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
                name: taskEdit.name,
                description: taskEdit.description,
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
        return (
        <>
        <span className='taskText'> {taskEdit.name} </span>
        <span>|| </span>
        <span>{taskEdit.description}</span>
        </>);
    }
}

const EditForm = ({editInput, onEditChange, onEditSubmit}) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        onEditChange({
        ...editInput,
        [name]: value,
        });
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        onEditSubmit()
      }


    return(
        <form className='editForm' onSubmit={handleSubmit}>
            <input className="editTextField" type="text" name='name' value={editInput.name} style={{width: editInput.length + "ch"}} required autoFocus onChange={handleChange}/>
            <TextField variant='outlined' name='description' value={editInput.description} onChange={handleChange} multiline placeholder='Add description' />
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
