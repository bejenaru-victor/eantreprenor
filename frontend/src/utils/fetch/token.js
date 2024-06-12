import { getSession } from 'next-auth/react'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Router from 'next/navigation'

export async function get_access_token(){
    try {
        const session = await getSession() || await getServerSession(authOptions)
        if (!session || !session?.access) {
            Router.reload()
            return 'error'
        }
        return session.access
    } catch(e) {return 'error'}
}

export async function refresh_token(token) {
    const res = await fetch(process.env.API_ROOT+"dj-rest-auth/token/refresh/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            refresh: token
        }),
    })
    if (res.status == 200) {
        const refresh = await res.json()
        // Any object returned will be saved in `user` property of the JWT
        return refresh
    }

    return null
}