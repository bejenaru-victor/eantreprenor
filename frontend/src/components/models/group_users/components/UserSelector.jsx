'use client'

import { useState, useEffect } from 'react';

import { get_users } from '@/utils/fetch/users';

import RoleDisplay from '@/components/utils/RoleDisplay';

import { DataGrid, roRO, gridClasses } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MUIDialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';

export function ObjectDialog({open, closeDialog, width = '', children}) {
    return <>
        <MUIDialog
            sx={{width: 'auto'}}
            fullWidth={true}
            maxWidth={width ? width : 'sm'}
            open={open}
            onClose={closeDialog}
        >
            <Grid container justifyContent="center">
                <Grid
                    item xs={11} md={12}
                    sx={{backgroundColor: '#fff', p: 3, bobjectRadius: 1, position: 'relative', width:'100%'}}>
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

const theme = createTheme(
    {
      palette: {
        primary: { main: '#1976d2' },
      },
    },
    roRO,
  );

function Objects({course, handleTempSelectedObjects, selected}) {

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'username', headerName: 'Utilizator', flex:1,  minWidth: 150 },
        { field: 'email', headerName: 'Email', flex:2, minWidth: 150 },
        // { field: 'role', headerName: 'Rol', flex:2, minWidth: 150,
        //     type: 'singleSelect',
        //     valueOptions: [],
        //     valueGetter: (params) => (params?.row?.role),
        //     renderCell: (params) => (<RoleDisplay role={params?.row.role}>{params?.row.role_label}</RoleDisplay>)},
    ];

    const [objects, setObjects] = useState([])

    useEffect(() => {
        const fetchObjects =  async () => {
            let data = []
            if (course !== 0)
                data = await get_users()
            else
                data = await get_users()
            setObjects(data)
        }
        fetchObjects()
    }, [])

    const handleSelectionChange = (params) => {
        const selectedRowsData = params.map((rowId) =>
            objects.find((row) => row.id === rowId)
        )
        handleTempSelectedObjects(selectedRowsData);
    };

    if (!objects.length)
        return <Grid container justifyContent='center'><CircularProgress /></Grid>

    return <>
    <div style={{ height: '400px', width: '100%' }}>
        <ThemeProvider theme={theme}>
            <DataGrid
                sx={{
                    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
                    outline: "none"
                    },
                    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
                    outline: "none"
                    }
                }}
                rows={objects}
                columns={columns}
                disableRowSelectionOnClick={true}
                checkboxSelection
                onRowSelectionModelChange={handleSelectionChange}
                rowSelectionModel={selected.map((row) => row.id)}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10, 15]}
            />
        </ThemeProvider>
        </div>
    </>
}

export default function UserSelector({course, selected, close, handleSelectedObjects}) {

    const [selectedObjects, setSelectedObjects] = useState(selected || [])
    const isFullWidth = useMediaQuery(theme.breakpoints.down("md"))

    const handleTempSelectedObjects = (objects) => setSelectedObjects(objects)

    return <>
        <Typography sx={{fontSize: '1.2rem', fontWeight: '300', mt: 1}}>Selectează membrii grupei</Typography>
        <Divider sx={{mb: 2, mt: 1}} />
        <Objects course={course} handleTempSelectedObjects={handleTempSelectedObjects} selected={selectedObjects} />
        <Grid container justifyContent='space-between' mt={3}>
            <Grid item xs={12} md='auto'>
                <Button fullWidth={isFullWidth} variant='outlined' size='small' disabled={!selectedObjects.length}
                    onClick={() => {handleSelectedObjects(selectedObjects)}}>
                    Confirmă
                </Button>
            </Grid>
            <Grid item xs={12} md='auto'>
                <Button onClick={close} fullWidth={isFullWidth} variant='outlined' size='small'>Anulare</Button>
            </Grid>
        </Grid>
    </>
}