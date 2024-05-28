import Link from 'next/link'
import CastForEducationIcon from '@mui/icons-material/CastForEducation';

export default async function Page() {
    return <>
        <div className='max-w-screen-xl mx-auto px-4 py-12'>
            <h1 className="text-4xl font-light">DASHBOARD</h1>
            <h4 className="text-lg mt-1 text-gray-700">work in progress...</h4>
            <div className="my-4 bg-gray-700 w-12 h-[0.2rem] rounded-full"></div>
            <div className='flex mt-14'>
                <Link href='/my-courses'>
                    <div className='bg-slate-800 font-semibold text-gray-50 cursor-pointer hover:bg-slate-900 hover:text-white hover:shadow-md transition-all px-5 py-3 rounded-full'>
                        <CastForEducationIcon />
                        &nbsp;My courses
                    </div>
                </Link>
            </div>
        </div>
    </>
}