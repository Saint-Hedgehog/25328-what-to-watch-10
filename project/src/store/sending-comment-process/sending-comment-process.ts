import {createSlice} from '@reduxjs/toolkit';
import {CommentSendingStatus, NameSpace} from '../../const';
import {SendingCommentData} from '../../types/state';

const initialState: SendingCommentData = {
  isFetching: false,
  error: null,
  commentSendingStatus: CommentSendingStatus.Unknown,
};

export const sendingCommentProcess = createSlice({
  name: NameSpace.SendingComment,
  initialState,
  reducers: {
    sendCommentRequest: (state) => {
      state.isFetching = true;
      state.commentSendingStatus = CommentSendingStatus.Unknown;
    },
    sendCommentSuccess: (state) => {
      state.isFetching = false;
      state.error = null;
      state.commentSendingStatus = CommentSendingStatus.Success;
    },
    sendCommentError: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.commentSendingStatus = CommentSendingStatus.Error;
    },
    resetCommentSendingStatus: (state) => {
      state.commentSendingStatus = CommentSendingStatus.Unknown;
    },
  },
});

export const {
  sendCommentRequest,
  sendCommentSuccess,
  sendCommentError,
  resetCommentSendingStatus,
} = sendingCommentProcess.actions;
