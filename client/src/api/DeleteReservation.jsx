import axios from 'axios';

const API_BASE_URL = 'https://localhost:5016/api';

export const deleteReservation = async (reservationId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/Reservations/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting reservation:', error);
    throw error;
  }
};

export default deleteReservation;
