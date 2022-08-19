import {createSlice} from '@reduxjs/toolkit';
import {AuthUserProcess} from '../../types/state';
import {NameSpace} from '../../const';

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
});

export const {
  checkAuthorizationRequest,
  setUserData,
  checkAuthorizationError
} = authUserProcess.actions;
