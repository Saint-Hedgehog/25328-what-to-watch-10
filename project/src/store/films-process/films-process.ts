import {createSlice} from '@reduxjs/toolkit';
import {DEFAULT_GANRE, NameSpace} from '../../const';
import {FilmsData} from '../../types/state';

const initialState: FilmsData = {
  genre: DEFAULT_GANRE,
  films: [],
  isDataLoaded: false,
  error: null,
};

export const filmsData = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    loadFilmsRequest: (state) => {
      state.isDataLoaded = true;
      state.error = null;
    },
    loadFilmsSuccess: (state, action) => {
      state.films = action.payload;
      state.isDataLoaded = false;
    },
    loadFilmsError: (state, action) => {
      state.isDataLoaded = false;
      state.error = action.payload;
    },
    changeGenre: (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
    },
  },
});

export const {
  loadFilmsSuccess,
  loadFilmsRequest,
  loadFilmsError,
  changeGenre
} = filmsData.actions;
