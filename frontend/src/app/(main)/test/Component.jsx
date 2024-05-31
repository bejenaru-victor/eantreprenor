'use client'

import { get_Test_Post } from "@/utils/fetch/lessons"

export default function Component() {

    const makeFetch = async () => {
        const data = await get_Test_Post()
        console.log(data)
    }

    return <>
        <button onClick={makeFetch} className="bg-slate-500 text-white rounded-md ml-10 p-4">
            Fetch and console.log data
        </button>
    </>
}