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
            .string('Introduceți numele grupei')
            .required('Numele este obligatoriu'),
        teacher: yup.object().shape({
                id: yup.number(),//.required('object is required'),
                name: yup.string()//.required('object is required'),
            })
            //.oneOf(uiData.formOptions.clients, 'Aici pusca')
            .required('Selectarea instructorului este obligatorie'),
        weekday: yup.object().shape({
                id: yup.number(),//.required('object is required'),
                name: yup.string()//.required('object is required'),
            }).required('Selectarea zilei de curs este obligatorie'),
        starting_at: yup.string().required(),
        ending_at: yup.string().required(),
    })

    const submit = async (values) => {
        values = {
            ...values,
            teacher: values.teacher.value,
            weekday: values.weekday.value,
            starting_at: dayjs(values.starting_at).format('HH:mm'),
            ending_at: dayjs(values.ending_at).format('HH:mm'),
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
                    message: { open: true, text: `Grupa ${res.group.name} a fost adăugată cu succes!`}
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
                    message: { open: true, text: `Grupa ${res.group.name} a fost editată cu succes!`}
                })
            }
            else {}
                //TODO errors
        }
    }

    const initialValues = uiData.object ?
        {...uiData.object,
            teacher: uiData.formOptions.teachers.find(teacher => teacher.value === uiData.object.teacher),
            weekday: uiData.formOptions.weekdays.find(weekday => weekday.value === uiData.object.weekday),
            starting_at: dayjs(uiData.object.starting_at, "HH:mm:ss"),
            ending_at: dayjs(uiData.object.ending_at, "HH:mm:ss"),
        } : null

    const formik = useFormik({
        initialValues: initialValues || {
            name: '',
            teacher: null,
            starting_at: null,
            ending_at: null,
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
            <Autocomplete disablePortal fullWidth sx={inputStyle} size='small'
                id="teacher" name="teacher"
                options={uiData.formOptions.teachers}
                getOptionLabel={(teacher) => teacher.label}
                value={formik.values.teacher}
                onChange={(e, value) => formik.setFieldValue('teacher', value)}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderInput={(params) => 
                    <TextField {...params} label="Instructor"
                        error={formik.touched.teacher && Boolean(formik.errors.teacher)}
                        helperText={formik.touched.teacher && formik.errors.teacher}/>
                    }
            />

            <Grid container spacing={{xs: 0, sm: 1}}>

                <Grid item xs={12} sm={4} >
                    <Autocomplete disablePortal fullWidth sx={inputStyle} size='small'
                        id="weekday" name="weekday"
                        options={uiData.formOptions.weekdays}
                        getOptionLabel={(weekday) => weekday.label}
                        value={formik.values.weekday}
                        onChange={(e, value) => formik.setFieldValue('weekday', value)}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        renderInput={(params) => 
                            <TextField {...params} label="Ziua săptămânii"
                                error={formik.touched.weekday && Boolean(formik.errors.weekday)}
                                helperText={formik.touched.weekday && formik.errors.weekday}/>
                            }
                    />
                </Grid>

                <Grid item xs={12} sm={4} >
                    <MobileTimePicker
                        slotProps={{ textField: {
                            size: 'small', fullWidth: true,
                            error: Boolean(formik.touched.starting_at && Boolean(formik.errors.starting_at)),
                            helperText: formik.touched.starting_at && formik.errors.starting_at, },
                        }}
                        id="starting_at" name="starting_at" sx={inputStyle} label="De la"
                        value={formik.values.starting_at} ampm={false} minutesStep={15}
                        onChange={(newValue) => formik.setFieldValue('starting_at', newValue)}
                    />
                </Grid>

                <Grid item xs={12} sm={4} >
                    <MobileTimePicker
                        slotProps={{ textField: {
                            size: 'small', fullWidth: true,
                            error: Boolean(formik.touched.ending_at && Boolean(formik.errors.ending_at)),
                            helperText: formik.touched.ending_at && formik.errors.ending_at, },
                        }}
                        id="ending_at" name="ending_at" sx={inputStyle} label="Până la"
                        value={formik.values.ending_at} ampm={false} minutesStep={15}
                        onChange={(newValue) => formik.setFieldValue('ending_at', newValue)}
                    />
                </Grid>

            </Grid>

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