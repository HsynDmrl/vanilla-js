export default function createSlice({ name, initialState, reducers, extraReducers }) {
    const actions = {};
  
    // Reducer fonksiyonları
    for (const [key, reducer] of Object.entries(reducers)) {
      const type = `${name}/${key}`;
      actions[key] = (payload) => ({ type, payload });
      reducers[type] = reducer; // Aksiyon türlerini reducer'larla eşleştir
    }
  
    // Reducer fonksiyonu
    const reducer = (state = initialState, action) => {
        if (reducers[action.type]) {
            reducers[action.type](state, action);
          } else if (extraReducers && extraReducers[action.type]) {
            extraReducers[action.type](state, action);
          }
          
      return state;
    };
  
    return { actions, reducer };
  }
