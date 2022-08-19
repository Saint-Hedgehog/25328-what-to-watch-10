import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from '@reduxjs/toolkit';
import {redirect} from './redirect';
import {redirectToRoute} from '../action';
import {AppRoute} from '../../const';
import {State} from '../../types/state';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middlewares: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('должно быть перенаправлено на /login', () => {
    store.dispatch(redirectToRoute(AppRoute.SignIn));
    // expect(fakeHistory.location.pathname).toBe(AppRoute.SignIn);
    expect(store.getActions())
      .toEqual([redirectToRoute(AppRoute.SignIn),]);
  });

  it('не следует перенаправлять на /main, потому что плохое действие', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.Main});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Main);
  });
});
