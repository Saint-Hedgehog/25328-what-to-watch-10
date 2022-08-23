import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {loadFilmByIdAction} from '../../store/api-actions';
import {getLoadedFilmsStatus} from '../../store/films-process/selectors';
import {getError, getFilm} from '../../store/film-process/selectors';
import Spinner from '../spinner/spinner';
import Logo from '../logo/logo';
import Breadcrumbs from './breadcrumbs/breadcrumbs';
import User from '../user/user';
import AddReviewForm from './add-review-form/add-review-form';
import NotFoundPage from '../not-found-page/not-found-page';
import { resetError } from '../../store/film-process/film-process';

function AddReview() {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const isDataLoaded = useAppSelector(getLoadedFilmsStatus);
  const error = useAppSelector(getError);


  useEffect(() => {
    if (id) {
      dispatch(loadFilmByIdAction(id));
    }
  }, [dispatch, id]);

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

  const {backgroundImage, name, posterImage} = film;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <Logo />
          <Breadcrumbs film={film} />
          <User />
        </header>
        <div className="film-card__poster film-card__poster--small">
          <img
            src={posterImage}
            alt={name}
            width="218"
            height="327"
          />
        </div>
      </div>
      <AddReviewForm />
    </section>
  );
}
export default AddReview;
