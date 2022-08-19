import {FilmData} from '../../types/state';
import {NameSpace} from '../../const';
import {createSlice} from '@reduxjs/toolkit';

const initialState: FilmData = {
  film: null,
  isFetching: false,
  error: null,
};

export const filmData = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    loadFilmByIdRequest: (state) => {
      state.isFetching = true;
    },
    loadFilmByIdSuccess: (state, action) => {
      state.film = action.payload;
      state.isFetching = false;
    },
    loadFilmByIdError: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loadFilmByIdRequest,
  loadFilmByIdSuccess,
  loadFilmByIdError,
  resetError,
} = filmData.actions;
