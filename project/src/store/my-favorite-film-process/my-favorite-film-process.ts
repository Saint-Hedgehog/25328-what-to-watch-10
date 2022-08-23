import {MyFavoriteFilmsData} from '../../types/state';
import {NameSpace} from '../../const';
import {createSlice} from '@reduxjs/toolkit';

const initialState: MyFavoriteFilmsData = {
  films: [],
  isFetching: false,
  error: null,
};

export const myFavoriteFilmsProcess = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {
    loadFavoriteFilmsRequest: (state) => {
      state.isFetching = true;
    },
    loadFavoriteFilmsSuccess: (state, action) => {
      state.films = action.payload;
      state.isFetching = false;
    },
    loadFavoriteFilmsError: (state) => {
      state.isFetching = false;
    },
    changeFavoriteFilmRequest: (state) => {
      state.isFetching = true;
    },
    changeFavoriteFilmSuccess: (state) => {
      state.isFetching = false;
    },
    changeFavoriteFilmError: (state) => {
      state.isFetching = false;
    },
  },
});

export const {
  loadFavoriteFilmsRequest,
  loadFavoriteFilmsSuccess,
  loadFavoriteFilmsError,
  changeFavoriteFilmRequest,
  changeFavoriteFilmSuccess,
  changeFavoriteFilmError,
} = myFavoriteFilmsProcess.actions;
