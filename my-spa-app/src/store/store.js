// store/store.js
import { appReducer } from '../store/reducers/appReducer.js';

export class Store {
  constructor(reducers, initialState = {}) {
    this.state = initialState;
    this.reducers = reducers;
    this.listeners = [];

    this.getState = this.getState.bind(this);
    this.dispatch = this.dispatch.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    this.state = this.reducers(this.state, action);
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }
}

// Store'u başlat
export const store = new Store(appReducer, { counter: 0, loading: false });
