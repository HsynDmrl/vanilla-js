import { store } from '../../../store/store.js';

export function translate(key) {
  const state = store.getState();
  const { translations } = state.language;
  return translations[key] || key; 
}
