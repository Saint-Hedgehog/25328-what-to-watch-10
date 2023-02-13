import {Action} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../hocs/history-router/history-router';
import {makeFakeFilm, makeFakeFilms, makeFakeUser} from '../../utils/mocks';
import {State} from '../../types/state';
import {createAPI} from '../../services/api';
import {AppRoute, AuthorizationStatus, CommentSendingStatus, DEFAULT_GANRE} from '../../const';
import AddReview from './add-review';

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
  SENDING_COMMENT: {isFetching: false, error: null, commentSendingStatus: CommentSendingStatus.Unknown},
  AUTH: {authorizationStatus: AuthorizationStatus.Auth, isFetching: false},
});

describe('Компонент: AddReview', () => {
  beforeEach(() => {
    history.push(`${AppRoute.Film}/${fakeFilm.id}${AppRoute.Review}`);
  });

  it('должен отображать правильно', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history} >
          <AddReview />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });
});
