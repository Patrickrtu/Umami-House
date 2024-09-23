import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com/api'; // Replace with your actual API URL

// ... other API functions ...

export const getMenuItems = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/menu`, formData);
    return response.data;
  } catch (error) {
    console.error('Error getting menu items:', error);
    throw error;
  }
};