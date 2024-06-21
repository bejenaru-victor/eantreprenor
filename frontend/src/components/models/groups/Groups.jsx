'use client'

import { useState, useEffect } from 'react'

import GroupView from '@/components/models/groups/GroupView'
import GroupTable from '@/components/models/groups/GroupTable'
import { get_group_form_options, get_groups } from '@/utils/fetch/groups'
import Dialog from '@/components/inc/Dialog'
import ModelMessage from '@/components/inc/ModelMessage'
import { UXContext } from '@/components/inc/context'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Paper, Tooltip } from '@mui/material'

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LaunchIcon from '@mui/icons-material/Launch';
import Link from 'next/link'
import { formatTimeRange } from '@/components/inc/DataSet'



export default function Groups() {

    const [uiData, setUiData] = useState({
        objectList: [],
        object: null,
        dialog: false,
        action: 'details',
        formOptions: {
            teachers: [],
            weekdays: [],
        },
        message: {
            text: '',
            open: false,
        }
    })

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Nume', flex:1,  minWidth: 150 },
        { field: 'teacher', headerName: 'Instructor', flex:1, minWidth: 150,
            valueGetter: (params) => (params.row.teacherData.username),
            renderCell: (params) => (params.row.teacherData.username)
        },
        { field: 'time', headerName: 'Program curs', flex:1, minWidth: 150,
            renderCell: (params) => 
                (`${params.row.weekdayData.label} | ${formatTimeRange([params.row.starting_at, params.row.ending_at])}`)
        },
        { field: 'users', headerName: 'Elevi', flex:.3, minWidth: 150,
            valueGetter: (params) => (params.row.users.length),
            renderCell: (params) => <h3>{params.row.users.length}</h3>
        },
        { field: 'lessons', headerName: 'Lecții', flex:.3, minWidth: 150,
            valueGetter: (params) => (params.row.schedules.length),
            renderCell: (params) => (<h3>{params.row.schedules.length}</h3>)
        },
        //{ field: 'active_lesson', headerName: 'Lecție activă', flex:1, minWidth: 150 },
        { field: 'link', headerName: 'Detalii', flex:.5, minWidth: 150,
            renderCell: (params) => <>
                <div onClick={(e) => {e.preventDefault(); e.stopPropagation();}}>
                    <Link href={`groups/${params.row.id}`}>
                        <IconButton aria-label="details">
                            <LaunchIcon color='primary' />
                        </IconButton>
                    </Link>
                </div>
            </>
        },
    ];

    useEffect(() => {
        const fetchData =  async () => {
            setUiData({...uiData,
                objectList: await get_groups(),
                formOptions: await get_group_form_options(),
            })
            console.log(await get_groups(), await get_group_form_options())
        }
        fetchData()
    }, [])

    const detailClickHandler = (params, event, details) => {
        event.preventDefault()
        event.stopPropagation()
        setUiData({...uiData, dialog: true, object: params.row, action: 'details'})
    }

    const createObjectHandler = () => {
        setUiData({...uiData, dialog: true, action: 'create', object: null})
    }

    return <>
        <Paper elevation={1} sx={{overflow: 'hidden', borderRadius: 3}}>
        <Grid container sx={{bgcolor: '#eb9929;', px:1.5, py:1, color: 'whitesmoke'}}>
            <Grid item container xs>
                <Grid item xs='auto' sx={{display: 'flex'}}>
                    <PeopleAltIcon sx={{margin: 'auto .5rem'}} size='medium' />
                </Grid>
                <Grid item xs='auto' sx={{display: 'flex'}}>
                    <Typography sx={{fontSize: '1.3rem', fontWeight: '300', my: 'auto'}}>Grupe</Typography>
                </Grid>
            </Grid>
            <Grid item xs='auto' sx={{display: 'flex'}}>
                <Tooltip title='Grupă nouă'>
                <IconButton onClick={createObjectHandler} color="inherit" aria-label="Adaugă utilizator nou">
                    <AddBoxOutlinedIcon />
                </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
        <GroupTable columns={columns} rows={uiData.objectList} clickHandler={detailClickHandler} />
        </Paper>

        <UXContext.Provider value={{uiData, setUiData}}>
            <Dialog>
                <GroupView />
            </Dialog>
            <ModelMessage />
        </UXContext.Provider>
    </>
}