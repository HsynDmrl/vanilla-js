// actions.js
export const SET_LOADING = 'SET_LOADING';
export const SET_LOADED = 'SET_LOADED';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

// Aksiyon oluşturucular
export const setLoading = () => ({ type: SET_LOADING });
export const setLoaded = () => ({ type: SET_LOADED });
export const incrementCounter = () => ({ type: INCREMENT_COUNTER });
export const decrementCounter = () => ({ type: DECREMENT_COUNTER });
