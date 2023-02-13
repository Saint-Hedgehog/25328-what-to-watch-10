import {Action} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../hocs/history-router/history-router';
import {makeFakeFilm, makeFakeFilms, makeFakeGenres, makeFakeUser} from '../../utils/mocks';
import {State} from '../../types/state';
import {createAPI} from '../../services/api';
import {AppRoute, AuthorizationStatus, CommentSendingStatus, DEFAULT_GANRE} from '../../const';
import {makeFakeComments} from '../../utils/mocks';
import App from './app';

const api = createAPI();
const history = createMemoryHistory();
const fakeUser = makeFakeUser();
const fakeFilm = makeFakeFilm(1);
const fakeFilms = makeFakeFilms();
const fakeGenres = makeFakeGenres();
const fakeComments = makeFakeComments();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const store = mockStore({
  USER: {user: fakeUser, error: null, isFetching: false},
  FILMS: {genre: DEFAULT_GANRE, films: fakeFilms, isDataLoaded: false, error: null},
  FILM: {film: fakeFilm, isFetching: false, error: null},
  COMMENTS: {comments: fakeComments, isFetching: false},
  SENDING_COMMENT: {isFetching: false, error: null, commentSendingStatus: CommentSendingStatus.Unknown,},
  PROMO: {film: fakeFilm, isFetching: false, error: null},
  FAVORITE: {films: fakeFilms, isFetching: false, error: null},
  AUTH: {authorizationStatus: AuthorizationStatus.NoAuth, isFetching: false},
  SIMILAR: {similarFilms: fakeFilms, isFetching: false},
});

const authStore = mockStore({
  USER: {user: fakeUser, error: null, isFetching: false},
  FILMS: {genre: DEFAULT_GANRE, films: fakeFilms, isDataLoaded: false, error: null},
  FILM: {film: fakeFilm, isFetching: false, error: null},
  COMMENTS: {comments: fakeComments, isFetching: false},
  SENDING_COMMENT: {isFetching: false, error: null, commentSendingStatus: CommentSendingStatus.Unknown,},
  PROMO: {film: fakeFilm, isFetching: false, error: null},
  FAVORITE: {films: fakeFilms, isFetching: false, error: null},
  AUTH: { authorizationStatus: AuthorizationStatus.Auth, isFetching: false},
  SIMILAR: {similarFilms: fakeFilms, isFetching: false},
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

const authFakeApp = (
  <Provider store={authStore}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Компонент: App', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  describe('Страница: MainPage', () => {
    it('должен отображать "Sign in", когда неавторизованный пользователь переходит к "/"', () => {
      history.push(AppRoute.Main);

      render(fakeApp);

      expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument();
    });

    it('не должен отображать "Sign in", когда авторизованный пользователь переходит к "/"', () => {
      history.push(AppRoute.Main);

      render(authFakeApp);

      expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
    });

    it('должен отображать "MainPage", когда пользователь переходит к "/"', () => {
      history.push(AppRoute.Main);

      render(fakeApp);

      expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
      expect(screen.getByText(fakeFilm.genre)).toBeInTheDocument();
      expect(screen.getAllByTestId('genre').length).toEqual(fakeGenres.length);
      expect(screen.getByText('Show more')).toBeInTheDocument();
    });
  });

  it('должен отображать "SignIn", когда неавторизованный пользователь переходит к "/login"', () => {
    history.push(AppRoute.SignIn);

    render(fakeApp);

    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Sign in'})).toBeInTheDocument();
  });

  describe('Страница: MyList', () => {
    it('должен отображать "MyList", когда авторизованный пользователь переходит к "/mylist"', () => {
      history.push(AppRoute.MyList);

      render(authFakeApp);


      expect(screen.getByText(/My list/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Sign out'})).toBeInTheDocument();
    });

    it('должен перенаправлять "SignIn", когда неавторизованный пользователь переходит к "/mylist"', () => {
      history.push(AppRoute.SignIn);
      // history.push(AppRoute.MyList);

      render(fakeApp);

      expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    });
  });

  it('должен отображать "Movie", когда пользователь переходит к "/film/id/overview"', () => {
    history.push(`${AppRoute.Film}/${fakeFilm.id}${AppRoute.Overview}`);

    render(fakeApp);

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Overview'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Details'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Reviews'})).toBeInTheDocument();
  });

  describe('Страница: AddReview', () => {
    it('должен отображать "AddReview", когда авторизованный пользователь переходит к "/film/id/review"', () => {
      history.push(`${AppRoute.Film}/${fakeFilm.id}${AppRoute.Review}`);

      render(authFakeApp);

      expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
      expect(screen.getByText(/Add review/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
      expect(screen.getByRole('button', {name: 'Post'})).toBeInTheDocument();
    });

    it('должен перенаправлять "SignIn", когда неавторизованный пользователь переходит к "/film/id/review"', () => {
      // history.push(`${AppRoute.Film}/${fakeFilm.id}${AppRoute.Review}`);
      history.push(AppRoute.SignIn);

      render(fakeApp);

      expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', {name: 'Sign in'})).toBeInTheDocument();
    });
  });

  it('должен отображать "Player", когда пользователь переходит к "/player/id"', () => {
    history.push(`${AppRoute.Player}/${fakeFilm.id}`);

    render(fakeApp);

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Play'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Full screen'})).toBeInTheDocument();
  });

  it('должен отображать "NotFoundPage", когда пользователь переходит к несуществующему маршруту', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
