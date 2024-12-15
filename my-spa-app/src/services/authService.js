import { mockApiCall } from '../../__test__/mockApiCall.js';
import { removeToken, removeRefreshToken } from './tokenService.js';
import userService from './userService.js'; 

export const loginService = async (credentials) => {
  const response = await mockApiCall('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return await response.json(); 
};

export const refreshTokenService = async (refreshToken) => {
  const response = await mockApiCall('/auth/refresh-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Token refresh failed');
  }

  return await response.json(); 
};


export const registerService = async (userData) => {
  try {
    const user = await userService.registerUser(userData); 
    return user;
  } catch (error) {
    console.error('Register service error:', error);
    throw error; 
  }
};

export const register = async (userData) => {
  try {
    const user = await registerService(userData);
    return user;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error; 
  }
};

export const logoutService = () => {
  removeToken();
  removeRefreshToken();
};
