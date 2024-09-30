import axios from 'axios';

export const getReservations = async () => {
  try {
    const response = await axios.get('https://localhost:5016/api/Reservations');
    return response.data;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
};

export default getReservations;
