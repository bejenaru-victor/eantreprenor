import { useContext, useState } from 'react';
import { UXContext } from '@/components/inc/context'
import GroupForm from '@/components/models/groups/GroupForm';
import EditModelButton from '@/components/inc/EditModelButton'
import DataSet from '@/components/inc/DataSet'

import { delete_group } from '@/utils/fetch/groups';

import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider';
import ConfirmAlert from '@/components/inc/ConfirmAlert';
import { Typography } from '@mui/material';



export default function GroupView() {

    const {uiData, setUiData} = useContext(UXContext)
    const [alert, setAlert] = useState(false)

    const deleteHandler = async () => {
        await delete_group(uiData.object.id)
        const index = uiData.objectList.findIndex(object => object.id == uiData.object.id)
        const array = [...uiData.objectList]
        array.splice(index, 1)
        setUiData({...uiData, objectList: [...array], dialog: false,
            message: {
                open: true, text: `Grupa ${uiData.object.name} a fost ștearsă cu succes!`
            }
        })
    }

    if (uiData.action === 'create' || uiData.action === 'update' || !uiData.object)
        return <GroupForm />

    return <>
        <Typography sx={{fontSize: '1.3rem', fontWeight: '300', mt: 1}}>Grupa #{uiData.object.id}</Typography>
        <Divider sx={{marginBottom: 2}} />
        <Grid container>
            <Grid item xs>
                <DataSet label='Nume' value={uiData.object.name}/>
                <DataSet label='Instructor' value={uiData.object.teacherData.username}/>
                <DataSet label='Ziua de curs' value={uiData.object.weekdayData.label}/>
                <DataSet label='Intervalul orar' value={[uiData.object.starting_at, uiData.object.ending_at]} type='timerange'/>
            </Grid>
        </Grid>

        <Grid container justifyContent={'end'} sx={{paddingTop: 2}}>
            <EditModelButton
                editFn={() => {setUiData({...uiData, action: 'update'})}}
                deleteFn={() => setAlert(true)}
            />
        </Grid>

        <ConfirmAlert open={alert} action={deleteHandler} handleClose={() => {setAlert(false)}}
            title={`Confirmă ștergerea utilizatorului ${uiData.object.username}`}/>
    </>
}