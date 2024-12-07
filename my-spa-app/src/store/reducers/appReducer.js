import { SET_CONTENT } from '../actions.js';

const initialState = {
  content: ' ',
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONTENT:
      return { ...state, content: action.payload };
    default:
      return state;
  }
}
