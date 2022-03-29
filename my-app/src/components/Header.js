import { useState} from 'react';
import{React,
       AppBar,
       Toolbar,
       Dialog,
       DialogTitle,
       DialogActions,
       DialogContent,
       DialogContentText,
       IconButton,
       AddIcon,
       Box,
       Typography,
       TextField,
       Button,
       Avatar     
      } from '../collections/inputs';


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
                        component="div">
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
        handleClose()
        onFormChange({
            name: "",
            description: ""
        })
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
            <Avatar sx={{bgcolor: "#4d90dd"}}>
                <AddIcon/>
            </Avatar>
        </IconButton>

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Task</DialogTitle>
           
            <DialogContentText sx={{ml: 3}}>
                Enter new task description:
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