import { LOGIN_SUCCESS, LOGOUT, REFRESH_TOKEN_SUCCESS } from '../actions/auth/actionTypes.js';

const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
      };

    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };

    case LOGOUT:
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
}
