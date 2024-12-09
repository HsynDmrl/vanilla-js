// store.js
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
    if (typeof action === 'function') {
      return action(this.dispatch.bind(this));
    }
    this.state = this.reducer(this.state, action);
    this.listeners.forEach((listener) => listener());
  }
  

  subscribe(listener) {
    this.listeners.push(listener);
    // Aboneliği kaldırma işlevi döndür
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

export const store = new Store(rootReducer, {
  auth: {},
  app: {},
  user: {},
  language: {
    language: 'en', // Varsayılan dil
    translations: {}, // Başlangıçta boş bir çeviri nesnesi
    loading: false,
    error: null,
  },
});
