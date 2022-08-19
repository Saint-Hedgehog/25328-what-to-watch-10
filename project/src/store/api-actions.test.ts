import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {APIRoute, AuthorizationStatus} from '../const';
import {State} from '../types/state';
import {AuthData} from '../types/user';
import {redirectToRoute} from './action';
import {
  checkAuthAction,
  fetchCommentsAction,
  fetchCurrentFilmAction,
  fetchFavoriteFilmsAction,
  loadFilmsAction,
  fetchPromoFilmAction,
  fetchSimilarFilmsAction,
  loginAction, logoutAction,
  setFavouriteCurrentAction,
  setFavouritePromoAction
} from './api-actions';
import {makeFakeComments, makeFakeFilm, makeFakeFilms, makeFakeUser} from '../utils/mocks';
import {requireAuthorization, setUserData} from './user-process/user-process';
import { loadFilmsSuccess } from './films-process/films-process';

describe('Async actions', () => {
  const api = createAPI();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const fakeFilm = makeFakeFilm();
  const fakeFilms = makeFakeFilms();
  const fakeComments = makeFakeComments();
  const fakeUserData = makeFakeUser();

  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('должен отправлять "loadFilmsSuccess" когда GET "/films"', async () => {
    mockApi.onGet(APIRoute.Films).reply(200, fakeFilms);

    const store = mockStore();
    await store.dispatch(loadFilmsAction());

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadFilmsSuccess.toString());

    const loadFilmsSuccessAction = store.getActions().find((action) => action.type === loadFilmsSuccess.toString());
    expect(loadFilmsSuccessAction).toMatchObject({payload: fakeFilms});
  });

  // it('should dispatch "setFavoriteFilms" when GET "/favorite"', async () => {
  //   mockApi.onGet(APIRoute.Favorite).reply(200, fakeFilms);

  //   const store = mockStore();
  //   await store.dispatch(fetchFavoriteFilmsAction());

  //   const actions = store.getActions().map(({type}) => type);
  //   expect(actions).toContain(setFavoriteFilms.toString());

  //   const setFavoriteFilmsAction = store.getActions().find((action) => action.type === setFavoriteFilms.toString());
  //   expect(setFavoriteFilmsAction).toMatchObject({payload: fakeFilms});
  // });

  // it('should dispatch "setSimilarFilms" when GET "/films/{filmId}/similar"', async () => {
  //   mockApi.onGet(`${APIRoute.Films}/${fakeFilm.id}/similar`).reply(200, fakeFilms);

  //   const store = mockStore();
  //   await store.dispatch(fetchSimilarFilmsAction(fakeFilm.id));

  //   const actions = store.getActions().map(({type}) => type);
  //   expect(actions).toContain(setSimilarFilms.toString());

  //   const setSimilarFilmsAction = store.getActions().find((action) => action.type === setSimilarFilms.toString());
  //   expect(setSimilarFilmsAction).toMatchObject({payload: fakeFilms});
  // });

  // it('should dispatch "setComments" when GET "/comments/{filmId}"', async () => {
  //   mockApi.onGet(`${APIRoute.Comments}/${fakeFilm.id}`).reply(200, fakeComments);

  //   const store = mockStore();
  //   await store.dispatch(fetchCommentsAction(fakeFilm.id));

  //   const actions = store.getActions().map(({type}) => type);
  //   expect(actions).toContain(setComments.toString());

  //   const setCommentsAction = store.getActions().find((action) => action.type === setComments.toString());
  //   expect(setCommentsAction).toMatchObject({payload: fakeComments});
  // });

  // it('should dispatch "setPromoFilm" when GET "/promo"', async () => {
  //   mockApi.onGet(APIRoute.Promo).reply(200, fakeFilm);

  //   const store = mockStore();
  //   await store.dispatch(fetchPromoFilmAction());

  //   const actions = store.getActions().map(({type}) => type);
  //   expect(actions).toContain(setPromoFilm.toString());

  //   const setPromoFilmAction = store.getActions().find((action) => action.type === setPromoFilm.toString());
  //   expect(setPromoFilmAction).toMatchObject({payload: fakeFilm});
  // });

  // it('should dispatch "setCurrentFilm" when GET "/films/{filmId}" return 200', async () => {
  //   mockApi.onGet(`${APIRoute.Films}/${fakeFilm.id}`).reply(200, fakeFilm);

  //   const store = mockStore();
  //   await store.dispatch(fetchCurrentFilmAction(fakeFilm.id));

  //   const actions = store.getActions().map(({type}) => type);
  //   expect(actions).toContain(setCurrentFilm.toString());

  //   const setCurrentFilmAction = store.getActions().find((action) => action.type === setCurrentFilm.toString());
  //   expect(setCurrentFilmAction).toMatchObject({payload: fakeFilm});
  // });

  // it('should dispatch "setCurrentFilm" when GET "/films/{filmId}" return 404', async () => {
  //   mockApi.onGet(`${APIRoute.Films}/${fakeFilm.id}`).reply(200, undefined);

  //   const store = mockStore();
  //   await store.dispatch(fetchCurrentFilmAction(fakeFilm.id));

  //   const actions = store.getActions().map(({type}) => type);
  //   expect(actions).toContain(setCurrentFilm.toString());

  //   const setCurrentFilmAction = store.getActions().find((action) => action.type === setCurrentFilm.toString());
  //   expect(setCurrentFilmAction).toMatchObject({payload: undefined});
  // });

  // it('should dispatch "setPromoFilm" when POST "/favorite/{filmId}/{status}" return 200', async () => {
  //   const promoId = fakeFilm.id;
  //   const isFavorite = fakeFilm.isFavorite;

  //   mockApi.onPost(`${APIRoute.Favorite}/${promoId}/${isFavorite ? 0 : 1}`).reply(200, fakeFilm);

  //   const store = mockStore();
  //   await store.dispatch(setFavouritePromoAction({promoId, isFavorite}));

  //   const actions = store.getActions().map(({type}) => type);
  //   expect(actions).toContain(setPromoFilm.toString());

  //   const setPromoFilmAction = store.getActions().find((action) => action.type === setPromoFilm.toString());
  //   expect(setPromoFilmAction).toMatchObject({payload: fakeFilm});
  // });

  // it('should dispatch "redirectToRoute" when POST "/favorite/{promoId}/{status}" return 401', async () => {
  //   const promoId = fakeFilm.id;
  //   const isFavorite = fakeFilm.isFavorite;

  //   mockApi.onPost(`${APIRoute.Favorite}/${promoId}/${isFavorite ? 0 : 1}`).reply(401, fakeFilm);

  //   const store = mockStore();
  //   await store.dispatch(setFavouritePromoAction({promoId, isFavorite}));

  //   const actions = store.getActions().map(({type}) => type);
  //   expect(actions).toContain(redirectToRoute.toString());
  // });

  // it('should dispatch "setCurrentFilm" when POST "/favorite/{filmId}/{status}" return 200', async () => {
  //   const currentFilmId = fakeFilm.id;
  //   const isFavorite = fakeFilm.isFavorite;

  //   mockApi.onPost(`${APIRoute.Favorite}/${currentFilmId}/${isFavorite ? 0 : 1}`).reply(200, fakeFilm);

  //   const store = mockStore();
  //   await store.dispatch(setFavouriteCurrentAction({currentFilmId, isFavorite}));

  //   const actions = store.getActions().map(({type}) => type);
  //   expect(actions).toContain(setCurrentFilm.toString());

  //   const setCurrentFilmFilmAction = store.getActions().find((action) => action.type === setCurrentFilm.toString());
  //   expect(setCurrentFilmFilmAction).toMatchObject({payload: fakeFilm});
  // });

  // it('should dispatch "redirectToRoute" when POST "/favorite/{currentFilmId}/{status}" return 401', async () => {
  //   const currentFilmId = fakeFilm.id;
  //   const isFavorite = fakeFilm.isFavorite;

  //   mockApi.onPost(`${APIRoute.Favorite}/${currentFilmId}/${isFavorite ? 0 : 1}`).reply(401, fakeFilm);

  //   const store = mockStore();
  //   await store.dispatch(setFavouriteCurrentAction({currentFilmId, isFavorite}));

  //   const actions = store.getActions().map(({type}) => type);
  //   expect(actions).toContain(redirectToRoute.toString());
  // });

  // it('should dispatch "requireAuthorization" with "AUTH" and receive user data when GET "/login" return 200', async () => {
  //   const {avatarUrl, name} = fakeUserData;

  //   mockApi.onGet(APIRoute.Login).reply(200, fakeUserData);

  //   const store = mockStore();
  //   await store.dispatch(checkAuthAction());

  //   const actions = store.getActions().map(({type}) => type);
  //   expect(actions).toContain(requireAuthorization.toString());
  //   expect(actions).toContain(setUserData.toString());

  //   const requireAuthorizationAction = store.getActions().find((action) => action.type === requireAuthorization.toString());
  //   expect(requireAuthorizationAction).toMatchObject({payload: AuthorizationStatus.Auth});

  //   const setUserDataAction = store.getActions().find((action) => action.type === setUserData.toString());
  //   expect(setUserDataAction).toMatchObject({payload: {avatarUrl, name}});
  // });

  // it('should dispatch "requireAuthorization" with "NO_AUTH" when GET "/login" return 401', async () => {
  //   mockApi.onGet(APIRoute.Login).reply(401, []);

  //   const store = mockStore();
  //   await store.dispatch(checkAuthAction());

  //   const actions = store.getActions().map(({type}) => type);
  //   expect(actions).toContain(requireAuthorization.toString());

  //   const requireAuthorizationAction = store.getActions().find((action) => action.type === requireAuthorization.toString());
  //   expect(requireAuthorizationAction).toMatchObject({payload: AuthorizationStatus.NoAuth});
  // });

  // it('should dispatch "requireAuthorization" with "AUTH" when POST "/login" return 200', async () => {
  //   const fakeUser: AuthData = {email: 'test@test.ru', password: '123456'};

  //   mockApi.onPost(APIRoute.Login).reply(200, {token: 'secret'});

  //   const store = mockStore();
  //   Storage.prototype.setItem = jest.fn();
  //   await store.dispatch(loginAction(fakeUser));

  //   const actions = store.getActions().map(({type}) => type);
  //   expect(actions).toContain(requireAuthorization.toString());

  //   const requireAuthorizationAction = store.getActions().find((action) => action.type === requireAuthorization.toString());
  //   expect(requireAuthorizationAction).toMatchObject({payload: AuthorizationStatus.Auth});

  //   expect(Storage.prototype.setItem).toBeCalledTimes(1);
  //   expect(Storage.prototype.setItem).toBeCalledWith('wtw-token', 'secret');
  // });

  // it('should dispatch "requireAuthorization" with "NO_AUTH" when POST "/login" return 400', async () => {
  //   const fakeUser: AuthData = {email: 'test@test.ru', password: '123456'};

  //   mockApi.onPost(APIRoute.Login).reply(400, {token: 'secret'});

  //   const store = mockStore();
  //   await store.dispatch(loginAction(fakeUser));

  //   const actions = store.getActions().map(({type}) => type);
  //   expect(actions).toContain(requireAuthorization.toString());

  //   const requireAuthorizationAction = store.getActions().find((action) => action.type === requireAuthorization.toString());
  //   expect(requireAuthorizationAction).toMatchObject({payload: AuthorizationStatus.NoAuth});
  // });

  // it('should dispatch "requireAuthorization" and "setPromoFilm" when Delete /logout', async () => {
  //   mockApi.onDelete(APIRoute.Logout).reply(204);

  //   const store = mockStore();
  //   Storage.prototype.removeItem = jest.fn();
  //   await store.dispatch(logoutAction());

  //   const actions = store.getActions().map(({type}) => type);
  //   expect(actions).toContain(requireAuthorization.toString());
  //   expect(actions).toContain(setPromoFilm.toString());

  //   const requireAuthorizationAction = store.getActions().find((action) => action.type === requireAuthorization.toString());
  //   expect(requireAuthorizationAction).toMatchObject({payload: AuthorizationStatus.NoAuth});

  //   const setPromoFilmAction = store.getActions().find((action) => action.type === setPromoFilm.toString());
  //   expect(setPromoFilmAction).toMatchObject({payload: fakeFilm});

  //   expect(Storage.prototype.removeItem).toBeCalledTimes(1);
  //   expect(Storage.prototype.removeItem).toBeCalledWith('wtw-token');
  // });
});
