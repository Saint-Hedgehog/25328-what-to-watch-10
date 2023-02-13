import {MyFavoriteFilmsData} from '../../types/state';
import {NameSpace} from '../../const';
import {createSlice} from '@reduxjs/toolkit';
import { changeFavoriteFilmStatusAction, loadFavoriteFilmsAction } from '../api-actions';
import errorHandle from '../../services/error-handle';

const initialState: MyFavoriteFilmsData = {
  films: [],
  isFetching: false,
  error: null,
};

export const myFavoriteFilmsProcess = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {
    // loadFavoriteFilmsRequest: (state) => {
    //   state.isFetching = true;
    // },
    // loadFavoriteFilmsSuccess: (state, action) => {
    //   state.films = action.payload;
    //   state.isFetching = false;
    // },
    // loadFavoriteFilmsError: (state) => {
    //   state.isFetching = false;
    // },
    // changeFavoriteFilmRequest: (state) => {
    //   state.isFetching = true;
    // },
    // changeFavoriteFilmSuccess: (state) => {
    //   state.isFetching = false;
    // },
    // changeFavoriteFilmError: (state) => {
    //   state.isFetching = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavoriteFilmsAction.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(loadFavoriteFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isFetching = false;
      })
      .addCase(loadFavoriteFilmsAction.rejected, (state, error) => {
        state.isFetching = false;
        errorHandle(error);
      });

    builder
      .addCase(changeFavoriteFilmStatusAction.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(changeFavoriteFilmStatusAction.fulfilled, (state, action) => {
        state.isFetching = false;
      })
      .addCase(changeFavoriteFilmStatusAction.rejected, (state, error) => {
        state.isFetching = false;
        errorHandle(error);
      });
  }
});

// export const {
//   loadFavoriteFilmsRequest,
//   loadFavoriteFilmsSuccess,
//   loadFavoriteFilmsError,
//   changeFavoriteFilmRequest,
//   changeFavoriteFilmSuccess,
//   changeFavoriteFilmError,
// } = myFavoriteFilmsProcess.actions;
