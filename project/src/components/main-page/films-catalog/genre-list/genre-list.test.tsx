import {Action} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../../../hocs/history-router/history-router';
import {DEFAULT_GANRE} from '../../../../const';
import {makeFakeFilm, makeFakeFilms, makeFakeGenres} from '../../../../utils/mocks';
import {State} from '../../../../types/state';
import {createAPI} from '../../../../services/api';
import GenreList from './genre-list';

const api = createAPI();
const history = createMemoryHistory();
const fakeFilm = makeFakeFilm(1);
const fakeFilms = makeFakeFilms();
const fakeGenres = makeFakeGenres();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const store = mockStore({
  FILMS: {genre: DEFAULT_GANRE, films: fakeFilms, isDataLoaded: false, error: null},
  FILM: {film: fakeFilm, isFetching: false, error: null},
});

describe('Компонент: GenreList', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('должен отображать правильно', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <GenreList />
        </HistoryRouter>
      </Provider >,
    );

    expect(screen.getAllByTestId('genre').length).toEqual(fakeGenres.length);
  });

  it('должен отправлять действие, когда пользователь нажимает кнопку жанра', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <GenreList />
        </HistoryRouter>
      </Provider >,
    );

    await userEvent.click(screen.getAllByTestId('genre')[0]);

    const actions = store.getActions();
    expect(actions[0].type).toBe('FILMS/changeGenre');
  });
});
