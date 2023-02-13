import {FilmData} from '../../types/state';
import {NameSpace} from '../../const';
import {createSlice} from '@reduxjs/toolkit';
import { loadFilmByIdAction } from '../api-actions';
import errorHandle from '../../services/error-handle';

const initialState: FilmData = {
  film: null,
  isFetching: false,
  error: null,
};

export const filmData = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    // loadFilmByIdRequest: (state) => {
    //   state.isFetching = true;
    // },
    // loadFilmByIdSuccess: (state, action) => {
    //   state.film = action.payload;
    //   state.isFetching = false;
    // },
    // loadFilmByIdError: (state, action) => {
    //   state.isFetching = false;
    //   state.error = action.payload;
    // },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFilmByIdAction.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(loadFilmByIdAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isFetching = false;
      })
      .addCase(loadFilmByIdAction.rejected, (state, error) => {
        state.isFetching = false;
        errorHandle(error);
      });
  }
});

export const {
  // loadFilmByIdRequest,
  // loadFilmByIdSuccess,
  // loadFilmByIdError,
  resetError,
} = filmData.actions;
