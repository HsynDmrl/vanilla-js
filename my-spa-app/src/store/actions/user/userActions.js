// store/actions/user/userActions.js
import {
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
  SET_USER,
} from './userActionTypes.js';
import userService from '../../../services/userService.js'; // userService'i import ediyoruz

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

// Kullanıcı verisini alma
export const getUserData = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  try {
    const userData = await userService.getUser(userId);
    dispatch({ type: GET_USER_SUCCESS, payload: userData });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, error: error.message });
  }
};

// Kullanıcı verisini güncelleme
export const updateUserData = (userId, userData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });

  try {
    const updatedUser = await userService.updateUser(userId, userData);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: updatedUser });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILURE, error: error.message });
  }
};
