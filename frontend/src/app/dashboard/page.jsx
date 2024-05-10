import { auth } from "@/auth"
import Link from 'next/link'

export default async function Page() {
    const session = await auth()

    if (!session || !session.user || 
        !(session.user.roles_list.includes('Publisher') ||
        session.user.roles_list.includes('Admin')))
        return 403

    console.log(session)

    return <>
        <div><Link href='/my-courses'>My courses</Link></div>
    </>
}