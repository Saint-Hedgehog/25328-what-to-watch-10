import {Action} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../../../hocs/history-router/history-router';
import {DEFAULT_GANRE, FILM_CARD_COUNT_ON_PAGE} from '../../../../const';
import {makeFakeFilms} from '../../../../utils/mocks';
import {State} from '../../../../types/state';
import ListFilms from './films-list';
import {createAPI} from '../../../../services/api';

const api = createAPI();
const history = createMemoryHistory();
const fakeFilms = makeFakeFilms();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const store = mockStore({
  FILMS: {genre: DEFAULT_GANRE, films: fakeFilms, isDataLoaded: false, error: null},
});

describe('Компонент: ListFilms', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('должен отображать правильно', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ListFilms />
        </HistoryRouter>
      </Provider >,
    );

    expect(screen.getByRole('button', {name: /Show more/i})).toBeInTheDocument();
  });

  it('не должно быть кнопки рендеринга, если показаны все фильмы', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ListFilms />
        </HistoryRouter>
      </Provider >,
    );

    expect(screen.getAllByTestId('film-card').length).toBeLessThanOrEqual(FILM_CARD_COUNT_ON_PAGE);
  });
});
