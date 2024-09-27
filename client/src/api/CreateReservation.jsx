import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const createReservation = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Reservations`, formData);
    console.log('Reservation created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating reservation:', error.response ? error.response.data : error.message);
    throw error;
  }
};