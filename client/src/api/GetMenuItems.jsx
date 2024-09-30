import axios from 'axios';

const API_BASE_URL = 'http://localhost:5016/api'; 

// ... other API functions ...

export const getMenuItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/MenuItems`);
    return response.data;
  } catch (error) {
    console.error('Error getting menu items:', error);
    throw error;
  }
};