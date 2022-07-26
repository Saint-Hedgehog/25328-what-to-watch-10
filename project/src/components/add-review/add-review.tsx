import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {FilmDataType} from '../../types/types';
import {SubmitCommentForm} from './submit-comment-form';
import HeaderElement from '../layout/header-layout';
import SignOut from '../header/user-block/sign-out';
import BreadcrumbsElement from './breadcrumbs';
import Spinner from '../spinner/spinner';
import {getFilm} from '../../fetch/request-to-server';

function AddReview() {
  const { id } = useParams();
  const [filmData, setFilmData] = useState<FilmDataType | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getFilm(Number(id));
      setFilmData(data);
    })();
  }, [id]);

  if(filmData === null){
    return (
      <Spinner />
    );
  }

  const {name, backgroundImage, posterImage}: FilmDataType = filmData;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <HeaderElement >
          <BreadcrumbsElement filmData={filmData}/>
          <SignOut/>
        </HeaderElement>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <SubmitCommentForm />
      </div>
    </section>
  );
}

export default AddReview;
