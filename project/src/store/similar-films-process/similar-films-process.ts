import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import errorHandle from '../../services/error-handle';
import {SimilarFilmsData} from '../../types/state';
import { loadSimilarFilmsAction } from '../api-actions';

const initialState: SimilarFilmsData = {
  similarFilms: [],
  isFetching: false,
};

export const similarFilmsData = createSlice({
  name: NameSpace.Similar,
  initialState,
  reducers: {
    // loadSimilarFilmsRequest: (state) => {
    //   state.isFetching = true;
    // },
    // loadSimilarFilmsSuccess: (state, action) => {
    //   state.similarFilms = action.payload;
    //   state.isFetching = false;
    // },
    // loadSimilarFilmsError: (state) => {
    //   state.isFetching = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSimilarFilmsAction.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(loadSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.isFetching = false;
      })
      .addCase(loadSimilarFilmsAction.rejected, (state, error) => {
        state.isFetching = false;
        errorHandle(error);
      });
  }
});

// export const {
//   loadSimilarFilmsSuccess,
//   loadSimilarFilmsRequest,
//   loadSimilarFilmsError
// } = similarFilmsData.actions;
