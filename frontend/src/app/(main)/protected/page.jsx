import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"

export const dynamic = 'force-dynamic'

export default async function Page() {
    const session = await getServerSession(authOptions)
    console.log(session)
    return <>
        <h3 className='text-3xl text-center mt-5'>
            This is a protected page
        </h3>
        <p className='text-xl text-center mt-5'>
            {session?.access}
        </p>
    </>
}