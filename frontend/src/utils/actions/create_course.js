'use server'

import axios from 'axios'

// export const createCourse = async (formData) => {
//     const title = formData.get("title")
//     const description = formData.get("description")
//     const file = formData.get("image")
// }

export const createCourse = async (formData) => {
  const hello = await axios.get('http://127.0.0.1:8000/api/courses/')
  console.log('This is the hello status',  hello.status)
    try {
      // Extract the necessary data
      const title = formData.get('title');
      const description = formData.get('description');
      const file = formData.get('image');
  
      // Build the data for the API
      const courseData = new FormData();
      courseData.append('name', title);
      courseData.append('description', description);
      courseData.append('image', file); 
      courseData.append('author', 1)
  
      // Make the POST request
      const response = await axios.post(
        'http://127.0.0.1:8000/api/courses/',
        courseData,
        {
          headers: {
            //'Content-Type': 'multipart/form-data' 
          }
        }
      ).catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  
      if (response.status === 201) {
        // Course created successfully
        return { success: true, message: 'Course created!', data: response.data };
      } else {
        throw new Error(`API request failed with status ${response.status}`);
      }
    } catch (error) {
      // Handle errors
      console.error('Error creating course:', error);
      return { success: false, message: 'Failed to create course.' };
    }
  }