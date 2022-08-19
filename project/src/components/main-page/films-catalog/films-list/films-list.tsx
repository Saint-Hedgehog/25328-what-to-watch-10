import {useEffect, useMemo, useState} from 'react';
import {useAppSelector} from '../../../../hooks/hooks';
import {getFilms} from '../../../../store/films-process/selectors';
import {getGenreFilms} from '../../../../store/films-process/selectors';
import {DEFAULT_GANRE, FILM_CARD_COUNT_ON_PAGE, ZERO} from '../../../../const';
import SmallFilmCard from '../../../small-film-card/small-film-card';

function ListFilms() {
  const films = useAppSelector(getFilms);
  const genre = useAppSelector(getGenreFilms);
  const [showFilmsCount, setShowFilmsCount] = useState(FILM_CARD_COUNT_ON_PAGE);

  useEffect(() => {
    setShowFilmsCount(FILM_CARD_COUNT_ON_PAGE);
  }, [genre]);

  const filtredFilmsByGenre = genre === DEFAULT_GANRE ? films
    : films.filter((film) => film.genre === genre);

  const filmList = filtredFilmsByGenre.slice(ZERO, showFilmsCount);

  const handleShowMoreCLick = () => {
    setShowFilmsCount(showFilmsCount + FILM_CARD_COUNT_ON_PAGE);
  };

  const smallFilmCards = useMemo(
    () =>
      filmList.map((film) => (
        <SmallFilmCard
          key={film.id}
          name={film.name}
          posterImage={film.previewImage}
          id={film.id}
          videoLink={film.previewVideoLink}
        />
      )),
    [filmList],
  );

  return (
    <>
      <div className="catalog__films-list">{smallFilmCards}</div>
      {!(filtredFilmsByGenre.length - showFilmsCount < 0) && (
        <div className="catalog__more">
          <button
            className="catalog__button"
            type="button"
            onClick={handleShowMoreCLick}
          >
            Show more
          </button>
        </div>
      )}
    </>
  );
}

export default ListFilms;
