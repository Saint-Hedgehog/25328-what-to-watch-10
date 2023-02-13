import {createSlice} from '@reduxjs/toolkit';
import {AuthUserProcess} from '../../types/state';
import {NameSpace} from '../../const';
// import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
// import errorHandle from '../../services/error-handle';

const initialState: AuthUserProcess = {
  user: null,
  error: null,
  isFetching: false,
};

export const authUserProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    checkAuthorizationRequest: (state) => {
      state.error = null;
      state.isFetching = true;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    checkAuthorizationError: (state, action) => {
      state.error = action.payload;
      state.isFetching = false;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(checkAuthAction.pending, (state) => {
  //       state.error = null;
  //       state.isFetching = true;
  //     })
  //     .addCase(checkAuthAction.fulfilled, (state, action) => {
  //       state.user = action.payload;
  //     })
  //     .addCase(checkAuthAction.rejected, (state, error) => {
  //       state.isFetching = false;
  //       errorHandle(error);
  //     });

  //   builder
  //     .addCase(loginAction.pending, (state) => {
  //       state.error = null;
  //       state.isFetching = true;
  //     })
  //     .addCase(loginAction.fulfilled, (state, action) => {
  //       state.user = action.payload;
  //     })
  //     .addCase(loginAction.rejected, (state, error) => {
  //       state.isFetching = false;
  //       errorHandle(error);
  //     });

  //   builder
  //     .addCase(logoutAction.pending, (state) => {
  //       state.error = null;
  //       state.isFetching = true;
  //     })
  //     .addCase(logoutAction.fulfilled, (state, action) => {
  //       state.user = null;
  //     })
  //     .addCase(logoutAction.rejected, (state, error) => {
  //       state.isFetching = false;
  //       errorHandle(error);
  //     });
  // }
});

export const {
  checkAuthorizationRequest,
  setUserData,
  checkAuthorizationError
} = authUserProcess.actions;
