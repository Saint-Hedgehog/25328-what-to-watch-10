import { loadCommentsAction } from '../api-actions';
import { commentsData } from './comments-process';
import { makeFakeComments } from '../../utils/mocks';

// import {
//   commentsData,
//   loadCommentsRequest,
//   loadCommentsSuccess,
//   loadCommentsError
// } from './comments-process';

const fakeComments = makeFakeComments();

describe('Редьюсер: CommentsData', () => {
  it('без дополнительных параметров должен возвращать начальное состояние', () => {
    expect(commentsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        comments: [],
        isFetching: false,
      });
  });

  it('должен перевести isFetching в true', () => {
    const state = {
      comments: [],
      isFetching: false,
    };
    expect(commentsData.reducer(state, {type: loadCommentsAction.pending.type }))
      .toEqual({
        comments: [],
        isFetching: true,
      });
  });

  it('должен сохранить comments в store', () => {
    const state = {
      comments: [],
      isFetching: true,
    };
    expect(commentsData.reducer(state, { type: loadCommentsAction.fulfilled.type, payload: fakeComments }))
      .toEqual({
        comments: fakeComments,
        isFetching: false,
      });
  });

  it('при возникновении ошибки isFetching становится false', () => {
    const state = {
      comments: fakeComments,
      isFetching: true,
    };
    expect(commentsData.reducer(state, {type: loadCommentsAction.rejected.type}))
      .toEqual({
        comments: fakeComments,
        isFetching: false,
      });
  });
});

export {};
