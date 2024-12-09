
// authActions.js
import { loginService, refreshTokenService, logoutService } from '../../../services/authService.js';
import { loginSuccess, logout as logoutAction, refreshTokenSuccess } from './actionTypes.js';
import { store } from '../../../store/store.js';
import { setToken, setRefreshToken, removeRefreshToken } from '../../../services/tokenService.js';
import { registerService } from '../../../services/authService.js';

// Asenkron login işlemi
export const login = async (credentials, rememberMe) => {
  try {
    const { accessToken, refreshToken } = await loginService(credentials);  // authService çağrısı


    // Her durumda access token'ı kaydet
    setToken(accessToken);

    // Eğer rememberMe seçilmişse, refresh token'ı da kaydet
    if (rememberMe) {
      setRefreshToken(refreshToken);
    } else {
      // Eğer rememberMe seçilmemişse, refresh token'ı kaldır
      removeRefreshToken();
    }

    // Store'u güncelle
    store.dispatch(loginSuccess(accessToken, refreshToken));

  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout işlemi
export const logoutUser = () => {
  try {
    // Token'ları ve refresh token'ı sil
    logoutService();

    // Store'daki isAuthenticated durumunu false yap
    store.dispatch(logoutAction());
    console.log('Logout successful!');
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

// Token yenileme işlemi
export const refreshToken = async (dispatch, getState) => {
  const state = getState();
  const refreshToken = state.auth.refreshToken;

  try {
    const { accessToken } = await refreshTokenService(refreshToken);  // authService çağrısı

    // Yeni token'ı kaydet
    setToken(accessToken);

    // Store'u güncelle
    dispatch(refreshTokenSuccess(accessToken));
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
};

// Register işlemi
export const register = async (userData) => {
  try {
    const user = await registerService(userData); // Register işlemi
    // Store'a kaydedilen kullanıcı bilgisi
    return user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error; // Hata durumunda error fırlatıyoruz
  }
};