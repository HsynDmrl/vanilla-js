import createSlice from '../createSlice.js';
import createAsyncThunk from '../asyncActions.js';
import { getLanguage } from '../../services/languageService.js';

const initialState = {
  language: 'en',
  translations: {},
  loading: false,
  error: null,
};

export const setLanguage = createAsyncThunk(
  'CHANGE_LANGUAGE',
  async (language) => {
    return await getLanguage(language);
  }
);


const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
    setTranslations(state, action) {
      state.translations = action.payload;
    },
  },
  extraReducers: {
    'CHANGE_LANGUAGE/pending': (state) => {
      state.loading = true;
      state.error = null;
    },
    'CHANGE_LANGUAGE/fulfilled': (state, action) => {
      state.loading = false;
      state.language = action.payload.language;
      state.translations = action.payload.translations;
    },
    'CHANGE_LANGUAGE/rejected': (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },  
});

  

export const languageReducer = languageSlice.reducer;
export const languageActions = languageSlice.actions;
