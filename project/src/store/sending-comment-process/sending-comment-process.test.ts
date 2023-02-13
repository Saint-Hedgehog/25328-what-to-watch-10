import {CommentSendingStatus} from '../../const';
import { sendCommentAction } from '../api-actions';
import { resetCommentSendingStatus, sendingCommentProcess } from './sending-comment-process';
// import {
//   sendingCommentProcess,
//   sendCommentRequest,
//   sendCommentSuccess,
//   sendCommentError,
//   resetCommentSendingStatus
// } from './sending-comment-process';

describe('Редьюсер: sendingCommentProcess', () => {
  it('без дополнительных параметров должен возвращать начальное состояние', () => {
    expect(sendingCommentProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(
        {
          isFetching: false,
          error: null,
          commentSendingStatus: CommentSendingStatus.Unknown,
        }
      );
  });

  it('должен перевести isFetching в true', () => {
    const state = {
      isFetching: false,
      error: null,
      commentSendingStatus: CommentSendingStatus.Unknown,
    };
    expect(sendingCommentProcess.reducer(state, { type: sendCommentAction.pending.type }))
      .toEqual({
        isFetching: true,
        error: null,
        commentSendingStatus: CommentSendingStatus.Unknown,
      });
  });

  it('должен перевести commentSendingStatus в Success', () => {
    const state = {
      isFetching: false,
      error: null,
      commentSendingStatus: CommentSendingStatus.Unknown,
    };
    expect(sendingCommentProcess.reducer(state, { type: sendCommentAction.fulfilled.type }))
      .toEqual({
        isFetching: false,
        error: null,
        commentSendingStatus: CommentSendingStatus.Success,
      });
  });

  it('должен сохранить error в store и перевести commentSendingStatus в Error', () => {
    const state = {
      isFetching: false,
      error: null,
      commentSendingStatus: CommentSendingStatus.Unknown,
    };
    expect(sendingCommentProcess.reducer(state, { type: sendCommentAction.rejected.type }))
      .toEqual({
        isFetching: false,
        error: {error: 'Error'},
        commentSendingStatus: CommentSendingStatus.Error,
      });
  });

  it('должен перевести commentSendingStatus в Unknown', () => {
    const state = {
      isFetching: false,
      error: null,
      commentSendingStatus: CommentSendingStatus.Success,
    };
    expect(sendingCommentProcess.reducer(state, resetCommentSendingStatus()))
      .toEqual({
        isFetching: false,
        error: null,
        commentSendingStatus: CommentSendingStatus.Unknown,
      });
  });
});
