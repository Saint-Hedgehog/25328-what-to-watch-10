import {Routes, Route} from 'react-router-dom';
import {Action} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../../hocs/history-router/history-router';
import PrivateRoute from '../../../hocs/private-route/private-route';
import {makeFakeFilm, makeFakeFilms, makeFakeUser} from '../../../utils/mocks';
import {State} from '../../../types/state';
import {createAPI} from '../../../services/api';
import {AppRoute, AuthorizationStatus, CommentSendingStatus, DEFAULT_GANRE} from '../../../const';
import Breadcrumbs from './breadcrumbs';
import AddReview from '../add-review';

const api = createAPI();
const history = createMemoryHistory();
const fakeUser = makeFakeUser();
const fakeFilm = makeFakeFilm(1);
const fakeFilms = makeFakeFilms();
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
  SENDING_COMMENT: {isFetching: false, error: null, commentSendingStatus: CommentSendingStatus.Unknown,},
  AUTH: {authorizationStatus: AuthorizationStatus.Auth, isFetching: false},
});

describe('Компонент: Breadcrumbs', () => {
  beforeEach(() => {
    history.push(`${AppRoute.Film}/${fakeFilm.id}${AppRoute.Review}`);
  });
  it('должен отображать правильно', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Breadcrumbs film={fakeFilm} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('когда пользователь нажимает на "Film name link", следует перенаправлять', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Film}>
              <Route path={AppRoute.DefaultFilm} element={<h1>Mock Movie Page Screen</h1>} />
              <Route path={AppRoute.DefaultAddReview} element={
                <PrivateRoute>
                  <AddReview />
                </PrivateRoute>
              }
              />
            </Route>
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByText(fakeFilm.name));

    expect(screen.getByText(/Mock Movie Page Screen/i)).toBeInTheDocument();
  });
});
