import { useRef, useContext } from "react";

import { UXContext } from '@/components/inc/context'
import { create_group, update_group } from "@/utils/fetch/groups";
import { useFormik } from 'formik';
import * as yup from 'yup';
import dayjs from "dayjs";

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';


const inputStyle = {marginBottom: 2}

export default function GroupForm() {

    const {uiData, setUiData} = useContext(UXContext)
    const initialData = uiData.action === 'update' ? {...uiData.object,
            role: {value: uiData.object.role, label: uiData.object.role_label}
        } : null

    const submitting = useRef(false)


    const validationSchema = yup.object({
        name: yup
            .string('Enter the name of the group')
            .required('Field name is required'),
    })

    const submit = async (values) => {
        values = {
            ...values,
        }
        if (submitting.current)
            return

        submitting.current = true

        //CREATE
        if (uiData.action=='create') {
            let res = await create_group(values)
            submitting.current = false
            if(res.ok) {
                setUiData({
                    ...uiData, dialog: false,
                    objectList: [res.group, ...uiData.objectList],
                    message: { open: true, text: `Group ${res.group.name} was added successfully!`}
                })
            } else {
                Object.entries(res.errors).map(([key, value]) => {
                    value.push('another thing')
                    formik.setFieldError(key, value.join(' | '))
                })
            }
        }

        //UPDATE
        else if (uiData.action=='update'){
            let res = await update_group(values)
            submitting.current = false
            if (res.ok) {
                const index = uiData.objectList.findIndex(object => object.id == res.group.id)
                let array = [...uiData.objectList]
                array[index] = res.group
                setUiData({...uiData, action: 'details',
                    objectList: [...array], object: res.group,
                    message: { open: true, text: `Group ${res.group.name} was edited successfully!`}
                })
            }
            else {}
                //TODO errors
        }
    }

    const initialValues = uiData.object ?
        {...uiData.object} : null

    const formik = useFormik({
        initialValues: initialValues || {
            name: '',
        },
        validationSchema: validationSchema,
        onSubmit: submit,
    })

    return <>
        <Typography sx={{fontWeight: 300, fontSize: '1.5rem', marginBottom: 3}}>
            {uiData.action == 'create' ? 'Adaugă grupă nouă' : `Editează grupa ${uiData.object.name}`}
            </Typography>
        <div>
        <form onSubmit={formik.handleSubmit}>
            <TextField fullWidth id="name" name="name" label="Nume" sx={inputStyle} size='small'
                value={formik.values.name} onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}/>

            {uiData.action == 'create' ?
            <Button color="primary" variant="contained" fullWidth type="submit">
                Adaugă
            </Button> :
            <Grid container justifyContent={'space-between'}>
                <Grid item>
                    <Button color="primary" variant="contained" size="small" fullWidth type="submit">
                        CONFIRMĂ
                    </Button>
                </Grid>
                <Grid item>
                    <Button onClick={() => {setUiData({...uiData, action: 'details'})}} color="error" variant="contained" size="small" fullWidth>
                        ANULARE
                    </Button>
                </Grid>
            </Grid>
            }
        </form>
        </div>
    </>
}