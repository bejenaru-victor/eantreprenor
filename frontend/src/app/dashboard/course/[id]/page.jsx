import { get_Course } from "@/utils/fetch/courses"

export default async function Page() {
    const course = await get_Course(1)
    console.log(course)

    return <>This is the course: {course.name}</>
}