import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {authUserProcess} from './auth-user-process/auth-user-process';
import {filmsData} from './films-process/films-process';
import {filmData} from './film-process/film-process';
import {commentsData} from './comments-process/comments-process';
import {sendingCommentProcess} from './sending-comment-process/sending-comment-process';
import {promoFilmData} from './promo-film-process/promo-film-process';
import {myFavoriteFilmsProcess} from './my-favorite-film-process/my-favorite-film-process';
import {changeAuthStatusProcess} from './change-auth-status-process/change-auth-status-process';
import {similarFilmsData} from './similar-films-process/similar-films-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: authUserProcess.reducer,
  [NameSpace.Films]: filmsData.reducer,
  [NameSpace.Film]: filmData.reducer,
  [NameSpace.Comments]: commentsData.reducer,
  [NameSpace.SendingComment]: sendingCommentProcess.reducer,
  [NameSpace.PromoFilm]: promoFilmData.reducer,
  [NameSpace.Favorite]: myFavoriteFilmsProcess.reducer,
  [NameSpace.Auth]: changeAuthStatusProcess.reducer,
  [NameSpace.Similar]: similarFilmsData.reducer,
});
