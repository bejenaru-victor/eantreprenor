import { get_access_token } from "./token"

export async function logout_user(){
    const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"dj-rest-auth/logout/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
    })
    if (res.ok) {
        const data = await res.json()
        return data
    }
    return []
}