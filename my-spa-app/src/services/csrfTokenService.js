import { fetchCSRFToken } from '../core/utils/csrfToken/fetchCSRFToken.js';

const csrfTokenService = {
  getCSRFToken: fetchCSRFToken, 

  setCSRFToken: function(token) {
    document.cookie = `csrfToken=${token}; path=/; Secure; SameSite=Strict`;
  },

  removeCSRFToken: function() {
    document.cookie = 'csrfToken=; Max-Age=-99999999; path=/'; 
  },
};

export const { setCSRFToken, getCSRFToken, removeCSRFToken } = csrfTokenService;
