import Link from 'next/link'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import LowPriorityIcon from '@mui/icons-material/LowPriority'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

function getYouTubeVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export default function CourseDetails({course, lessons}) {
    return <>
        <div className="grid lg:gap-8 xl:gap-16 lg:grid-cols-12">
            <div className="col-span-6 flex">
                <div className="my-auto w-full">
                    <h1 className="text-2xl">
                        {course.name}
                    </h1>
                    <div className="my-6 bg-gray-700 w-12 h-[0.2rem] rounded-full"></div>
                    <p className="text-lg text-gray-600">
                        {course.description}
                    </p>
                </div>
            </div>
            <div className='col-span-6 flex '>
                <div className="my-auto">
                    <div className="w-100 aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
                        <img src={course.image} alt="Preview" className='w-full h-full object-cover' />
                    </div>
                </div>
            </div>
        </div>
        <h3 className="text-2xl font-light mt-20">Lessons</h3>
        <div className="mt-4 mb-8 bg-gray-600 w-[8.5rem] h-[0.1rem] rounded-full"></div>
        <div className="grid lg:gap-8 xl:gap-10 lg:grid-cols-12">
            {lessons.map(lesson => 
                <div className="col-span-4 bg-slate-800 text-gray-50 rounded-md shadow-lg overflow-hidden">
                    <img className='w-full aspect-video object-cover' 
                        src={`https://img.youtube.com/vi/${getYouTubeVideoId(lesson.video_link)}/0.jpg`} />
                    <div className='p-5'>
                        <div className='flex'>
                            <div className='flex-1'>
                                <h3 className='text-lg'>{lesson.name}</h3>
                            </div>
                            <div className='flex'>
                                <PlayCircleIcon sx={{fontSize: '2rem', ml: 'auto', my: 'auto'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
        <div className='flex gap-5 mt-10 mb-20'>
            <Link href={`/dashboard/course/${course.id}/add-lesson`}>
                <div className='bg-slate-800 font-semibold text-gray-50 cursor-pointer hover:bg-slate-900 hover:text-white hover:shadow-md transition-all px-5 py-3 rounded-full'>
                    <AddCircleIcon />
                    &nbsp;Add Lesson
                </div>
            </Link>
            <Link href={`/dashboard/course/${course.id}/add-lesson`}>
                <div className='bg-slate-800 font-semibold text-gray-50 cursor-pointer hover:bg-slate-900 hover:text-white hover:shadow-md transition-all px-5 py-3 rounded-full'>
                    <LowPriorityIcon />
                    &nbsp;Change order
                </div>
            </Link>
        </div>
    </>
}