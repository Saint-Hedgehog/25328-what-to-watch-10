import {createSlice} from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
import {CommentSendingStatus, NameSpace} from '../../const';
import errorHandle from '../../services/error-handle';
import {SendingCommentData} from '../../types/state';
import { sendCommentAction } from '../api-actions';

const initialState: SendingCommentData = {
  isFetching: false,
  error: null,
  commentSendingStatus: CommentSendingStatus.Unknown,
};

export const sendingCommentProcess = createSlice({
  name: NameSpace.SendingComment,
  initialState,
  reducers: {
    // sendCommentRequest: (state) => {
    //   state.isFetching = true;
    //   state.commentSendingStatus = CommentSendingStatus.Unknown;
    // },
    // sendCommentSuccess: (state) => {
    //   state.isFetching = false;
    //   state.error = null;
    //   state.commentSendingStatus = CommentSendingStatus.Success;
    // },
    // sendCommentError: (state, action) => {
    //   state.isFetching = false;
    //   state.error = action.payload;
    //   state.commentSendingStatus = CommentSendingStatus.Error;
    // },
    resetCommentSendingStatus: (state) => {
      state.commentSendingStatus = CommentSendingStatus.Unknown;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendCommentAction.pending, (state) => {
        state.isFetching = true;
        state.commentSendingStatus = CommentSendingStatus.Unknown;
        // toast('Review is sending');
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.isFetching = false;
        state.error = null;
        state.commentSendingStatus = CommentSendingStatus.Success;
        // toast('Review sent 👌');
      })
      .addCase(sendCommentAction.rejected, (state, error) => {
        state.isFetching = false;
        state.commentSendingStatus = CommentSendingStatus.Error;
        errorHandle(error);
        // toast('Send error 🤯');
      });
  }
});

export const {
  // sendCommentRequest,
  // sendCommentSuccess,
  // sendCommentError,
  resetCommentSendingStatus,
} = sendingCommentProcess.actions;
