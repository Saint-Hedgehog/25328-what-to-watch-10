import {Film} from '../../../types/film';
import dayjs from 'dayjs';
import React from 'react';

type Props = {
  film: Film;
};

function MoviePageDetails({film}: Props) {
  const {director, starring, runTime, genre, released} = film;

  const durationInHours = dayjs.duration(runTime, 'minutes').format('H');
  const durationInMinutes = dayjs
    .duration(runTime, 'minutes')
    .format('mm');
  const filmDuration = `${durationInHours}h ${durationInMinutes}m`;

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {starring.map((actor, i) => (i !== starring.length - 1 ?
              <React.Fragment key={actor}>{actor},<br /></React.Fragment> :
              <React.Fragment key={actor}>{actor}</React.Fragment>))}
          </span>
        </p>
      </div>
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{filmDuration}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
}

export default MoviePageDetails;
