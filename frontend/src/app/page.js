'use client'

import { auth } from "@/auth"

export default async function Home() {
    const session = await auth()

    if (!session.user) return null

    console.log(session)

    return <h1 className="text-6xl text-center font-extralight mt-10">LANDING PAGE</h1>
}
