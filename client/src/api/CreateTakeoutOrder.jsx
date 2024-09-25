import axios from 'axios';

const API_BASE_URL = 'https://localhost:7184/api'; 

// ... other API functions ...

export const createTakeoutOrder = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/TakeoutOrders`, formData);
    return response.data;
  } catch (error) {
    console.error('Error creating takeout order:', error.response?.data || error.message);
    throw error;
  }
};