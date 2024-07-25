import Link from 'next/link'
import { get_Owned_Courses } from '@/utils/fetch/courses';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function UserOwnedCourses() {

    const courses = await get_Owned_Courses()

    console.log('this are the courses', courses)

    return <>
        <h3 className='mt-10 text-xl font-medium mb-4'>My courses</h3>
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
    </>
}