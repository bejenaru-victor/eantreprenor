import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import Link from 'next/link'
import CastForEducationIcon from '@mui/icons-material/CastForEducation'
import FileList from "@/components/models/group_users/components/FileList"
import { get_group_files } from "@/utils/fetch/files"
import DashboardFileList from "@/components/pages/DashboardFileList"

export default async function Page() {

    const session = await getServerSession(authOptions)


    const admin_components = (
        <div className='flex mt-14'>
            <Link href='/my-courses' className='mr-5'>
                <div className='bg-slate-800 font-semibold text-gray-50 cursor-pointer hover:bg-slate-900 hover:text-white hover:shadow-md transition-all px-5 py-3 rounded-full'>
                    <CastForEducationIcon />
                    &nbsp;My courses
                </div>
            </Link>
            <Link href='/dashboard/groups'>
                <div className='bg-slate-800 font-semibold text-gray-50 cursor-pointer hover:bg-slate-900 hover:text-white hover:shadow-md transition-all px-5 py-3 rounded-full'>
                    <CastForEducationIcon />
                    &nbsp;Groups
                </div>
            </Link>
        </div>
    )

    return <>
        <div className='max-w-screen-xl mx-auto px-4 py-12'>
            <h1 className="text-4xl font-light">DASHBOARD</h1>
            <div className="my-4 bg-gray-700 w-12 h-[0.2rem] rounded-full"></div>

            {session?.user?.roles_list.includes("Admin") && admin_components}
            <DashboardFileList user_id={session?.user?.id} />

        </div>
    </>
}