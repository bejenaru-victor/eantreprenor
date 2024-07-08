import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import GroupUsers from '@/components/models/group_users/GroupUsers'
import FileList from '@/components/models/group_users/components/FileList'
import FileUploader from '@/components/models/group_users/components/FileUploader'
import { get_group } from '@/utils/fetch/groups'
import { notFound } from 'next/navigation'


export const dynamicParams = false

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page({params}) {

    const session = await getServerSession(authOptions)
    const group = await get_group(params.id)

    if (!group)
        return notFound()

    return <>
        <div className='max-w-screen-xl mx-auto px-4 py-12'>
            <GroupUsers group={group} />
            <FileList files={group.files_data} 
                options={session?.user?.roles_list.includes("Admin") ? true : false} />
            <FileUploader groupId={group.id} />
        </div>
    </>
}