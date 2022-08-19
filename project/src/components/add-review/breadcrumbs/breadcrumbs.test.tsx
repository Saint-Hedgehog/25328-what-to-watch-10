import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import { State } from 'history';
import { Provider } from 'react';
import HistoryRouter from '../../../hocs/history-router/history-router';
import { redirect } from '../../../store/middlewares/redirect';
import { makeFakeFilm } from '../../../utils/mocks';
import Breadcrumbs from './breadcrumbs';
// import {configureMockStore} from '@jedmao/redux-mock-store';

const fakeFilm = makeFakeFilm(1);
// const middlewares = [redirect];
// const mockStore = configureMockStore<State, AnyAction>(middlewares);
// const store = mockStore();

describe('Компонент: Breadcrumbs', () => {
  it('должен отображать правильно', () => {
    render(
      // <Provider store={store}>
        <HistoryRouter history={ history } >
          <Breadcrumbs fakeFilm={fakeFilm} />
        </HistoryRouter>,
      // </Provider>,
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
  });
});
