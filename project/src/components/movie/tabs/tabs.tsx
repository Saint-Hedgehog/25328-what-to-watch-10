import classNames from 'classnames';
import {Link, useLocation} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {AppRoute, TabNames} from '../../../const';

function Tabs() {
  const {id} = useParams();
  const {pathname} = useLocation();

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        <li
          className={classNames('film-nav__item', {
            'film-nav__item--active': pathname.includes(TabNames.Overview),
          })}
        >
          <Link
            to={`${AppRoute.Film}/${id}${TabNames.Overview}`}
            className="film-nav__link"
          >
            Overview
          </Link>
        </li>
        <li
          className={classNames('film-nav__item', {
            'film-nav__item--active': pathname.includes(TabNames.Details),
          })}
        >
          <Link
            to={`${AppRoute.Film}/${id}${TabNames.Details}`}
            className="film-nav__link"
          >
            Details
          </Link>
        </li>
        <li
          className={classNames('film-nav__item', {
            'film-nav__item--active': pathname.includes(TabNames.Reviews),
          })}
        >
          <Link
            to={`${AppRoute.Film}/${id}${TabNames.Reviews}`}
            className="film-nav__link"
          >
            Reviews
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Tabs;
