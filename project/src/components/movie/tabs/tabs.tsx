import classNames from 'classnames';
import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {AppRoute, TabNames} from '../../../const';

function Tabs() {
  const {id} = useParams();
  const { pathname } = useLocation();

  const defaultTabRegex = new RegExp(`(${TabNames.Overview}|${TabNames.Details}|${TabNames.Reviews})$`, 'i');
  const isDefaultTab = !pathname.match(defaultTabRegex);
  const overviewRegex = new RegExp(`${TabNames.Overview}$`, 'i');
  const detailsRegex = new RegExp(`${TabNames.Details}$`, 'i');
  const reviewsRegex = new RegExp(`${TabNames.Reviews}$`, 'i');

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        <li
          className={classNames('film-nav__item', {
            'film-nav__item--active': pathname.match(overviewRegex) || isDefaultTab,
          })}
          style={{pointerEvents: pathname.match(overviewRegex) || isDefaultTab ? 'none' : 'auto'}}
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
            'film-nav__item--active': pathname.match(detailsRegex),
          })}
          style={{pointerEvents: pathname.match(detailsRegex) ? 'none' : 'auto'}}
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
            'film-nav__item--active': pathname.match(reviewsRegex),
          })}
          style={{pointerEvents: pathname.match(reviewsRegex) ? 'none' : 'auto'}}
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

export default React.memo(Tabs);
