import axios from 'axios'
import { get_access_token } from './token';

export async function get_Course(id) {
    const response = await axios.get(process.env.API_ROOT+`courses/${id}`,{
        headers: {
          'Cache-Control': 'no-store'
        }
    })
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

export async function get_Course_Lesson_Data(id) {
    const response = await axios.get(process.env.API_ROOT+`get-course-lesson-data/${id}`)
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

export async function get_Courses() {
    const response = await axios.get(process.env.API_ROOT+`courses/`)
    .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.requestp) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
    });

    return response.data
}

export async function get_Owned_Courses() {
    const accessToken = await get_access_token();
    const url = new URL(`${process.env.API_ROOT}courses/`);
    url.searchParams.append('owned', 'true');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        const error = await response.json();
        console.error('Error:', error);
        throw new Error('Failed to fetch owned courses');
    }
}

export async function edit_course(id, value) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_ROOT+`courses/${id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            published: value,
        }),
    })
    if (res.status == 200) {
        const data = await res.json()
        // Any object returned will be saved in `user` property of the JWT
        return data
    }

    return null
}

export async function get_Course_Ownership(course_id){
    const accessToken = await get_access_token()
    const res = await fetch(process.env.NEXT_PUBLIC_API_ROOT + `course_ownership/${course_id}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
    });
    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        return {ok: false, error: 'Request error'};
    }
}