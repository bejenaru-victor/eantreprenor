import axios from 'axios'

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