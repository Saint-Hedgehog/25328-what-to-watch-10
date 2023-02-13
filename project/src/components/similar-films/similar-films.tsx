import classNames from 'classnames';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {loadSimilarFilmsAction} from '../../store/api-actions';
import {getSimilarFilms} from '../../store/similar-films-process/selectors';
import {COUNT_SIMILAR_FILMS, ZERO} from '../../const';
import SmallFilmCard from '../small-film-card/small-film-card';
import React from 'react';

type Props = {
  currentFilmId: number;
};

function SimilarFilms({currentFilmId}: Props) {
  const dispatch = useAppDispatch();
  const similarFilms = useAppSelector(getSimilarFilms);

  useEffect(() => {
    dispatch(loadSimilarFilmsAction(String(currentFilmId)));
  }, [dispatch, currentFilmId]);

  const filmsByGenre = similarFilms
    .filter((film) => film.id !== currentFilmId)
    .slice(ZERO, COUNT_SIMILAR_FILMS)
    .map((film) => (
      <SmallFilmCard
        key={film.id}
        name={film.name}
        posterImage={film.previewImage}
        id={film.id}
        videoLink={film.previewVideoLink}
      />
    ));

  const isTitleVisible = filmsByGenre.length !== 0;

  return (
    <section className="catalog catalog--like-this">
      <h2
        className={classNames(
          {'catalog__title': isTitleVisible},
          {'visually-hidden': !isTitleVisible},
        )}
        data-testid="catalog--like-this"
      >
        More like this
      </h2>

      <div className="catalog__films-list">{filmsByGenre}</div>
    </section>
  );
}

export default React.memo(SimilarFilms);
