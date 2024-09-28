import axios from 'axios';

const API_BASE_URL = 'https://localhost:7184/api';

export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Reservations`, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
};