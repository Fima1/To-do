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


// header: AppBar with an addicon IconButton
// Dialog: opens when the iconbutton is clicked, form for adding new task