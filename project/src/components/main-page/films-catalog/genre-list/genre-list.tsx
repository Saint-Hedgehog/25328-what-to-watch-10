import classNames from 'classnames';
import {useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';
import {changeGenre} from '../../../../store/films-process/films-process';
import {getFilms, getGenreFilms} from '../../../../store/films-process/selectors';
import {COUNTE_UNIQUE_GENRES, DEFAULT_GANRE, ZERO} from '../../../../const';

function GenreList() {
  const selectedGenre = useAppSelector(getGenreFilms);
  const films = useAppSelector(getFilms);
  const dispatch = useAppDispatch();
  const genres = films.map((film) => film.genre);
  const uniqueGenres = [DEFAULT_GANRE, ...Array.from(new Set(genres))].map(
    (genre, index) => ({
      id: index,
      genre,
    }),
  );
  const location = useLocation();
  const hashLocation: string = location.hash;

  const handleGenreClick = (
    evt: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    const genre = evt.currentTarget.children[0].innerHTML;

    dispatch(changeGenre({genre}));
  };

  useEffect(() => {
    let genre = decodeURI(window.location.hash.replace('#', ''));

    if (!genre || !uniqueGenres.some((item) => item.genre === genre)) {
      genre = DEFAULT_GANRE;
    }

    dispatch(changeGenre({genre}));
  }, [dispatch, hashLocation, uniqueGenres]);

  const genreList = uniqueGenres.slice(ZERO, COUNTE_UNIQUE_GENRES);

  return (
    <ul className="catalog__genres-list">
      {genreList.map(({genre, id}) => (
        <li
          key={id}
          onClick={handleGenreClick}
          className={classNames('catalog__genres-item', {
            'catalog__genres-item--active': genre === selectedGenre,
          })}
          style={{pointerEvents: genre === selectedGenre ? 'none' : 'auto'}}
        >
          <Link
            to={`#${genre}`}
            className="catalog__genres-link"
            data-testid="genre"
          >
            {genre}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
