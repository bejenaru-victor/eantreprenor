'use client'

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import OptionsButton from './OptionsButton';


const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 13,
    },
  }));

function fileNameUrl(url) {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

export default function FileList({files, options=false}) {
    if (!files)
        return

    return <>
        <h3 className='mt-10 text-xl font-medium mb-4'>Shared files</h3>
        <div className="grid max-w-screen-xl mx-auto lg:grid-cols-12 gap-5 mt-7 mb-10">
            {files.map((file) => 
                <div key={file.file} className="col-span-4 flex flex-row border-2 border-slate-300 hover:border-slate-400 transition-colors shadow-lg p-5 rounded-xl cursor-pointer">
                    <div className="basis-full p-3 overflow-y-hidden">
                    {/*fileNameUrl(file.file)*/}
                        <LightTooltip title={fileNameUrl(file.file)} placement="bottom">
                            <span className="block overflow-hidden overflow-ellipsis whitespace-nowrap">
                                {fileNameUrl(file.file)}
                            </span>
                        </LightTooltip>
                    </div>
                    <div className="basis-auto flex">
                        <a href={file.file} target="_blank" download className='mx-auto my-auto mr-2'>
                            <CloudDownloadIcon sx={{color: '#444'}} />
                        </a>
                        {options && 
                        <span className='mx-auto my-auto'>
                            <OptionsButton fileId={file.id} />
                        </span>}
                    </div>
                </div>
            )}
            
        </div>
    </>
}