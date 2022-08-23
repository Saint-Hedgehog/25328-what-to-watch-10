import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {changeFavoriteFilmStatusAction, loadFavoriteFilmsAction} from '../../store/api-actions';
import {getFavoriteFilmsLength} from '../../store/my-favorite-film-process/selectors';
import {loadPromoFilmAction} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/change-auth-status-process/selectors';
import {getErrorPromoFilm} from '../../store/promo-film-process/selectors';
import {getPromoFilm} from '../../store/promo-film-process/selectors';
import {getFilmStatus} from '../../store/film-process/selectors';
import {AppRoute, AuthorizationStatus} from '../../const';
import Logo from '../logo/logo';
import User from '../user/user';
import Spinner from '../spinner/spinner';

function PromoFilm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const film = useAppSelector(getPromoFilm);
  const error = useAppSelector(getErrorPromoFilm);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoriteFilmsLength = useAppSelector(getFavoriteFilmsLength);
  const filmStatus = useAppSelector(getFilmStatus);

  useEffect(() => {
    dispatch(loadPromoFilmAction());
  }, [dispatch]);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(loadFavoriteFilmsAction());
    }
  }, [authorizationStatus, filmStatus, dispatch]);

  if (error) {
    return null;
  }

  if (!film) {
    return <Spinner />;
  }

  const {id, isFavorite, backgroundImage, name, posterImage, genre, released} = film;

  const handleFavoriteButtonClick = () => {
    const status = isFavorite ? 0 : 1;
    dispatch(
      changeFavoriteFilmStatusAction({
        status: String(status),
        id: String(id),
      }),
    );
  };

  const handleNavigateToPlayerClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate(`${AppRoute.Player}/${id}`);
  };

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={backgroundImage} alt={name} />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <header className="page-header film-card__head">
        <Logo />
        <User />
      </header>
      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img
              src={posterImage}
              alt={ name}
              width="218"
              height="327"
            />
          </div>
          <div className="film-card__desc">
            <h2 className="film-card__title">{ name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{genre}</span>
              <span className="film-card__year">{released}</span>
            </p>
            <div className="film-card__buttons">
              <button
                onClick={handleNavigateToPlayerClick}
                className="btn btn--play film-card__button"
                type="button"
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              {authorizationStatus === AuthorizationStatus.Auth ? (
                <button
                  onClick={handleFavoriteButtonClick}
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  { isFavorite ? (
                    <svg viewBox="0 0 18 14" width="18" height="14">
                      <use xlinkHref="#in-list"></use>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                  )}
                  <span>My list</span>
                  <span className="film-card__count">{favoriteFilmsLength}</span>
                </button>
              ) :
                <Link to={AppRoute.SignIn} className="btn btn--list film-card__button" >
                  <svg viewBox="0 0 18 14" width="18" height="14">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">0</span>
                </Link>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoFilm;
