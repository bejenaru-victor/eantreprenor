import CourseDetails from "@/components/pages/CourseDetails"
import { get_Course } from "@/utils/fetch/courses"
import { get_Lessons } from "@/utils/fetch/lessons"

export default async function Page({params}) {
    const course = await get_Course(params.id)
    const lessons = await get_Lessons(params.id)

    console.log(lessons)

    return <>
        <div className='max-w-screen-xl mx-auto px-4 py-12'>
            <CourseDetails course={course} lessons={lessons} />
        </div>
    </>
}