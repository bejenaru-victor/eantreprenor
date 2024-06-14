import Link from 'next/link'
import { get_Lesson, get_Next_Prev } from "@/utils/fetch/lessons"
import { getYouTubeVideoId } from "@/utils/fn"
import Sanitized from '@/components/utils/Sanitized'


export default async function Page({params}) {
    const lesson = await get_Lesson(params.lesson_id)
    const next_prev = await get_Next_Prev(params.lesson_id)

    const next_id = next_prev.data.next
    const prev_id = next_prev.data.previous

    return <>
        <div className='w-full flex flex-col flex-1'>
            <div className="grid lg:gap-8 xl:gap-16 lg:grid-cols-12 flex-1 px-10">
                <div className="col-span-7 pt-10">
                    <iframe
                        className="aspect-video w-full shadow-lg rounded-lg"
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(lesson.video_link)}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded YouTube Video"
                    ></iframe>
                </div>
                <div className="col-span-5 relative">
                    <div className="absolute w-full h-full overflow-scroll py-10 px-4">
                        <h3 className='text-xl font-medium'>Transcript</h3>
                        <div className="my-6 bg-gray-700 w-12 h-[0.2rem] rounded-full"></div>
                        <Sanitized value={lesson.description} />
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-gray-400 w-full h-[0.1rem] rounded-full"></div>
        <div className='p-5 flex justify-between'>
            {prev_id ?
                <Link href={`/lesson/${prev_id}`}>
                    <div className='bg-slate-800 font-semibold text-gray-50 cursor-pointer hover:bg-slate-900 hover:text-white hover:shadow-md transition-all px-5 py-3 rounded-full'>
                        Previous Lesson
                    </div>
                </Link> :
            <div></div>
            }
            {next_id &&
                <Link href={`/lesson/${next_id}`}>
                    <div className='bg-slate-800 font-semibold text-gray-50 cursor-pointer hover:bg-slate-900 hover:text-white hover:shadow-md transition-all px-5 py-3 rounded-full'>
                        Next Lesson
                    </div>
                </Link>
            }
        </div>
    </>
}