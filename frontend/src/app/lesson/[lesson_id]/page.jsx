import LessonView from "@/components/pages/LessonView"
import { get_Lesson, get_Next_Prev } from "@/utils/fetch/lessons"


export default async function Page({params}) {
    const lesson = await get_Lesson(params.lesson_id)
    const next_prev = await get_Next_Prev(params.lesson_id)

    const next_id = next_prev.data.next
    const prev_id = next_prev.data.previous


    return <>
        {lesson ? <LessonView lesson={lesson} next_prev={next_prev} /> : 
        <>Forbidden (TODO FORBIDDEN COMPONENT)</>}
    </>
}