import {useEffect} from 'react';
import {Link, Route, Routes, useNavigate, useParams} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {changeFavoriteFilmStatusAction, loadFavoriteFilmsAction} from '../../store/api-actions';
import {loadFilmByIdAction} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/change-auth-status-process/selectors';
import {getError} from '../../store/film-process/selectors';
import {getFilm} from '../../store/film-process/selectors';
import {resetError} from '../../store/film-process/film-process';
import {getLoadedFilmsStatus} from '../../store/films-process/selectors';
import {getFavoriteFilmsLength} from '../../store/my-favorite-film-process/selectors';
import Spinner from '../spinner/spinner';
import SimilarFilms from '../similar-films/similar-films';
import Tabs from './tabs/tabs';
import MoviePageDetails from './movie-page-details/movie-page-details';
import MoviePageOverview from './movie-page-overview/movie-page-overview';
import MoviePageReviews from './movie-page-reviews/movie-page-reviews';
import Logo from '../logo/logo';
import User from '../user/user';
import Footer from '../footer/footer';
import NotFoundPage from '../not-found-page/not-found-page';

function Movie() {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(getError);
  const film = useAppSelector(getFilm);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoaded = useAppSelector(getLoadedFilmsStatus);
  const favoriteFilmsLength = useAppSelector(getFavoriteFilmsLength);

  useEffect(() => {
    if (id) {
      dispatch(loadFilmByIdAction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(loadFavoriteFilmsAction());
    }
  }, [authorizationStatus, dispatch]);

  useEffect(() => () => {
    if(error) {
      dispatch(resetError());
    }
  }, []);

  if (error) {
    return <NotFoundPage />;
  }

  if (!film || isDataLoaded) {
    return <Spinner />;
  }

  const {isFavorite, name, genre, released, backgroundImage, posterImage} = film;

  const handleFavoriteButtonClick = () => {
    if (id) {
      const status = isFavorite ? 0 : 1;
      dispatch(changeFavoriteFilmStatusAction({status: String(status), id}));
    }
  };

  const handleNavigateToPlayerClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate(`${AppRoute.Player}/${id}`);
  };

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header film-card__head">
            <Logo />
            <User />
          </header>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
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
                    {isFavorite ? (
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
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <Link
                    to={`${AppRoute.Film}/${id}${AppRoute.Review}`}
                    className="btn film-card__button"
                  >
                    Add review
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={posterImage}
                alt={name}
                width="218"
                height="327"
              />
            </div>
            <div className="film-card__desc">
              <Tabs />
              <Routes>
                <Route index element={<MoviePageOverview film={film} />} />
                <Route path="/overview" element={<MoviePageOverview film={film} />} />
                <Route path="/details" element={<MoviePageDetails film={film} />} />
                <Route path="/reviews" element={<MoviePageReviews />} />
              </Routes>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <SimilarFilms currentFilmId={film.id} />
        <Footer />
      </div>
    </>
  );
}
export default Movie;
