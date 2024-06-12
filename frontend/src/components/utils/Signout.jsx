'use client'

import { logout_user } from "@/utils/fetch/users"
import { signOut } from "next-auth/react"
import { useEffect } from "react"

export default function SignOut() {
    useEffect(() => {
        const fn = async () => {
            await logout_user()
            signOut({callbackUrl: '/login'})
        }
        fn()
    }, [])

    return (null)
}