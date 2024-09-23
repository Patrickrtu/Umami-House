import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com/api'; // Replace with your actual API URL

// ... other API functions ...

export const createTakeoutOrder = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/takeout`, formData);
    return response.data;
  } catch (error) {
    console.error('Error creating takeout order:', error);
    throw error;
  }
};