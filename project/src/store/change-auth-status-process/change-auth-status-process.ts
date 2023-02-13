import {createSlice} from '@reduxjs/toolkit';
import {ChangeAuthStatusProcess} from '../../types/state';
import {AuthorizationStatus, NameSpace} from '../../const';
// import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
// import errorHandle from '../../services/error-handle';

const initialState: ChangeAuthStatusProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isFetching: false,
};

export const changeAuthStatusProcess = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {
    checkAuthStatusRequest: (state) => {
      state.isFetching = true;
    },
    checkAuthStatusSuccess: (state) => {
      state.isFetching = false;
    },
    checkAuthStatusError: (state) => {
      state.isFetching = false;
    },
    changeAuthStatus: (state, action) => {
      state.authorizationStatus = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(checkAuthAction.pending, (state) => {
  //       state.isFetching = true;
  //     })
  //     .addCase(checkAuthAction.fulfilled, (state, action) => {
  //       state.authorizationStatus = AuthorizationStatus.Auth;
  //       state.isFetching = false;
  //     })
  //     .addCase(checkAuthAction.rejected, (state, error) => {
  //       state.isFetching = false;
  //       errorHandle(error);
  //     });

  //   builder
  //     .addCase(loginAction.pending, (state) => {
  //       state.isFetching = true;
  //     })
  //     .addCase(loginAction.fulfilled, (state, action) => {
  //       state.authorizationStatus = AuthorizationStatus.Auth;
  //       state.isFetching = false;
  //     })
  //     .addCase(loginAction.rejected, (state, error) => {
  //       state.isFetching = false;
  //       errorHandle(error);
  //     });

  //   builder
  //     .addCase(logoutAction.pending, (state) => {
  //       state.isFetching = true;
  //     })
  //     .addCase(logoutAction.fulfilled, (state, action) => {
  //       state.authorizationStatus = AuthorizationStatus.NoAuth;
  //       state.isFetching = false;
  //     })
  //     .addCase(logoutAction.rejected, (state, error) => {
  //       state.isFetching = false;
  //       errorHandle(error);
  //     });
  // }
});

export const {
  checkAuthStatusRequest,
  checkAuthStatusSuccess,
  checkAuthStatusError,
  changeAuthStatus,
} = changeAuthStatusProcess.actions;
