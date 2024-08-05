'use client'

import LoginForm from "@/components/forms/Login"
import { Suspense } from 'react'

export default function Page() {
    return <><Suspense><LoginForm /></Suspense></>
}