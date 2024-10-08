import axios from 'axios';

const API_BASE_URL = 'http://localhost:5016/api'; 

export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Reservations`, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
};