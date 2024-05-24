import { auth } from "@/auth"

export default async function Page() {
    const session = await auth()

    if (!session || !session.user) return null

    console.log(session)

    return <>
        <h1 className="text-4xl text-center font-light mt-10">LANDING PAGE</h1>
        <h4 className="text-center text-lg mt-2 text-gray-700">work in progress...</h4>
    </>
}
