import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {SimilarFilmsData} from '../../types/state';

const initialState: SimilarFilmsData = {
  similarFilms: [],
  isFetching: false,
};

export const similarFilmsData = createSlice({
  name: NameSpace.Similar,
  initialState,
  reducers: {
    loadSimilarFilmsRequest: (state) => {
      state.isFetching = true;
    },
    loadSimilarFilmsSuccess: (state, action) => {
      state.similarFilms = action.payload;
      state.isFetching = false;
    },
    loadSimilarFilmsError: (state) => {
      state.isFetching = false;
    },
  },
});

export const {
  loadSimilarFilmsSuccess,
  loadSimilarFilmsRequest,
  loadSimilarFilmsError
} = similarFilmsData.actions;
