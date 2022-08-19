import {toast} from 'react-toastify';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './store';
import {APIRoute, AuthorizationStatus} from '../const';
import {Film} from '../types/film';
import {AuthData} from '../types/auth-data';
import {User} from '../types/user';
import {SendingCommentData} from '../types/sending-comment-data';
import {dropToken, saveToken} from '../services/token';
import {setUserData} from './auth-user-process/auth-user-process';
import {checkAuthorizationError} from './auth-user-process/auth-user-process';
import {checkAuthorizationRequest} from './auth-user-process/auth-user-process';
import {loadFilmsSuccess} from './films-process/films-process';
import {loadFilmsError} from './films-process/films-process';
import {loadFilmsRequest} from './films-process/films-process';
import {loadFilmByIdError} from './film-process/film-process';
import {loadFilmByIdRequest} from './film-process/film-process';
import {loadFilmByIdSuccess} from './film-process/film-process';
import {loadSimilarFilmsRequest} from './similar-films-process/similar-films-process';
import {loadSimilarFilmsError} from './similar-films-process/similar-films-process';
import {loadSimilarFilmsSuccess} from './similar-films-process/similar-films-process';
import {loadCommentsRequest} from './comments-process/comments-process';
import {loadCommentsSuccess} from './comments-process/comments-process';
import {loadCommentsError} from './comments-process/comments-process';
import {sendCommentError} from './sending-comment-process/sending-comment-process';
import {sendCommentRequest} from './sending-comment-process/sending-comment-process';
import {sendCommentSuccess} from './sending-comment-process/sending-comment-process';
import {loadPromoFilmError} from './promo-film-process/promo-film-process';
import {loadPromoFilmRequest} from './promo-film-process/promo-film-process';
import {loadPromoFilmSuccess} from './promo-film-process/promo-film-process';
import {loadFavoriteFilmsError} from './my-favorite-film-process/my-favorite-film-process';
import {loadFavoriteFilmsRequest} from './my-favorite-film-process/my-favorite-film-process';
import {loadFavoriteFilmsSuccess} from './my-favorite-film-process/my-favorite-film-process';
import {changeFavoriteFilmError} from './my-favorite-film-process/my-favorite-film-process';
import {changeFavoriteFilmRequest} from './my-favorite-film-process/my-favorite-film-process';
import {changeFavoriteFilmSuccess} from './my-favorite-film-process/my-favorite-film-process';
import {changeAuthStatus} from './change-auth-status-process/change-auth-status-process';
import {checkAuthStatusError} from './change-auth-status-process/change-auth-status-process';
import {checkAuthStatusRequest} from './change-auth-status-process/change-auth-status-process';
import {checkAuthStatusSuccess} from './change-auth-status-process/change-auth-status-process';
import errorHandle from '../services/error-handle';

export const loadFilmsAction = createAsyncThunk(
  'data/loadFilms',
  async () => {
    try {
      store.dispatch(loadFilmsRequest());
      const {data} = await api.get<Film[]>(APIRoute.Films);
      store.dispatch(loadFilmsSuccess(data));
    } catch (error) {
      store.dispatch(loadFilmsError(error));
      errorHandle(error);
    }
  });

