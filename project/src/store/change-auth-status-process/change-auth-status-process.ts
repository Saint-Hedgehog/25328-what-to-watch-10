import {createSlice} from '@reduxjs/toolkit';
import {ChangeAuthStatusProcess} from '../../types/state';
import {AuthorizationStatus, NameSpace} from '../../const';

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
});

export const {
  checkAuthStatusRequest,
  checkAuthStatusSuccess,
  checkAuthStatusError,
  changeAuthStatus,
} = changeAuthStatusProcess.actions;
