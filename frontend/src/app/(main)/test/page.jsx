import { get_Test_Post } from "@/utils/fetch/lessons"
import Component from "./Component"

export default async function Page() {
    const post_data = await get_Test_Post()

    return <>
        <h3 className='text-center text-3xl mt-5'>{post_data.data}</h3>
        <Component />
    </>
}