import axios from 'axios'
import { get_access_token } from './token';

export async function get_Lessons(course_id) {
    const accessToken = await get_access_token()
    const res = await fetch(process.env.API_ROOT+`lessons/?course=${course_id}`, {
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

export async function get_Lesson(id) {
    const accessToken = await get_access_token()
    const res = await fetch(process.env.API_ROOT+`lessons/${id}`, {
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

export async function get_Next_Prev(id) {
    const response = await axios.get(process.env.API_ROOT+`next_prev/${id}`)
    .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
    });

    return response.data
}