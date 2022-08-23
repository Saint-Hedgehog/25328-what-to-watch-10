import {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {loadFavoriteFilmsAction} from '../../store/api-actions';
import {getErrorFavoriteFilms} from '../../store/my-favorite-film-process/selectors';
import {getFavoriteFilms} from '../../store/my-favorite-film-process/selectors';
import {getLoadedFavoriteFilmsStatus} from '../../store/my-favorite-film-process/selectors';
import User from '../user/user';
import Spinner from '../spinner/spinner';
import Footer from '../footer/footer';
import Logo from '../logo/logo';
import SmallFilmCard from '../small-film-card/small-film-card';
import NotFoundPage from '../not-found-page/not-found-page';

function MyList() {
  const films = useAppSelector(getFavoriteFilms);
  const error = useAppSelector(getErrorFavoriteFilms);
  const isFetching = useAppSelector(getLoadedFavoriteFilmsStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadFavoriteFilmsAction());
  }, [dispatch]);

  const smallFilmCards = useMemo(
    () =>
      films.map((film) => (
        <SmallFilmCard
          key={film.id}
          name={film.name}
          posterImage={film.previewImage}
          id={film.id}
          videoLink={film.previewVideoLink}
        />
      )),
    [films],
  );

  if (error) {
    return <NotFoundPage />;
  }

  if (isFetching || !films) {
    return <Spinner />;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list</h1>
        <User />
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list">{smallFilmCards}</div>
      </section>
      <Footer />
    </div>
  );
}
export default MyList;
