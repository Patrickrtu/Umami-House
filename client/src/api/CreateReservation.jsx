import axios from 'axios';

const API_BASE_URL = 'https://localhost:7184/api'; 

// ... other API functions ...

export const createReservation = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Reservations`, formData);
    return response.data;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
};