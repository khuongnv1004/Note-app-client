import { CreateNewFolderOutlined } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { addNewFolder } from '../utils/folderUtils';

export default function NewFolder() {

    const[newFolderName, setNewFolderName] = useState();
    const[open, setOpen] = useState(false);
    const[searchParams, setSearchParmas] = useSearchParams();

    const popupName = searchParams.get('popup');
    const navigate = useNavigate();

    const handleNewFolderNameChange = (e)=>{
        setNewFolderName(e.target.value)
    }
    const handleClose = ()=>{
        setOpen(false)
        setNewFolderName('')
        navigate(-1)


    }
    const handleAddNewFolder = async ()=>{
        const {addFolder} =  await addNewFolder({name: newFolderName});
        handleClose()
    }
    const handleOpenPopup = ()=>{
        setSearchParmas({popup:'add-folder'})
        setOpen(true)
    }

    useEffect(()=>{
        if(popupName === 'add-folder'){
            setOpen(true)
            return;
        }
        else{
            setOpen(false)
        }
    },[popupName])
  return (
    <div>
        <Tooltip title="Add Folder" onClick={handleOpenPopup} >
            <IconButton size='small'>
                <CreateNewFolderOutlined sx={{color:'white'}}/>
            </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                New Folder
            </DialogTitle>
            <DialogContent>
                <TextField 
                autoFocus
                margin='dense'
                id='name'
                label="Folder Name"
                fullWidth
                size='small'
                variant='standard'
                sx={{ width:'400px'}}
                autoComplete='off'
                value={newFolderName}
                onChange={handleNewFolderNameChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddNewFolder}>Add</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}
