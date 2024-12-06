// reducers/appReducer.js
import { SET_LOADING, SET_LOADED, INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions.js';

const initialState = {
  counter: 0,
  loading: false,
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case SET_LOADED:
      return { ...state, loading: false };
    case INCREMENT_COUNTER:
      return { ...state, counter: state.counter + 1 };
    case DECREMENT_COUNTER:
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
}
