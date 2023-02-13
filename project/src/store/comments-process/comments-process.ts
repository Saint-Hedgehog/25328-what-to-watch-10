import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {CommentsData} from '../../types/state';
import {loadCommentsAction} from '../api-actions';
import errorHandle from '../../services/error-handle';

const initialState: CommentsData = {
  comments: [],
  isFetching: false,
};

export const commentsData = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {
    // loadCommentsRequest: (state) => {
    //   state.isFetching = true;
    // },
    // loadCommentsSuccess: (state, action) => {
    //   state.comments = action.payload;
    //   state.isFetching = false;
    // },
    // loadCommentsError: (state) => {
    //   state.isFetching = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCommentsAction.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(loadCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isFetching = false;
      })
      .addCase(loadCommentsAction.rejected, (state, error) => {
        state.isFetching = false;
        errorHandle(error);
      });
  }
});

// export const {
//   loadCommentsSuccess,
//   loadCommentsRequest,
//   loadCommentsError
// } = commentsData.actions;
