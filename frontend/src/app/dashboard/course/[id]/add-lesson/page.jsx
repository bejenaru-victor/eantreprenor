import { get_Course_Lesson_Data } from "@/utils/fetch/courses"
import CreateLesson from "@/components/forms/CreateLesson"
import Loading from "../loading"

export default async function Page({params}) {
    const data = await get_Course_Lesson_Data(params.id)

    return <>
        <div className='max-w-screen-xl mx-auto px-4 py-12'>
            <CreateLesson data={data.data} />
        </div>
    </>
}