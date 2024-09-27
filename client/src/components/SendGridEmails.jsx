import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const generateConfirmationNumber = () => {
    return Math.random().toString(36).substring(2, 11).toUpperCase();
};

export const sendReservationConfirmation = async (reservationData) => {
    console.log('Initiating confirmation email send process');
    try {
        const response = await axios.post(`${API_BASE_URL}/send-confirmation-email`, reservationData);
        console.log('Email confirmation sent successfully');
        return response.data;
    } catch (error) {
        console.error('Error sending confirmation email');
        throw error;
    }
};