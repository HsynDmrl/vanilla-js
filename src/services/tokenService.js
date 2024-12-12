import { decodeToken } from '../core/utils/decodeToken/decodeToken.js';

const tokenService = {
  getToken: function() {
    return decodeToken('accessToken');
  },

  setToken: function(token) {
    document.cookie = `accessToken=${token}; path=/; Secure; SameSite=Strict`;
  },

  removeToken: function() {
    document.cookie = 'accessToken=; Max-Age=-99999999; path=/';
  },

  getRefreshToken: function() {
    return decodeToken('refreshToken');
  },

  setRefreshToken: function(token) {
    document.cookie = `refreshToken=${token}; path=/; Secure; SameSite=Strict`;
  },

  removeRefreshToken: function() {
    document.cookie = 'refreshToken=; Max-Age=-99999999; path=/';
  }
};

export const { setToken, getToken, removeToken, getRefreshToken, setRefreshToken, removeRefreshToken } = tokenService;
