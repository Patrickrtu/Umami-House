import axios from 'axios';

const API_BASE_URL = 'https://localhost:5016/api'; 

// ... other API functions ...

export const getAvailableTables = async (capacity) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Tables/byCapacity?capacity=${capacity}`);
    return response.data;
  } catch (error) {
    console.error('Error getting tables:', error);
    throw error;
  }
};
