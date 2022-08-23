export const KEY_ESCAPE = 'Escape';
export const DEFAULT_GANRE = 'All genres';
export const ZERO = 0;
export const COUNTE_UNIQUE_GENRES = 10;
export const FILM_CARD_COUNT_ON_PAGE = 8;
export const COUNT_SIMILAR_FILMS = 4;
export const CURSOR_OFFSET_TO_CENTER = 25;
export const RATING_STARS = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
export const EMAIL_REG_EXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
export const PASSWORD_REG_EXP = /^.*(?=.{2,})(?=.*\d)(?=.*[a-zA-Zа-яА-ЯёЁ]).*$/i;

export enum MessageLength {
  Min = 50,
  Max = 400,
}

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films',
  DefaultFilm = ':id/*',
  Player = '/player',
  DefaultVideoPlayer = '/player/:id',
  Review = '/review',
  DefaultAddReview = ':id/review',
  Overview = '/overview',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NOAUTH',
  Unknown = 'UNKNOWN',
}

export enum TabNames {
  Overview = '/overview',
  Details = '/details',
  Reviews = '/reviews',
}

export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  PromoFilm = '/promo',
  Favorite = '/favorite',
  Similar = '/similar',
}

export enum HttpCode {
  BadRequest = 400,
  UnAuthorized = 401,
  NotFound = 404,
}

export enum NameSpace {
  Data = 'DATA',
  Films = 'FILMS',
  Film = 'FILM',
  Comments = 'COMMENTS',
  SendingComment = 'SENDING_COMMENT',
  PromoFilm = 'PROMO',
  Favorite = 'FAVORITE',
  User = 'USER',
  Auth = 'AUTH',
  Similar = 'SIMILAR',
}

export enum CommentSendingStatus {
  Unknown = 'UNKNOWN',
  Success = 'SUCCESS',
  Error = 'ERROR',
}

export enum RatingLevelCountValue {
  Zero = 0,
  Three = 3,
  Five = 5,
  Eight = 8,
  Ten = 10
}

export enum RatingLevel {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very good',
  Awesome = 'Awesome'
}
