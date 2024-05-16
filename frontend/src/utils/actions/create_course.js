'use server'

import axios from 'axios'

// export const createCourse = async (formData) => {
//     const title = formData.get("title")
//     const description = formData.get("description")
//     const file = formData.get("image")
// }

export const createCourse = async (formData) => {
    try {
      // Extract the necessary data
      const title = formData.get('title');
      const description = formData.get('description');
      const file = formData.get('image');
  
      // Build the data for the API
      const courseData = new FormData();
      courseData.append('title', title);
      courseData.append('description', description);
      courseData.append('image', file); 
  
      // Make the POST request
      const response = await axios.post(
        'http://localhost:8000/courses/', // Replace with your actual API endpoint
        courseData,
        {
          headers: {
            'Content-Type': 'multipart/form-data' 
          }
        }
      );
  
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