export const checkAuthAction = createAsyncThunk(
  'user/checkAuthorization',
  async () => {
    try {
      store.dispatch(checkAuthStatusRequest());
      const {data} = await api.get(APIRoute.Login);
      store.dispatch(changeAuthStatus(AuthorizationStatus.Auth));
      store.dispatch(checkAuthStatusSuccess());
      store.dispatch(setUserData(data));
    } catch (error) {
      store.dispatch(checkAuthStatusError());
      errorHandle(error);
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({email, password}: AuthData) => {
    try {
      store.dispatch(checkAuthorizationRequest());
      const {data} = await api.post<User>(APIRoute.Login, {
        email,
        password,
      });
      saveToken(data.token);
      store.dispatch(changeAuthStatus(AuthorizationStatus.Auth));
      store.dispatch(setUserData(data));
      toast.success(`Congratulations ${data.name}, you have successfully logged in`);
    } catch (error) {
      errorHandle(error);
      store.dispatch(checkAuthorizationError(error));
      store.dispatch(changeAuthStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      store.dispatch(checkAuthorizationRequest());
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(changeAuthStatus(AuthorizationStatus.NoAuth));
      store.dispatch(setUserData(null));
    } catch (error) {
      errorHandle(error);
      store.dispatch(checkAuthorizationError(error));
    }
  });

export const loadFilmByIdAction = createAsyncThunk(
  'data/loadFilmById',
  async (id: string) => {
    try {
      store.dispatch(loadFilmByIdRequest());
      const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
      store.dispatch(loadFilmByIdSuccess(data));
    } catch (error) {
      store.dispatch(loadFilmByIdError(error));
      errorHandle(error);
    }
  },
);

export const loadSimilarFilmsAction = createAsyncThunk(
  'data/loadSimilarFilms',
  async (id: string) => {
    try {
      store.dispatch(loadSimilarFilmsRequest());
      const {data} = await api.get<Film[]>(`${APIRoute.Films}/${id}${APIRoute.Similar}`);
      store.dispatch(loadSimilarFilmsSuccess(data));
    } catch (error) {
      store.dispatch(loadSimilarFilmsError());
      errorHandle(error);
    }
  },
);

export const loadCommentsAction = createAsyncThunk(
  'data/loadCommentsFilms',
  async (id: string) => {
    try {
      store.dispatch(loadCommentsRequest());
      const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);

      store.dispatch(loadCommentsSuccess(data));
    } catch (error) {
      store.dispatch(loadCommentsError());
      errorHandle(error);
    }
  },
);

export const sendCommentAction = createAsyncThunk(
  'data/sendComment',
  async ({
    reviewMessage,
    rating,
    id,
  }: {
    reviewMessage: string;
    rating: string;
    id: string;
  }) => {
    try {
      store.dispatch(sendCommentRequest());
      await toast.promise(
        api.post<SendingCommentData>(`${APIRoute.Comments}/${id}`, {
          comment: reviewMessage,
          rating,
        }),
        {
          pending: 'Review is sending',
          success: 'Review sent 👌',
          error: 'Send error 🤯',
        },
      );
      store.dispatch(sendCommentSuccess());
    } catch (error) {
      store.dispatch(sendCommentError(error));
      errorHandle(error);
    }
  },
);

export const loadPromoFilmAction = createAsyncThunk(
  'data/loadPromoFilm',
  async () => {
    try {
      store.dispatch(loadPromoFilmRequest());
      const {data} = await api.get<Film>(`${APIRoute.PromoFilm}`);
      store.dispatch(loadPromoFilmSuccess(data));
    } catch (error) {
      store.dispatch(loadPromoFilmError(error));

      errorHandle(error);
    }
  },
);

export const loadFavoriteFilmsAction = createAsyncThunk(
  'data/loadFavoriteFilms',
  async () => {
    try {
      store.dispatch(loadFavoriteFilmsRequest());
      const {data} = await api.get<Film[]>(APIRoute.Favorite);
      store.dispatch(loadFavoriteFilmsSuccess(data));
    } catch (error) {
      store.dispatch(loadFavoriteFilmsError());
      errorHandle(error);
    }
  },
);

export const changeFavoriteFilmStatusAction = createAsyncThunk(
  'data/changeFavoriteFilmStatus',
  async ({status, id}: {status: string; id: string}) => {
    try {
      store.dispatch(changeFavoriteFilmRequest());
      await api.post<Film>(`${APIRoute.Favorite}/${id}/${status}`);
      store.dispatch(loadFilmByIdAction(id));
      store.dispatch(loadPromoFilmAction());
      store.dispatch(loadFavoriteFilmsAction());
      store.dispatch(changeFavoriteFilmSuccess());
    } catch (error) {
      store.dispatch(changeFavoriteFilmError());
      errorHandle(error);
    }
  },
);
