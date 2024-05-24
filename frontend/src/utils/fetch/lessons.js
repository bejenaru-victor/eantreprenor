import axios from 'axios'

export async function get_Lessons(course_id) {
    const response = await axios.get(`http://127.0.0.1:8000/backend/lessons/?course=${course_id}`)
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