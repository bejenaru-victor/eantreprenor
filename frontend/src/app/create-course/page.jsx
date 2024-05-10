'use client'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { styled } from '@mui/material/styles';

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

export default function Page() {
    return <>
        <div className='max-w-screen-xl mx-auto px-4 py-12'>
            <h1 className='text-4xl font-light mb-10'>Create new course</h1>
            <div className="grid lg:gap-8 xl:gap-16 lg:grid-cols-12">
                <div className='col-span-6 bg-stone-400 rounded-lg shadow-lg flex'>
                    <div className='mx-auto my-auto'>
                        <ImageOutlinedIcon className='text-white text-[5rem]' />
                    </div>
                </div>
                <div className="col-span-6 p-5">
                    <TextField fullWidth id="standard-basic" label="Course title" 
                        variant="standard" size='large' multiline
                        inputProps={{style: {fontSize: '1.7rem'}, className: 'leading-tight'}} 
                        InputLabelProps={{style: {fontSize: '1.4rem'}}} />
                    <TextField label="Description" fullWidth multiline rows={4}
                        variant="outlined" size='large' 
                        className='mt-10'
                        inputProps={{style: {fontSize: '1.2rem'}, className: 'leading-tight'}} />
                    <Button component="label" role={undefined} variant="contained" tabIndex={-1}
                        startIcon={<CloudUploadIcon />} 
                        className='bg-stone-400 hover:bg-stone-500 rounded-full mt-10'>
                        Upload image
                            <VisuallyHiddenInput type="file" />
                        </Button>
                </div>
            </div>
            <Button className='mt-10 float-end clear-right bg-cyan-600 hover:bg-cyan-700 rounded-full' variant="contained" size='large'>
                Save draft
            </Button>
            <div className='clear-right'></div>
        </div>
    </>
}