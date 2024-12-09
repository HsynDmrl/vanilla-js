import { decodeToken } from '../core/utils/decodeToken/decodeToken.js';

const tokenService = {
  // Access token'ı cookie'den al
  getToken: function() {
    return decodeToken('accessToken'); // Cookie'den 'accessToken' değerini al
  },

  // Access token'ı cookie'ye güvenli şekilde kaydet
  setToken: function(token) {
    // Secure ve SameSite güvenlik önlemleri ekliyoruz
    document.cookie = `accessToken=${token}; path=/; Secure; SameSite=Strict`; // HttpOnly frontend'de mümkün değil
  },

  // Token'ı cookie'den sil
  removeToken: function() {
    document.cookie = 'accessToken=; Max-Age=-99999999; path=/'; // Token'ı silmek için expire zamanı verdik
  },

  // Refresh token'ı cookie'den al
  getRefreshToken: function() {
    return decodeToken('refreshToken'); // Cookie'den 'refreshToken' değerini al
  },

  // Refresh token'ı cookie'ye güvenli şekilde kaydet
  setRefreshToken: function(token) {
    // Secure ve SameSite güvenlik önlemleri ekliyoruz
    document.cookie = `refreshToken=${token}; path=/; Secure; SameSite=Strict`; // HttpOnly frontend'de mümkün değil
  },

  // Refresh token'ı cookie'den sil
  removeRefreshToken: function() {
    document.cookie = 'refreshToken=; Max-Age=-99999999; path=/'; // Refresh token'ı silmek için expire zamanı verdik
  }
};

// Fonksiyonları dışa aktar
export const { setToken, getToken, removeToken, getRefreshToken, setRefreshToken, removeRefreshToken } = tokenService;
