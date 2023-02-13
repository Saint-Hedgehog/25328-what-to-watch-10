import {makeFakeUser} from '../../utils/mocks';
import { loginAction } from '../api-actions';
import { authUserProcess } from './auth-user-process';
// import {
//   authUserProcess,
//   checkAuthorizationRequest,
//   checkAuthorizationError,
//   setUserData
// } from './auth-user-process';

const fakeUser = makeFakeUser();

describe('Редьюсер: authUserProcess', () => {
  it('без дополнительных параметров должен возвращать начальное состояние', () => {
    expect(authUserProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(
        {
          user: null,
          error: null,
          isFetching: false,
        },
      );
  });

  it('должен перевести isFetching в true', () => {
    const state = {
      user: null,
      error: null,
      isFetching: false
    };
    expect(authUserProcess.reducer(state, { type: loginAction.pending.type }))
      .toEqual(
        {
          user: null,
          error: null,
          isFetching: true,
        },
      );
  });

  it('должен сохранить user в store', () => {
    const state = {
      user: null,
      error: null,
      isFetching: true
    };
    expect(authUserProcess.reducer(state, { type: loginAction.fulfilled.type, payload: fakeUser }))
      .toEqual({
        user: fakeUser,
        error: null,
        isFetching: true,
      });
  });

  it('должен сохранить error в store', () => {
    const state = {
      user: fakeUser,
      error: null,
      isFetching: true
    };
    expect(authUserProcess.reducer( state, { type: loginAction.rejected.type }))
      .toEqual({
        user: fakeUser,
        error: {error: 'Sorry cant find that!'},
        isFetching: false,
      });
  });
});

export {};
