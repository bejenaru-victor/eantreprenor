import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import StripeWrapper from "@/components/utils/StripeWrapper"
import { get_Course } from "@/utils/fetch/courses"

export default async function Page({params}) {

    const session = await getServerSession(authOptions)

    const course = await get_Course(params.id)
    const user = session?.user?.id

    return <>
        <div className='max-w-screen-xl mx-auto px-4 py-12'>
            <h1 className="text-2xl">
                Checkout
            </h1>
            <div className="my-6 bg-gray-700 w-12 h-[0.2rem] rounded-full"></div>
            <h3 className="text-lg text-gray-700 tracking-tight mb-10">
                <span className='font-medium'>40$</span> - 
                <span className='font-bold'> COURSE: </span>
                <span className='font-medium'>{course.name}</span>
            </h3>
            <StripeWrapper metadata={{course: course.id, user: user, price: 4000}} />
        </div>
    </>
}