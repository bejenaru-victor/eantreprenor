'use client'

import React from 'react'
import {useDropzone} from 'react-dropzone'

import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function FileUploader({groupId}) {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
        {file.path} - {file.size} bytes
        </li>
    ));

    const handleUpload = async () => {
        console.log(acceptedFiles)
        const formData = new FormData();
        formData.append('group_id', groupId)
        acceptedFiles.forEach((file) => {
            formData.append('files', file)
        })

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_ROOT+'bulk-upload/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Files uploaded successfully:', data);
                location.reload();
            } else {
                console.error('Error uploading files:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading files:', error);
        }

    }

    return <>
        <section className="container mt-10 mb-10">
        <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <p>Upload files</p>
            <CloudUploadIcon />
        </div>
        <aside>
            <h4 className='mt-4 mb-2'>Files</h4>
            <ul>{files}</ul>
        </aside>
        </section>
        <div className='flex'>
            <div onClick={handleUpload} className='bg-slate-800 font-semibold text-gray-50 cursor-pointer hover:bg-slate-900 hover:text-white hover:shadow-md transition-all px-5 py-3 rounded-full'>
                <CloudUploadIcon />
                &nbsp;Upload
            </div>
        </div>
    </>
}