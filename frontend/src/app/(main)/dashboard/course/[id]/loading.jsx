import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
    return <>
        <div className='w-full h-[60vh] flex'>
            <div className='mx-auto my-auto'>
                <CircularProgress sx={{color: '#333'}} />
            </div>
        </div>
    </>
}