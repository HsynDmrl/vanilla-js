import { fetchCSRFToken } from '../core/utils/csrfToken/fetchCSRFToken.js';

const csrfTokenService = {
  // CSRF token'ı cookie'den al
  getCSRFToken: fetchCSRFToken, // Daha önce tanımlanan fonksiyonu doğrudan bağla

  // CSRF token'ı cookie'ye güvenli şekilde kaydet
  setCSRFToken: function(token) {
    // Secure ve SameSite güvenlik önlemleri ekliyoruz
    document.cookie = `csrfToken=${token}; path=/; Secure; SameSite=Strict`; // HttpOnly frontend'de mümkün değil
  },

  // CSRF token'ı cookie'den sil
  removeCSRFToken: function() {
    document.cookie = 'csrfToken=; Max-Age=-99999999; path=/'; // Token'ı silmek için expire zamanı verdik
  },
};

// Fonksiyonları dışa aktar
export const { setCSRFToken, getCSRFToken, removeCSRFToken } = csrfTokenService;
