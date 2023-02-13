import {PromoFilmData} from '../../types/state';
import {NameSpace} from '../../const';
import {createSlice} from '@reduxjs/toolkit';
import { loadPromoFilmAction } from '../api-actions';
import errorHandle from '../../services/error-handle';

const initialState: PromoFilmData = {
  film: null,
  isFetching: false,
  error: null,
};

export const promoFilmData = createSlice({
  name: NameSpace.PromoFilm,
  initialState,
  reducers: {
    // loadPromoFilmRequest: (state) => {
    //   state.isFetching = true;
    // },
    // loadPromoFilmSuccess: (state, action) => {
    //   state.film = action.payload;
    //   state.isFetching = false;
    // },
    // loadPromoFilmError: (state, action) => {
    //   state.isFetching = false;
    //   state.error = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPromoFilmAction.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(loadPromoFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isFetching = false;
      })
      .addCase(loadPromoFilmAction.rejected, (state, error) => {
        state.isFetching = false;
        errorHandle(error);
      });
  }
});

// export const {
//   loadPromoFilmRequest,
//   loadPromoFilmSuccess,
//   loadPromoFilmError,
// } = promoFilmData.actions;
