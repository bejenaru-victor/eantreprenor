import { get_access_token } from "./token"

export async function get_user(accessToken){
    const res = await fetch(process.env.NEXT_PUBLIC_API_ROOT+`dj-rest-auth/user/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
    })
    if (res.ok) {
        const data = await res.json()
        return data
    }
    else {
        const responseData = await res.json()
        return {ok: false, errors: responseData}
    }
}

export async function get_group(id){
    //const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_ROOT+`groups/${id}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //"Authorization": `Bearer ${accessToken}`,
        },
    })
    if (res.ok) {
        const data = await res.json()
        console.log('fetch data is working:', data)
        return data
    }
    return null
}

export async function get_groups(){
    //const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_ROOT+"groups/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //"Authorization": `Bearer ${accessToken}`,
        },
    })
    if (res.ok) {
        const data = await res.json()
        return data
    }
    return []
}

export async function create_group(values){
    //const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_ROOT+"groups/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            //"Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(values),
    })
    if (res.ok) {
        const data = await res.json()
        return {ok: true, group: data}
    }
    else {
        const responseData = await res.json()
        return {ok: false, errors: responseData}
    }
}


export async function update_group(data){
    //const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_ROOT+`groups/${data.id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            //"Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
    })
    if (res.ok) {
        const data = await res.json()
        return {ok: true, group: data}
    }
    else {
        const responseData = await res.json()
        return {ok: false, errors: responseData}
    }
}

export async function delete_group(id){
    //const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_ROOT+`groups/${id}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            //"Authorization": `Bearer ${accessToken}`,
        },
    })
    return {ok: res.ok}
}

export async function get_groups_by_user() {
    const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_ROOT+`groups_by_user/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        cache: 'no-store'
    })
    if (res.ok) {
        const data = await res.json()
        return data.groups
    }
    return null
}