import Groups from "@/components/models/groups/Groups";
import AppWrapper from "@/components/utils/AppWrapper";

export default function Page() {
    return <>
        <div className='max-w-screen-xl mx-auto px-4 py-12'>
            <AppWrapper>
                <Groups />
            </AppWrapper>
        </div>
    </>
}