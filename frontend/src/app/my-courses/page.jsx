import Link from 'next/link'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { get_Courses } from '@/utils/fetch/courses';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

export default async function Page() {

    const courses = await get_Courses()

    console.log(courses)

    return <>
        <div className='max-w-screen-xl mx-auto px-4 py-12'>
            <h1 className="text-4xl font-light">MY COURSES</h1>
            <h4 className="text-lg mt-1 text-gray-700">work in progress...</h4>
            <div className="my-4 bg-gray-700 w-12 h-[0.2rem] rounded-full"></div>
            <div className="grid lg:gap-8 xl:gap-10 lg:grid-cols-12 mt-14">
                {courses.map(course => 
                    <div key={course.id} className="col-span-4 bg-slate-800 text-gray-50 rounded-md shadow-lg overflow-hidden">
                        <Link href={`/dashboard/course/${course.id}/`}>
                        <img className='w-full aspect-video object-cover' 
                            src={course.image} />
                        <div className='p-5'>
                            <div className='flex'>
                                <div className='flex-1'>
                                    <h3 className='text-md'>{course.name}</h3>
                                </div>
                                <div className='flex'>
                                    <PlayCircleIcon sx={{fontSize: '2rem', ml: 'auto', my: 'auto'}}/>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                )}
            </div>
            <div className='flex mt-14'>
                <Link href='/create-course'>
                    <div className='bg-slate-800 font-semibold text-gray-50 cursor-pointer hover:bg-slate-900 hover:text-white hover:shadow-md transition-all px-5 py-3 rounded-full'>
                        <AddCircleIcon />
                        &nbsp;Create course
                    </div>
                </Link>
            </div>
        </div>
        {/*
        <h1>You don&apos;t have any courses published yet</h1>
        <h1>Drafts:</h1>
        <h1>Published:</h1> */}
    </>
}