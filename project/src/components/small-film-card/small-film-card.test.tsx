import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import {makeFakeFilm, makeFakeFilmComment, makeFakeFilms, makeFakeUser} from '../../utils/mocks';
import SmallFilmCard from './small-film-card';
import HistoryRouter from '../../hocs/history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {AnyAction} from '@reduxjs/toolkit';
import {State} from '../../types/state';

import { AppRoute, AuthorizationStatus, CommentSendingStatus, DEFAULT_GANRE } from '../../const';
import MainPage from '../main-page/main-page';
import { Routes, Route } from 'react-router-dom';
import { redirect } from '../../store/middlewares/redirect';

const history = createMemoryHistory();

// const middlewares = [redirect];
// const mockStore = configureMockStore<State, AnyAction>(middlewares);
// const store = mockStore();
const fakeFilm = makeFakeFilm(1);
const fakeFilms = makeFakeFilms();
const fakeUser = makeFakeUser();
const fakeComments = makeFakeFilmComment();
const mockStore = configureMockStore();
const store = mockStore({
  // FILMS: {films: [film], isDataLoading: false},
  // FILM: {promoFilm: film, film: film, filmComments: [], similarFilms: [], isDataLoading: false},
  // GENRE: {genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP},
  // USER: {authorizationStatus: AuthorizationStatus.NoAuth, error: null},
  // ADD_REVIEW: {isDataLoading: false, reviewSubmited: false},
  // FAVORITE: { favoriteFilms: [film], isDataLoading: false},
  User: {user: fakeUser, error: null, isFetching: false},
  Films: {genre: DEFAULT_GANRE, films: fakeFilms, isDataLoaded: false, error: null},
  Film: {film: fakeFilm, isFetching: false, error: null},
  Comments: {comments: fakeComments, isFetching: false},
  SendingComment: {isFetching: false, error: null, commentSendingStatus: CommentSendingStatus.Unknown,},
  PROMO: {film: fakeFilm, isFetching: false, error: null},
  Favorite: {films: fakeFilms, isFetching: false, error: null},
  Auth: {authorizationStatus: AuthorizationStatus.Auth, isFetching: false},
  Similar: {similarFilms: fakeFilms, isFetching: false},
});

describe('Компонент: SmallFilmCard', () => {
  // beforeAll(() => {
  //   window.HTMLMediaElement.prototype.load = jest.fn();
  // });
  history.push(AppRoute.Main);
  window.HTMLMediaElement.prototype.play = () => Promise.resolve();
  window.HTMLMediaElement.prototype.pause = jest.fn();
  window.HTMLMediaElement.prototype.load = jest.fn();

  it('должен отображать правильно', () => {
    render(
      <HistoryRouter history={history}>
        <SmallFilmCard
          name={fakeFilm.name}
          posterImage={fakeFilm.posterImage}
          id={fakeFilm.id}
          videoLink={fakeFilm.videoLink}
        />
      </HistoryRouter>
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
  });

  it('когда пользователь нажимает на "Film card", следует перенаправлять', async () => {
    jest.fn('../video-player/video-player', () => <div data-testid="video-player">for click</div>);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Main} element={<MainPage />} />
            <Route path={AppRoute.Film} element={<h1>Mock Film Screen</h1>}/>
          </Routes>
        < /HistoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByTestId('video-player'));

    expect(screen.getByText(/Mock Film Screen/i)).toBeInTheDocument();
  });
});
