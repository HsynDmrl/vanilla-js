import { store } from '../../store/store.js';
import { setLoading, setLoaded, incrementCounter, decrementCounter, loginSuccess, logout } from '../../store/actions.js';
import { getToken, getRefreshToken } from '../../services/tokenService.js';

const BASE_API_URL = ''; 

const apiCall = async (url, options = {}) => {
  store.dispatch(setLoading());
  store.dispatch(incrementCounter());

  const fullUrl = BASE_API_URL + url;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(fullUrl, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : null,
    });
    //console.log('reasfsadfsponse', response);
    if (response.status === 401 && url !== '/auth/refresh-token') {
      const refreshed = await handleRefreshToken();
      if (refreshed) {
        return apiCall(url, options);
      } else {
        throw new Error('Session expired. Please log in again.');
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error with API call:', error);
    throw error;
  } finally {
    store.dispatch(setLoaded());
    store.dispatch(decrementCounter());
  }
};

async function handleRefreshToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    store.dispatch(logout());
    return false;
  }

  try {
    const response = await fetch(BASE_API_URL + '/auth/refresh-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      store.dispatch(logout());
      return false;
    }

    const { accessToken } = await response.json();
    store.dispatch(loginSuccess(accessToken, refreshToken));
    return true;
  } catch (error) {
    console.error('Error refreshing token:', error);
    store.dispatch(logout());
    return false;
  }
}

export default apiCall;
