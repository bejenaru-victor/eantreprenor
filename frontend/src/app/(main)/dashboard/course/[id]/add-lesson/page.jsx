import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { get_Course_Lesson_Data } from "@/utils/fetch/courses"
import CreateLesson from "@/components/forms/CreateLesson"


export default async function Page({params}) {

    const session = await getServerSession(authOptions)
    const data = await get_Course_Lesson_Data(params.id)

    return <>
        <div className='max-w-screen-xl mx-auto px-4 py-12'>
            {session?.user?.id == data.data.author ? <CreateLesson data={data.data} /> : '403 FORBIDDEN'}
            
        </div>
    </>
}