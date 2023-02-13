import {Action} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../hocs/history-router/history-router';
import {makeFakeComments, makeFakeFilm, makeFakeFilms, makeFakeUser} from '../../utils/mocks';
import {State} from '../../types/state';
import {createAPI} from '../../services/api';
import {AppRoute, AuthorizationStatus, CommentSendingStatus, COUNT_SIMILAR_FILMS, DEFAULT_GANRE} from '../../const';
import SimilarFilms from './similar-films';

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
  USER: {user: fakeUser, error: null, isFetching: false},
  FILMS: {genre: DEFAULT_GANRE, films: fakeFilms, isDataLoaded: false, error: null},
  FILM: {film: fakeFilm, isFetching: false, error: null},
  COMMENTS: {comments: fakeComments, isFetching: false},
  SENDING_COMMENT: {isFetching: false, error: null, commentSendingStatus: CommentSendingStatus.Unknown,},
  PROMO: {film: fakeFilm, isFetching: false, error: null},
  FAVORITE: {films: fakeFilms, isFetching: false, error: null},
  AUTH: {authorizationStatus: AuthorizationStatus.Auth, isFetching: false},
  SIMILAR: {similarFilms: fakeFilms, isFetching: false},
});

describe('Компонент: SimilarFilms', () => {
  beforeEach(() => {
    history.push(`${AppRoute.Film}/${fakeFilm.id}${AppRoute.Review}`);
  });

  it('должен отображать правильно', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history} >
          <SimilarFilms currentFilmId={fakeFilm.id} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('catalog--like-this')).toHaveTextContent('More like this');
    expect(screen.getAllByTestId('film-card').length).toEqual(COUNT_SIMILAR_FILMS);
  });
});
