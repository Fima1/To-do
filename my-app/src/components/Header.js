import React, { useEffect } from 'react';
import { useState} from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';


// header: AppBar with an addicon IconButton
// Dialog: opens when the iconbutton is clicked, form for adding new task


const Header = ({userInput, onFormChange, onFormSubmit}) => {
    

    return(
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="sticky">
                <Toolbar>
                    <FormDialog 
                        userInput={userInput}
                        onFormChange={onFormChange}
                        onFormSubmit={onFormSubmit}/>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{display: {sx: "flex"}, justifyContent: "center"}}
                        >
                            TO-DO LIST
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}


const FormDialog = ({userInput, onFormChange, onFormSubmit}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        onFormChange({
        ...userInput,
        [name]: value,
        });
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        onFormSubmit()
        handleClose()
      }

    const handleCancel = () => {
        onFormChange({
            name: "",
            description: ""
        })
        handleClose()
    }

    return(
        <>
        <IconButton
        onClick={handleClickOpen}
        size="large"
        edge="start"
        color="inherit"
        aria-label="addTask"
        sx={{mr: 3, ml: 3}}>
            <Avatar>
                <AddIcon/>
            </Avatar>
        </IconButton>

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Task</DialogTitle>
            <DialogContentText sx={{ml: 3}}>
                Enter new task description
            </DialogContentText>
            <form onSubmit={handleSubmit}>
            <DialogContent>
            <TextField
                required
                name='name'
                autoComplete='off'
                label="Task name"
                value={userInput.name}
                onChange={handleChange}
                autoFocus 
                placeholder='Enter new task'
                sx={{mb: 2}}/>
            <br/>
            <TextField
                name='description'
                autoComplete='off'
                label='Description'
                value={userInput.description}
                onChange={handleChange}
                multiline
                placeholder='Add description' />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>
                    Cancel
                </Button>
                <Button type='submit'>
                    Submit
                </Button>
                
            </DialogActions>
            </form>
        </Dialog>
        </>
    )
}

export default Header; 