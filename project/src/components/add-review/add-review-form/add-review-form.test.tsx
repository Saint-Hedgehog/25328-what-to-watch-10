import { Action } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../../hocs/history-router/history-router';
import { makeFakeFilm, makeFakeFilms, makeFakeUser } from '../../../utils/mocks';
import { State } from '../../../types/state';
import { createAPI } from '../../../services/api';
import { AppRoute, AuthorizationStatus, CommentSendingStatus, DEFAULT_GANRE, MessageLength } from '../../../const';
import AddReviewForm from './add-review-form';
import { Route, Routes } from 'react-router';
import PrivateRoute from '../../../hocs/private-route/private-route';
import AddReview from '../add-review';

const MAX_FILM_RATING = 10;
const RATING_NINE = String(9);

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
  USER: { user: fakeUser, error: null, isFetching: false },
  FILMS: { genre: DEFAULT_GANRE, films: fakeFilms, isDataLoaded: false, error: null },
  FILM: { film: fakeFilm, isFetching: false, error: null },
  SENDING_COMMENT: { isFetching: false, error: null, commentSendingStatus: CommentSendingStatus.Unknown },
  AUTH: { authorizationStatus: AuthorizationStatus.Auth, isFetching: false },
});

const reviewSubmitedStore = mockStore({
  USER: { user: fakeUser, error: null, isFetching: false },
  FILMS: { genre: DEFAULT_GANRE, films: fakeFilms, isDataLoaded: false, error: null },
  FILM: { film: fakeFilm, isFetching: false, error: null },
  SENDING_COMMENT: { isFetching: false, error: null, commentSendingStatus: CommentSendingStatus.Success },
  AUTH: { authorizationStatus: AuthorizationStatus.Auth, isFetching: false },
});

jest.setTimeout(30000);

describe('Компонент: AddReviewForm', () => {
  beforeEach(() => {
    history.push(`${AppRoute.Film}/${fakeFilm.id}${AppRoute.Review}`);
  });

  it('должен отображать правильно', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history} >
          <AddReviewForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Rating 5/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('rating').length).toEqual(MAX_FILM_RATING);
    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(/Post/i);
  });

  it('должен проверить 9 звезд для обзора', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history} >
          <AddReviewForm />
        </HistoryRouter>
      </Provider>
    );

    const nineRatingStar = screen.getAllByTestId('rating')[1];
    await userEvent.click(nineRatingStar);
    const input = nineRatingStar.getAttribute('value');
    expect(input).toEqual(RATING_NINE);
  });

  it('должен отправлять sendCommentAction, когда пользователь вводит правильные данные и нажимает "Post"', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history} >
          <Routes>
            <Route path={AppRoute.Film}>
              <Route path={AppRoute.DefaultAddReview} element={<AddReviewForm />}/>
            </Route>
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/Rating 5/i));
    await userEvent.type(screen.getByPlaceholderText(/Review text/i), 'test test test test test test test test test test test');
    await userEvent.click(screen.getByText('Post'));

    const actions = store.getActions();
    expect(actions[0].type).toBe('data/sendComment/pending');
  });

  it('должен перенаправлять на страницу Movie и отправлять resetCommentSendingStatus после того, как пользователь ввел правильные данные и нажал "Post"', async () => {
    render(
      <Provider store={reviewSubmitedStore}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Film}>
              <Route path={AppRoute.DefaultFilm} element={
                <Routes>
                  <Route path={AppRoute.Overview} element={<h1>Mock Movie Page Screen</h1>}/>
                </Routes>
                // <h1>Mock Movie Page Screen</h1>
              }
              />
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

    // await userEvent.click(screen.getByText(/Rating 5/i));
    // await userEvent.type(screen.getByPlaceholderText(/Review text/i), 'test test test test test test test test test test test');
    // await userEvent.click(screen.getByText('Post'));

    // const actions = store.getActions();
    // expect(actions[0].type).toBe('data/sendComment/pending');
    expect(history.location.pathname).toBe(`${AppRoute.Film}/${fakeFilm.id}${AppRoute.Overview}`);
    expect(screen.getByText(/Mock Movie Page Screen/i)).toBeInTheDocument();
    // expect(screen.queryByText(/Mock Movie Page Screen/i)).not.toBeInTheDocument();
    // await waitFor(() => {
    //   expect(screen.getByText(/Mock Movie Page Screen/i)).toBeInTheDocument();
    // });
  });

  // it('кнопка формы должна быть отключена, пока длина меньше 50', async () => {
  //   const fakeReview = 'a'.repeat(MessageLength.Min - 1);
  //   const isMessageEntered = fakeReview.length >= MessageLength.Min;
  //   const isValidForm = isMessageEntered;

  //   render(
  //     <Provider store={store}>
  //       <HistoryRouter history={history} >
  //         <AddReviewForm />
  //       </HistoryRouter>
  //     </Provider>
  //   );

  //   expect(isValidForm).toBeFalsy();

  //   await userEvent.type(screen.getByPlaceholderText(/Review text/i), fakeReview);
  //   expect(screen.getByRole('button')).toHaveStyle('pointerEvents: none');
  // });

  // it('кнопка формы должна быть отключена, если длина больше 400', async () => {
  //   const fakeReview = 'a'.repeat(MessageLength.Max + 1);
  //   const isMessageEntered = fakeReview.length <= MessageLength.Max;
  //   const isValidForm = isMessageEntered;

  //   render(
  //     <Provider store={store}>
  //       <HistoryRouter history={history} >
  //         <AddReviewForm />
  //       </HistoryRouter>
  //     </Provider>
  //   );

  //   expect(isValidForm).toBeFalsy();

  //   await userEvent.type(screen.getByPlaceholderText(/Review text/i), fakeReview);
  //   expect(screen.getByRole('button')).toHaveStyle('pointerEvents: none');
  // });
});
