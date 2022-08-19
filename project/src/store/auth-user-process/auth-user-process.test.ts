import {makeFakeUser} from '../../utils/mocks';
import {
  authUserProcess,
  checkAuthorizationRequest,
  checkAuthorizationError,
  setUserData
} from './auth-user-process';

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
    expect(authUserProcess.reducer(state, checkAuthorizationRequest()))
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
    expect(authUserProcess.reducer(state, setUserData(fakeUser)))
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
    expect(authUserProcess.reducer(
      state,
      checkAuthorizationError({ error: 'Sorry cant find that!' })))
      .toEqual({
        user: fakeUser,
        error: {error: 'Sorry cant find that!'},
        isFetching: false,
      });
  });
});

export {};
