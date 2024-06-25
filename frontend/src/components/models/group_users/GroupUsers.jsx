'use client'

import { useState } from 'react'

import Dialog from '@/components/inc/Dialog'
import GroupTable from '@/components/models/group_users/GroupTable'
import { update_group } from '@/utils/fetch/groups'
import ModelMessage from '@/components/inc/ModelMessage'
import { UXContext } from '@/components/inc/context'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Paper, Tooltip } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import UserSelector from './components/UserSelector'




export default function GroupUsers({group}) {

    const [uiData, setUiData] = useState({
        objectList: group.users_data,
        object: null,
        dialog: false,
        action: 'details',
        message: {
            text: '',
            open: false,
        }
    })

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'username', headerName: 'Utilizator', flex:1,  minWidth: 150 },
        { field: 'email', headerName: 'Email', flex:2, minWidth: 150 },
        { field: 'role', headerName: 'Rol', flex:2, minWidth: 150,
            type: 'singleSelect',
            //valueOptions: uiData.formOptions.roles,
            // valueGetter: (params) => (params.row.role),
            // renderCell: (params) => (<RoleDisplay role={params.row.role}>{params.row.role_label}</RoleDisplay>)
        },
    ];

    /*useEffect(() => {
        const fetchData =  async () => {
            setUiData({...uiData,
                //objectList: [...group.users_data],
                //objectList: await get_group_users(),
                //formOptions: await get_group_form_options(),
            })
        }
        fetchData()
    }, [])*/

    const editObjectHandler = () => {
        setUiData({...uiData, dialog: true, action: 'details', object: null})
    }

    const closeDialog = () => {
        setUiData({...uiData, dialog: false})
    }

    const updateList = async (objects) => {
        const data = {
            id: group.id,
            users: objects.map(obj => obj.id)
        }
        console.log(data)
        const res = await update_group(data)
        if (res.ok) {
            setUiData({...uiData, objectList: objects, dialog: false, 
                message: { open: true, text: `Elevii au fost actualizați cu succes!`}
            })
        } else {
            setUiData({...uiData, dialog: false, 
                message: { open: true, text: `A apărut o eroare la actualizarea elevilor!`}
            })
        }
    }

    return <>

        <h1 style={{fontSize: '1.9rem', fontWeight: '300', marginBottom: 0, margin:0}}>Group {group.name}</h1>

        <Paper elevation={1} sx={{overflow: 'hidden', borderRadius: 3, mt: 2}}>
            <Grid container sx={{bgcolor: '#111827', px:1.5, py:1, color: 'whitesmoke'}}>
                <Grid item container xs>
                    <Grid item xs='auto' sx={{display: 'flex'}}>
                        <PeopleAltIcon sx={{margin: 'auto .5rem'}} size='medium' />
                    </Grid>
                    <Grid item xs='auto' sx={{display: 'flex'}}>
                        <Typography sx={{fontSize: '1.3rem', fontWeight: '300', my: 'auto'}}>
                            Members
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs='auto' sx={{display: 'flex'}}>
                    <Tooltip title='Editează lista participanți'>
                        <IconButton onClick={editObjectHandler} color="inherit" aria-label="Editează lista participanți">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <GroupTable columns={columns} rows={uiData.objectList} />
        </Paper>

        <UXContext.Provider value={{uiData, setUiData}}>
            <Dialog width='md'>
                <UserSelector selected={uiData.objectList} handleSelectedObjects={updateList} close={closeDialog} />
            </Dialog>
            <ModelMessage />
        </UXContext.Provider>
    </>
}