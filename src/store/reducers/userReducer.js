import {
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
  SET_USER,
} from '../actions/user/userActionTypes.js';

const initialState = {
  user: {
    username: null,
    email: null,
  },
  loading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null };

    case GET_USER_FAILURE:
    case UPDATE_USER_FAILURE:
      return { ...state, loading: false, error: action.error };

    case SET_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
}
