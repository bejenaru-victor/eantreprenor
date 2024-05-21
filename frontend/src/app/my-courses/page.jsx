import Link from 'next/link'

export default function Page() {
    return <>
        <h1><Link href='/create-course'>Button Add course</Link></h1>
        <h1><Link href='/dashboard/course/1/'>Button to the course</Link></h1>
        <h1>You don&apos;t have any courses published yet</h1>
        <h1>Drafts:</h1>
        <h1>Published:</h1>
    </>
}