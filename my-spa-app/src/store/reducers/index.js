import { authReducer } from './authReducer.js';
import { appReducer } from './appReducer.js';
import userReducer from './userReducer.js';
import { languageReducer } from './languageReducer.js';

export function rootReducer(state = {}, action) {
  return {
    auth: authReducer(state.auth || {}, action),
    app: appReducer(state.app || {}, action),
    user: userReducer(state.user || {}, action),
    language: languageReducer(state.language || {}, action),
  };
}

