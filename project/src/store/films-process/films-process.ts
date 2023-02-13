import {createSlice} from '@reduxjs/toolkit';
import {DEFAULT_GANRE, NameSpace} from '../../const';
import { errorHandle } from '../../services/error-handle';
import {FilmsData} from '../../types/state';
import { loadFilmsAction } from '../api-actions';

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
  //   loadFilmsRequest: (state) => {
  //     state.isDataLoaded = true;
  //     state.error = null;
  //   },
  //   loadFilmsSuccess: (state, action) => {
  //     state.films = action.payload;
  //     state.isDataLoaded = false;
  //   },
  //   loadFilmsError: (state, action) => {
  //     state.isDataLoaded = false;
  //     state.error = action.payload;
  //   },
    changeGenre: (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFilmsAction.pending, (state) => {
        state.isDataLoaded = true;
        state.error = null;
      })
      .addCase(loadFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(loadFilmsAction.rejected, (state, error) => {
        state.isDataLoaded = false;
        errorHandle(error);
      });
  }
});

export const {
  // loadFilmsSuccess,
  // loadFilmsRequest,
  // loadFilmsError,
  changeGenre
} = filmsData.actions;
