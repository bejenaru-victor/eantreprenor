import CourseDetails from "@/components/pages/CourseDetails"
import { get_Course } from "@/utils/fetch/courses"

export default async function Page({params}) {
    const course = await get_Course(params.id)

    return <>
        <div className='max-w-screen-xl mx-auto px-4 py-12'>
            <CourseDetails course={course} />
        </div>
    </>
}