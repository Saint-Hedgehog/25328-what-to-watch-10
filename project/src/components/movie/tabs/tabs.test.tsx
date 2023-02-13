import { Action } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../../hocs/history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeFilm, makeFakeFilms, makeFakeUser } from '../../../utils/mocks';
import { State } from '../../../types/state';
import { createAPI } from '../../../services/api';
import { AppRoute, AuthorizationStatus, CommentSendingStatus, DEFAULT_GANRE } from '../../../const';
import { makeFakeComments } from '../../../utils/mocks';
import Tabs from './tabs';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router-dom';
import MoviePageDetails from '../movie-page-details/movie-page-details';
import MoviePageOverview from '../movie-page-overview/movie-page-overview';
import MoviePageReviews from '../movie-page-reviews/movie-page-reviews';

const api = createAPI();
const history = createMemoryHistory();
const fakeUser = makeFakeUser();
const fakeFilm = makeFakeFilm(1);
const fakeFilms = makeFakeFilms();
const fakeComments = makeFakeComments();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const store = mockStore({
  USER: { user: fakeUser, error: null, isFetching: false },
  FILMS: { genre: DEFAULT_GANRE, films: fakeFilms, isDataLoaded: false, error: null },
  FILM: { film: fakeFilm, isFetching: false, error: null },
  COMMENTS: { comments: fakeComments, isFetching: false },
  SENDING_COMMENT: { isFetching: false, error: null, commentSendingStatus: CommentSendingStatus.Unknown, },
  PROMO: { film: fakeFilm, isFetching: false, error: null },
  FAVORITE: { films: fakeFilms, isFetching: false, error: null },
  AUTH: { authorizationStatus: AuthorizationStatus.NoAuth, isFetching: false },
  SIMILAR: { similarFilms: fakeFilms, isFetching: false },
});

describe('Компонент: Tabs', () => {
  // beforeEach(() => {
  //   history.push(`${AppRoute.Film}/${fakeFilm.id}${AppRoute.Overview}`);
  // });
  it('должен отображать правильно', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history} >
          <Tabs />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Details' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Reviews' })).toBeInTheDocument();
  });

  it('должен показывать обзор фильма, когда пользователь нажимает вкладку "Overview"', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history} >
          <Tabs />
          <Routes>
            {/* <Route index element={<MoviePageOverview film={fakeFilm} />} /> */}
            <Route path="/films/1/overview" element={<h1>Mock Movie Page Screen</h1>} />
            {/* <Route path="/details" element={<MoviePageDetails film={fakeFilm} />} /> */}
            {/* <Route path="/reviews" element={<MoviePageReviews />} /> */}
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('link', { name: 'Overview'}));

    expect(screen.getByText(/Mock Movie Page Screen/i)).toBeInTheDocument();

    // expect(screen.getByText(fakeFilm.rating)).toBeInTheDocument();
    // expect(screen.getByText(fakeFilm.description)).toBeInTheDocument();
    // expect(screen.getByText(/Director:/i)).toBeInTheDocument();
    // expect(screen.getByText(/Starring:/i)).toBeInTheDocument();
  });
});
