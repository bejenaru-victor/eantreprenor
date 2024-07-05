import FileList from "@/components/models/group_users/components/FileList"
import { get_group_files } from "@/utils/fetch/files"

export default async function DashboardFileList({user_id}) {

    const files = await get_group_files(user_id)

    return <FileList files={files.files.data} />
}