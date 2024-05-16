import CreateCourse from '@/components/forms/CreateCourse';


export default function Page() {
    return <>
        <div className='max-w-screen-xl mx-auto px-4 py-12'>
            <h1 className='text-4xl font-light mb-10'>Create new course</h1>
            <CreateCourse />
        </div>
    </>
}