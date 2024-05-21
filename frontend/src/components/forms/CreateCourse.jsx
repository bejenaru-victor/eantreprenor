'use client'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { styled } from '@mui/material/styles';
import { createCourse } from '@/utils/actions/create_course';
import { useState } from 'react';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function CreateCourse() {

    const [imageSrc, setImageSrc] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setImageSrc(imageUrl)
        }
    }

    return <>
        <form action={async (formData) => {
                const res = await createCourse(formData)
                console.log(res)
            }
        }>
            <div className="grid lg:gap-8 xl:gap-16 lg:grid-cols-12">
                <div className='col-span-6 bg-stone-400 rounded-lg shadow-lg flex aspect-[16/9] overflow-hidden'>
                    {imageSrc ? 
                        <img src={imageSrc} alt="Preview" className='w-full h-full object-cover' />
                        :
                        <div className='mx-auto my-auto'>
                            <ImageOutlinedIcon className='text-white text-[5rem]' />
                        </div>
                    }
                </div>
                <div className="col-span-6 p-5">
                    <TextField fullWidth id="standard-basic" label="Course title" 
                        variant="standard" size='large' multiline name='title'
                        inputProps={{style: {fontSize: '1.7rem'}, className: 'leading-tight'}} 
                        InputLabelProps={{style: {fontSize: '1.4rem'}}} />
                    
                    <div className='mt-10'></div>
                    <TextField label="Description" fullWidth multiline rows={4}
                        variant="outlined" size='large' name='description'
                        inputProps={{style: {fontSize: '1.2rem'}, className: 'leading-tight'}} />
                    
                    <div className='mt-10'></div>
                    <Button component="label" role={undefined} variant="contained" tabIndex={-1}
                        startIcon={<CloudUploadIcon />} 
                        className='bg-stone-400 hover:bg-stone-500 rounded-full'>
                        Upload image
                        <VisuallyHiddenInput type="file" name='image' accept="image/*" onChange={handleImageChange} />
                    </Button>
                </div>
            </div>
            <Button className='mt-10 float-end clear-right bg-cyan-600 hover:bg-cyan-700 rounded-full' variant="contained" size='large' type='submit'>
                Save draft
            </Button>
            <div className='clear-right'></div>
        </form>
    </>
}