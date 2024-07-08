'use client'

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import 'react-quill/dist/quill.snow.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createLesson } from '@/utils/actions/create_lesson';

import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'], ['code'],
      ['clean']
    ],
    syntax: {
        highlight: text => hljs.highlightAuto(text).value
    }
  }

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'code'
  ]

export default function CreateLesson({data}) {

    const router = useRouter()
    const [title, setTitle] = useState('')
    const [value, setValue] = useState('')
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[])

    return <>
        <h3 className="text-lg text-gray-700 tracking-tight">
            <span className='font-bold'>COURSE: </span>
            <span className='font-medium'>{data.name}</span>
        </h3>
        <h1 className="text-2xl font-normal mt-3">
            <span className="font-medium">Lesson #{data.lesson}: </span>
            {title}
        </h1>
        <div className="mt-6 mb-10 bg-gray-700 w-12 h-[0.2rem] rounded-full"></div>
        <form action={async (formData) => {
                formData.append('description', value)
                const res = await createLesson(formData, data.id)
                console.log(res)
                //router.push(`/dashboard/course/${data.id}`)
            }
        }>
            <div className="grid lg:gap-8 xl:gap-16 lg:grid-cols-12">
                <div className="col-span-12">
                    <TextField onChange={(e) => setTitle(e.target.value)} fullWidth id="standard-basic" label="Lesson title" 
                        variant="standard" size='large' multiline name='title'
                        inputProps={{style: {fontSize: '1.7rem'}, className: 'leading-tight'}} 
                        InputLabelProps={{style: {fontSize: '1.4rem'}}} />
                    <div className='mt-10'></div>
                    <TextField fullWidth id="standard-basic" label="Video link" 
                        variant="outlined" size='large' multiline name='video_link'
                        inputProps={{style: {fontSize: '1.2rem'}, className: 'leading-tight'}} 
                         />
                    
                    <div className='mt-10'></div>
                    {/*<TextField label="Description (TODO RTE)" fullWidth multiline rows={4}
                        variant="outlined" size='large' name='description'
                        inputProps={{style: {fontSize: '1.2rem'}, className: 'leading-tight'}} />*/}
                    <ReactQuill className='mt-10' theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} />
                    <div onClick={() => {console.log(value)}}>Show wassup</div>
                </div>
            </div>
            <Button className='mt-10 float-end clear-right bg-cyan-600 hover:bg-cyan-700 rounded-full' variant="contained" size='large' type='submit'>
                Save lesson
            </Button>
            <div className='clear-right'></div>
        </form>
    </>
}