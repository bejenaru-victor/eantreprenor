import { get_access_token } from "./token"

export async function get_user(accessToken){
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+`dj-rest-auth/user/`, {
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
    const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+`groups/${id}/`, {
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
    return null
}

export async function get_groups(){
    const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"groups/", {
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
    return []
}

export async function get_group_form_options() {
    const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"group/form_options/", {
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
    return []
}

export async function create_group(values){
    const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"groups/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
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
    const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+`groups/${data.id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
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
    const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+`groups/${id}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
    })
    return {ok: res.ok}
}

export async function add_course_to_group(group, course) {
    const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+`add_course_to_group/${group}/${course}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
    })
    return await res.json()
}

export async function delete_lessons_from_group(group, lessons) {
    const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+`delete_lessons_from_group/${group}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(lessons)
    })
    return await res.json()
}

export async function get_groups_by_user() {
    const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+`groups_by_user/`, {
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

export async function get_group_next_lesson(id) {
    const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+`next_lesson/${id}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
    })
    if (res.ok) {
        const data = await res.json()
        return data.lesson
    }
    return null
}

export async function create_session(data) {
    const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+`create_session/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const data = await res.json()
        return data
    }
    return null
}

export async function end_session(data) {
    const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+`end_session/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const data = await res.json()
        return data
    }
    return null
}

export async function get_session_users(session) {
    const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+`get_session_users/${session}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        }
    })
    if (res.ok) {
        const data = await res.json()
        return data
    }
    return null
}