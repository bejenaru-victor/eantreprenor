import { useContext } from 'react';
import { UXContext } from '@/components/inc/context'

import Grid from '@mui/material/Grid'
import MUIDialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Dialog({width = '', children}) {
    const {uiData, setUiData} = useContext(UXContext)

    const closeDialog = () => setUiData({...uiData, dialog: false})

    return <>
        <MUIDialog
            sx={{width: 'auto', overflowY: 'visible'}}
            PaperProps={{sx: {overflowY: 'visible'}}}
            fullWidth={true}
            maxWidth={width ? width : 'sm'}
            open={uiData.dialog}
            onClose={closeDialog}
        >
            <Grid container justifyContent="center">
                <Grid
                    item xs={11} md={12}
                    sx={{backgroundColor: '#fff', p: 3, borderRadius: 1, position: 'relative', width:'100%'}}>
                    <IconButton
                        onClick={closeDialog}
                        aria-label="delete"
                        size='medium'
                        sx={{position: 'absolute', right: 5, top: 5}}>
                        <CloseIcon fontSize='medium' />
                    </IconButton>
                    {children}
                </Grid>
            </Grid>
        </MUIDialog>
    </>
}