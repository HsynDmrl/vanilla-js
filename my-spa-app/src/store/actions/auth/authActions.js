import { loginService, refreshTokenService, logoutService } from '../../../services/authService.js';
import { loginSuccess, logout as logoutAction, refreshTokenSuccess } from './actionTypes.js';
import { store } from '../../../store/store.js';
import { setToken, setRefreshToken, removeRefreshToken } from '../../../services/tokenService.js';
import { registerService } from '../../../services/authService.js';

export const login = async (credentials, rememberMe) => {
  try {
    const { accessToken, refreshToken } = await loginService(credentials); 
    setToken(accessToken);

    if (rememberMe) {
      setRefreshToken(refreshToken);
    } else {
      removeRefreshToken();
    }

    store.dispatch(loginSuccess(accessToken, refreshToken));

  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logoutUser = () => {
  try {
    logoutService();

    store.dispatch(logoutAction());
    console.log('Logout successful!');
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

export const refreshToken = async (dispatch, getState) => {
  const state = getState();
  const refreshToken = state.auth.refreshToken;

  try {
    const { accessToken } = await refreshTokenService(refreshToken);  
    setToken(accessToken);

    dispatch(refreshTokenSuccess(accessToken));
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const user = await registerService(userData); 
    return user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error; 
  }
};