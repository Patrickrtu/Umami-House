import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com/api'; // Replace with your actual API URL

// ... other API functions ...

export const createReservation = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reservations`, formData);
    return response.data;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
};