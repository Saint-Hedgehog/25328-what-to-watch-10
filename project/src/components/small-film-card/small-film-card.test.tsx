import {Routes, Route} from 'react-router-dom';
import {Action} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../hocs/history-router/history-router';
import {AppRoute, AuthorizationStatus, DEFAULT_GANRE} from '../../const';
import {makeFakeFilm, makeFakeFilms, makeFakeUser} from '../../utils/mocks';
import {State} from '../../types/state';
import {createAPI} from '../../services/api';
import SmallFilmCard from './small-film-card';
import MainPage from '../main-page/main-page';

const api = createAPI();
const history = createMemoryHistory();
const fakeFilm = makeFakeFilm(1);
const fakeFilms = makeFakeFilms();
const fakeUser = makeFakeUser();
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
  PROMO: {film: fakeFilm, isFetching: false, error: null},
  FAVORITE: {films: fakeFilms, isFetching: false, error: null},
  AUTH: {authorizationStatus: AuthorizationStatus.Auth, isFetching: false},
});

describe('Компонент: SmallFilmCard', () => {
  beforeEach(() => {
    history.push(AppRoute.Main);
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

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
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Main} element={<MainPage />} />
            <Route path={AppRoute.Film}>
              <Route path={AppRoute.DefaultFilm} element={<h1>Mock Film Screen</h1>} />
            </Route>
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByTitle(`/films/${fakeFilm.id}/overview`));

    expect(screen.getByText(/Mock Film Screen/i)).toBeInTheDocument();
  });
});
