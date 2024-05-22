import { get_Course_Lesson_Data } from "@/utils/fetch/courses"

export default async function Page({params}) {
    const data = await get_Course_Lesson_Data(params.id)

    return <>
        <div className='max-w-screen-xl mx-auto px-4 py-12'>
            <h3 className="text-lg text-gray-700 tracking-tight">
                <span className='font-bold'>COURSE: </span>
                <span className='font-medium'>{data.data.name}</span>
            </h3>
            <h1 className="text-4xl font-light mt-3">
                Lesson <span className="font-medium">#{data.data.lesson}</span>
            </h1>
            <div className="mt-6 mb-10 bg-gray-700 w-12 h-[0.2rem] rounded-full"></div>
            <div className="">Here comes the form of the lesson</div>
        </div>
    </>
}