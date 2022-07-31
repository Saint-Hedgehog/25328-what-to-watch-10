import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {FilmDataType, FilmsDataPropsType} from '../../../../types/types';
import {FiltersHash, Genres, VISIBLE_FILMS_STEP_COUNT, ZERO_VALUE} from '../../../utils/const';
import {setGenresStateAction, setInitialVisibleFilmsState} from '../../../../store/actions';
import { useAppSelector, useAppDispatch } from '../../../../store/main';
import FilmCardForCatalog from './film-card-for-catalog/film-card-for-catalog';
import ShowMoreButtonElement from './show-more-button/show-more-button';
import FiltersElement from './filters/filters';

let filteredFilmsMap: Map<string, FilmDataType[]> | null = null;

const getFilteredFilms = (filmsData: FilmDataType[], hash: string): FilmDataType[] | [] => {
  switch (true) {
    case (hash === FiltersHash.All || hash === ''): {
      return filmsData;
    }
    case (hash === FiltersHash.Comedies): {
      return filmsData.slice().filter((film: FilmDataType) => film.genre === Genres.Comedy);
    }
    case (hash === FiltersHash.Crime): {
      return filmsData.slice().filter((film: FilmDataType) => (film.genre === Genres.Crime || film.genre === Genres.Action));
    }
    case (hash === FiltersHash.Documentary): {
      return filmsData.slice().filter((film: FilmDataType) => film.genre === Genres.Documentary);
    }
    case (hash === FiltersHash.Dramas): {
      return filmsData.slice().filter((film: FilmDataType) => film.genre === Genres.Drama);
    }
    case (hash === FiltersHash.Horror): {
      return filmsData.slice().filter((film: FilmDataType) => film.genre === Genres.Horror);
    }
    case (hash === FiltersHash.Family): {
      return filmsData.slice().filter((film: FilmDataType) => film.genre === Genres.Adventure);
    }
    case (hash === FiltersHash.Romance): {
      return filmsData.slice().filter((film: FilmDataType) => film.genre === Genres.Romance);
    }
    case (hash === FiltersHash.SciFi): {
      return filmsData.slice().filter((film: FilmDataType) => film.genre === Genres.Fantasy);
    }
    case (hash === FiltersHash.Thrillers): {
      return filmsData.slice().filter((film: FilmDataType) => film.genre === Genres.Thriller);
    }
    default: return [];
  }
};

const Catalog = ({ filmsList }: FilmsDataPropsType): JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const hashLocation: string = location.hash;

  let validHash = false;

  useEffect(() => {
    dispatch(setInitialVisibleFilmsState());
  }, [dispatch, hashLocation]);

  if (filteredFilmsMap === null) {
    filteredFilmsMap = new Map();
    for (const item in FiltersHash) {
      const key = item as keyof typeof FiltersHash;
      const value = FiltersHash[key];
      if (hashLocation === value) {
        validHash = true;
      }
      filteredFilmsMap.set(value, getFilteredFilms(filmsList, value));
    }
  } else {
    for (const item in FiltersHash) {
      const key = item as keyof typeof FiltersHash;
      const value = FiltersHash[key];
      if (hashLocation === value) {
        validHash = true;
        break;
      }
    }
  }

  if (!validHash || hashLocation === '') {
    dispatch(setGenresStateAction(FiltersHash.All));
  } else {
    dispatch(setGenresStateAction(hashLocation));
  }

  const genreStateApp = useAppSelector((state) => state.selectedGenre);
  const visibleFilmsCount = useAppSelector((state) => state.visibleFilms);
  const convertFilmsData = filteredFilmsMap.get(genreStateApp);

  if (convertFilmsData === undefined) {
    return (
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FiltersElement validHash={validHash} />

        <div className="catalog__films-list">

        </div>

      </section>
    );
  }

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <FiltersElement validHash={validHash} />

      <div className="catalog__films-list">
        {
          (() => {
            if (convertFilmsData.length === ZERO_VALUE) {
              return (
                <h2 className='catalog__title'>There are no films in this category</h2>
              );
            }
            return convertFilmsData.slice(0, visibleFilmsCount).map((item: FilmDataType) => <FilmCardForCatalog key={item.id} item={item} />);
          })()
        }
      </div>
      {
        (() => {
          if ((convertFilmsData.length - visibleFilmsCount) <= VISIBLE_FILMS_STEP_COUNT) {
            return;
          }
          return <ShowMoreButtonElement />;
        })()
      }
    </section>
  );
};

export default Catalog;
