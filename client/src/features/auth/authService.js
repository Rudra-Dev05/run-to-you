import axiosInstance from '../../app/axios';

const API_URL = '/users';

// Register user
const register = async (userData) => {
  try {
    console.log('Sending registration request with:', userData);
    const response = await axiosInstance.post(API_URL + '/register', userData);
    
    console.log('Registration response:', response.data);
    
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

// Login user
const login = async (userData) => {
  const response = await axiosInstance.post(API_URL + '/login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// Get user profile
const getProfile = async () => {
  const response = await axiosInstance.get(API_URL + '/me');
  return response.data;
};

// Update user profile
const updateProfile = async (profileData) => {
  const response = await axiosInstance.put(API_URL + '/me', profileData);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
};

export default authService; 