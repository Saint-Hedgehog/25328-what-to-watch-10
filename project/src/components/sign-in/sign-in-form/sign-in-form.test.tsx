import {Action} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../../hocs/history-router/history-router';
import {makeFakeUser} from '../../../utils/mocks';
import {State} from '../../../types/state';
import {createAPI} from '../../../services/api';
import {AppRoute, AuthorizationStatus} from '../../../const';
import SignInForm from './sign-in-form';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../sign-in';

const api = createAPI();
const history = createMemoryHistory();
const fakeUser = makeFakeUser();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const store = mockStore({
  USER: {user: fakeUser, error: null, isFetching: false},
  AUTH: {authorizationStatus: AuthorizationStatus.NoAuth, isFetching: false},
});

const authStore = mockStore({
  USER: {user: fakeUser, error: null, isFetching: false},
  AUTH: {authorizationStatus: AuthorizationStatus.Auth, isFetching: false},
});

describe('Компонент: SignInForm', () => {
  beforeEach(() => {
    history.push(AppRoute.SignIn);
  });

  it('должен отображать правильно', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history} >
          <SignInForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('Sign in')[0]).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('должен отправлять loginAction, если пользователь ввел правильные данные', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignInForm />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByPlaceholderText('Email address'), 'test@test.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'secret1');
    await userEvent.click(screen.getByRole('button', {name: 'Sign in'}));

    const actions = store.getActions();
    expect(actions[0].type).toBe('user/login/pending');
  });

  it('должен показывать ошибку "email", если пользователь ввел данные не правильного формата в поле "email"', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignInForm />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByPlaceholderText('Email address'), 'test@test.c');
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  it('должен показывать ошибку "password", если пользователь ввел данные не правильного формата в поле "password"', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignInForm />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByPlaceholderText('Password'), 'secret');

    expect(screen.getByText(/Please enter a valid password address/i)).toBeInTheDocument();
  });

  it('должен перенаправить пользователя на главную страницу, если пользователь успешно вошел в систему', () => {
    render(
      <Provider store={authStore}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Main} element={<h1>Mock Main Screen</h1>} />
            <Route path={AppRoute.SignIn} element={<SignIn />} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(history.location.pathname).toBe(AppRoute.Main);
    expect(screen.getByText('Mock Main Screen')).toBeInTheDocument();
  });
});
