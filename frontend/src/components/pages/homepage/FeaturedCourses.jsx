import Link from 'next/link'
import { get_Courses } from '@/utils/fetch/courses';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';


export default async function FeaturedCourses() {

    const courses = await get_Courses()

    return <>
        <div className='max-w-screen-xl mx-auto px-4 py-12'>
            <h1 className="text-2xl font-normal">Featured Courses</h1>

            <div className="my-4 bg-gray-700 w-12 h-[0.2rem] rounded-full"></div>
            <div className="grid lg:gap-8 xl:gap-10 lg:grid-cols-12 mt-8">
                {courses.map(course => {if (course.published) return (
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
                )})}
            </div>
        </div>
    </>
}