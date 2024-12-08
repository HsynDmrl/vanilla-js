// authService.js
import { mockApiCall } from '../../__test__/mockApiCall.js';
import { removeToken, removeRefreshToken } from './tokenService.js';
// services/authService.js
import userService from './userService.js';  // userService importu

export const loginService = async (credentials) => {
  const response = await mockApiCall('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return await response.json();  // accessToken ve refreshToken döndürür
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

  return await response.json();  // Yeni accessToken döndürür
};


export const registerService = async (userData) => {
  try {
    const user = await userService.registerUser(userData); // userService'den registerUser fonksiyonu çağrılıyor
    return user;
  } catch (error) {
    console.error('Register service error:', error);
    throw error; // Hata oluşursa tekrar fırlatıyoruz
  }
};

// Register işlemi
export const register = async (userData) => {
  try {
    const user = await registerService(userData);
    // Burada başka işlemler yapılabilir, örneğin user bilgileri store'a kaydedilebilir
    return user;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error; // Bu hatayı da controller'a gönderiyoruz
  }
};

export const logoutService = () => {
  // Token'ları ve refresh token'ı sil
  removeToken();
  removeRefreshToken();
};
