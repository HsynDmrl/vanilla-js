export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';

export const loginSuccess = (accessToken, refreshToken) => ({
  type: LOGIN_SUCCESS,
  payload: { accessToken, refreshToken },
});

export const refreshTokenSuccess = (accessToken) => ({
  type: REFRESH_TOKEN_SUCCESS,
  payload: { accessToken },
});

export const logout = () => ({
  type: LOGOUT,
});
