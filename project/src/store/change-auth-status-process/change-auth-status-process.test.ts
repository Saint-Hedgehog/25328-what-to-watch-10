import { AuthorizationStatus } from '../../const';
import {
  changeAuthStatusProcess,
  checkAuthStatusRequest,
  checkAuthStatusSuccess,
  checkAuthStatusError,
  changeAuthStatus
} from './change-auth-status-process';

describe('Редьюсер: ChangeAuthStatusProcess', () => {
  it('без дополнительных параметров должен возвращать начальное состояние', () => {
    expect(changeAuthStatusProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(
        {
          authorizationStatus: AuthorizationStatus.Unknown,
          isFetching: false,
        }
      );
  });

  it('должен перевести isFetching в true', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      isFetching: false,
    };
    expect(changeAuthStatusProcess.reducer(state, checkAuthStatusRequest()))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        isFetching: true,
      });
  });

  it('должен перевести isFetching в false', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      isFetching: true,
    };
    expect(changeAuthStatusProcess.reducer(state, checkAuthStatusSuccess()))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        isFetching: false,
      });
  });

  it('при возникновении ошибки isFetching становится false', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      isFetching: true,
    };
    expect(changeAuthStatusProcess.reducer(state, checkAuthStatusError()))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        isFetching: false,
      });
  });

  it('должен сохранить authStatus в store', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      isFetching: false,
    };
    expect(
      changeAuthStatusProcess.reducer(state, changeAuthStatus(AuthorizationStatus.Auth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        isFetching: false,
      });
  });
});
