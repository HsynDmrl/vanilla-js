import { rootReducer } from './reducers/index.js';

class Store {
  constructor(reducer, initialState = {}) {
    this.state = initialState;
    this.reducer = reducer;
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action); // rootReducer çağrılıyor
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }
}

export const store = new Store(rootReducer, { auth: {}, app: {} });
