'use server'

//import axios from 'axios'


export const createLesson = async (formData, course_id) => {
    try {
      const data = new FormData();
      data.append('name', formData.get('title'));
      data.append('video_link', formData.get('video_link')); 
      data.append('description', formData.get('description'));
      data.append('course', course_id);
  
      const response = await fetch(`${process.env.API_ROOT}lessons/`, {
        method: 'POST',
        body: data
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API request failed with status ${response.status}: ${JSON.stringify(errorData)}`);
      }
  
      const responseData = await response.json();
      return { success: true, message: 'Lesson created!', data: responseData };
  
    } catch (error) {
      console.error('Error creating lesson:', error.message);
      return { success: false, message: 'Failed to create lesson.', error: error.message };
    }
  }