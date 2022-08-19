import thunk from 'redux-thunk';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const';
import {createMemoryHistory} from 'history';
import {makeFakeFilm, makeFakeFilms, makeFakeComments, makeFakeUser} from '../../utils/mocks';
import App from './app';
import HistoryRouter from '../../hocs/history-router/history-router';
import {Provider} from 'react-redux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeUser = makeFakeUser();
const fakeFilm = makeFakeFilm(1);
const fakeFilms = makeFakeFilms();
const fakeComments = makeFakeComments();

const store = mockStore({
  [NameSpace.User]: fakeUser,
  [NameSpace.Films]: fakeFilms,
  [NameSpace.Film]: fakeFilm,
  [NameSpace.Comments]: fakeComments,
  [NameSpace.SendingComment]: fakeComments,
  [NameSpace.PromoFilm]: fakeFilm,
  [NameSpace.Favorite]: fakeFilms,
  [NameSpace.Auth]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  [NameSpace.Similar]: fakeFilms,
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App/>
    </HistoryRouter>
  </Provider>
);

describe('Маршрутизация приложения', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('должна отображать "MainScreen", когда пользователь переходит к "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();

    expect(screen.getByTestId('play')).toBeInTheDocument();
    expect(screen.getByTestId('favorite')).toBeInTheDocument();
  });

  // it('should render "SignInScreen" when user navigate to "/login"', () => {
  //   history.push(AppRoute.SignIn);

  //   render(fakeApp);

  //   expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
  //   expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

  //   expect(screen.getByRole('button')).toHaveTextContent(/Sign in/i);
  // });

  // it('should render "FavoriteScreen" when user navigate to "/favorite"', () => {
  //   history.push(AppRoute.Favorite);

  //   render(fakeApp);

  //   expect(screen.getByText(/My list/i)).toBeInTheDocument();
  // });

  // it('should render "FilmScreen" when user navigate to "/films/1"', () => {
  //   history.push(`/films/${fakeFilm.id}`);

  //   render(fakeApp);

  //   expect(screen.getByTestId('play')).toBeInTheDocument();
  //   expect(screen.getByTestId('favorite')).toBeInTheDocument();
  //   expect(screen.getByTestId('review')).toBeInTheDocument();

  //   expect(screen.getByText(FilmTabsItems.Overview)).toBeInTheDocument();
  //   expect(screen.getByText(FilmTabsItems.Details)).toBeInTheDocument();
  //   expect(screen.getByText(FilmTabsItems.Reviews)).toBeInTheDocument();

  //   expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
  // });

  // it('should render "AddReviewScreen" when user navigate to "/films/1/review"', () => {
  //   history.push(`/films/${fakeFilm.id}/review`);

  //   render(fakeApp);

  //   expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();

  //   expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  //   expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
  //   expect(screen.getByRole('button')).toHaveTextContent(/Post/i);
  // });

  // it('should render "PlayerScreen" when user navigate to "/player/1"', () => {
  //   history.push(`/player/${fakeFilm.id}`);

  //   render(fakeApp);

  //   expect(screen.getByTestId('exit')).toBeInTheDocument();
  //   expect(screen.getByTestId('play')).toBeInTheDocument();
  //   expect(screen.getByTestId('fullscreen')).toBeInTheDocument();

  //   expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
  // });

  // it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
  //   history.push('/non-existent-route');

  //   render(fakeApp);

  //   expect(screen.getByText(/404. Not Found/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Oh no, page is missing/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Back to main page/i)).toBeInTheDocument();
  // });
});
