import { useState } from 'react'

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateIcon from '@mui/icons-material/Create';


export default function EditModelButton({editFn=()=>{}, deleteFn=async()=>{}}) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setOpen(true);
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setOpen(false);
    }

    return <>
        <Button onClick={handleClick} variant="contained" size='small' startIcon={<SettingsIcon size='small' />}>
            Setări
        </Button>
        <Menu id="basic-menu" open={open} onClose={handleClose} anchorEl={anchorEl}
            MenuListProps={{'aria-labelledby': 'basic-button'}}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}>
            <MenuItem onClick={editFn} dense sx={{color: '#1d7ede'}}>
                <ListItemIcon><CreateIcon color='primary' /></ListItemIcon>
                <ListItemText sx={{color: 'inherit'}}>Modifică</ListItemText>
            </MenuItem>
            <MenuItem onClick={deleteFn} sx={{color: '#d32f2f'}} dense>
                <ListItemIcon><DeleteIcon color='error' /></ListItemIcon>
                <ListItemText>Șterge</ListItemText>
            </MenuItem>
        </Menu>
    </>
}