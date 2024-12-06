// apiCall.js
import { store } from '../store/store.js';
import { setLoading, setLoaded, incrementCounter, decrementCounter } from '../store/actions.js';

const BASE_API_URL = './'; // API URL'nizi burada tanımlayın

const apiCall = async (url, options = {}) => {
  // Loading durumu başlat ve counter'ı artır
  store.dispatch(setLoading());
  store.dispatch(incrementCounter());

  const fullUrl = BASE_API_URL + url;

  try {
    const response = await fetch(fullUrl, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(options.body) || null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error with API call:', error);
    throw error;
  } finally {
    // Loader'ı durdur ve counter'ı azalt
    store.dispatch(setLoaded());
    store.dispatch(decrementCounter());
  }
};

export default apiCall;
