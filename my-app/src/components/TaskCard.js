import {useEffect, useState} from 'react';
import {React,
        Card,
        CardContent, 
        CardHeader,
        Button,
        Typography,
        Box,
        DialogTitle,
        Dialog,
        DialogActions,
        DialogContent,
        DialogContentText,
        IconButton,
        EditIcon,
        TextField,
        Checkbox,
        CheckCircleIcon,
        CheckCircleOutlineIcon,
        makeStyles,
        ExpandMoreIcon,
        styled,
        Collapse
        } from '../collections/imports';


const useStyles = makeStyles({
    title: {
        fontSize: '21px'
    }
  })


  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  

const TaskCard = ({id, name, description, getLatestTasks}) => {

    const classes = useStyles();

    const [taskEdit, setTaskEdit] = useState({name: name, description: description});
    const [expanded, setExpanded] = useState(false);
   
    useEffect(() => {
        setTaskEdit({name: name, description: description})
        setExpanded(false);
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
                getLatestTasks();
            });
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    
    return(
    <Box sx={(expanded) ? ((taskEdit.description != "") ? {mb: 15} : {mb: 12}): {mb: 1}}>
    <li key={id.toString()} className='taskLi'>
        <Card>
                <Checkbox 
                    sx={{position: "absolute", mt: 1.4}}
                    onClick={processDelete}
                    icon={<CheckCircleOutlineIcon sx={{color: "#757575"}} />}
                    checkedIcon={<CheckCircleIcon/>}/>
                <CardHeader
                    sx={{ml: 3}}
                    action={
                    <>
                        <TaskDialog 
                            editInput={taskEdit}
                            onEditChange={handleEditChange}
                            onEditSubmit={processEditSubmit} />
                                                
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </>
                    }
                    classes={{title: classes.title }}
                    title={taskEdit.name}
                    >
                    
                </CardHeader>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                    <Typography variant="h6" color="text.secondary">Description: </Typography>
                    <Typography paragraph >{taskEdit.description}</Typography>
                    </CardContent>
                </Collapse>
        </Card>
    </li>
    </Box>
    )
}

const TaskDialog = ({editInput, onEditChange, onEditSubmit}) => {
    const [open, setOpen] = useState(false);
    const [tempVals, setTempVals] = useState({name: "", description: ""});
    
    const handleClickOpen = () => {
        setTempVals(
            {name: editInput.name, description: editInput.description}
        )
        setOpen(true);
    }

    const handleClose = () => {
        setTempVals({name: "", description: ""})
        setOpen(false);
    }

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
        handleClose()
      }

      const handleCancel = () => {
        handleClose()
        onEditChange({
            name: tempVals.name,
            description: tempVals.description
        })
    }

    return(
    <>
        <IconButton sx={{ml:1}} onClick={handleClickOpen}>
            <EditIcon/>
        </IconButton>

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{editInput.name}</DialogTitle>
           
            <DialogContentText sx={{ml: 3}}>
                Edit task:
            </DialogContentText>
           
            <form onSubmit={handleSubmit}>
            <DialogContent>
            <TextField
                required
                name='name'
                autoComplete='off'
                label="Task name"
                value={editInput.name}
                onChange={handleChange}
                autoFocus 
                placeholder='Enter task name'
                sx={{mb: 2}}/>
            <br/>
            <TextField
                name='description'
                autoComplete='off'
                label='Description'
                value={editInput.description}
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
export default TaskCard;