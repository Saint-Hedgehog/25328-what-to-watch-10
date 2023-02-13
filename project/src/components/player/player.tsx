import {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import useVideoPlayer from '../../hooks/use-video-player';
import {loadFilmByIdAction} from '../../store/api-actions';
import {getError} from '../../store/film-process/selectors';
import {getFetchedFilmStatus} from '../../store/film-process/selectors';
import {getFilm} from '../../store/film-process/selectors';
import Spinner from '../spinner/spinner';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import NotFoundPage from '../not-found-page/not-found-page';
dayjs.extend(duration);

function Player() {
  const {id} = useParams();
  const error = useAppSelector(getError);
  const film = useAppSelector(getFilm);
  const isFetching = useAppSelector(getFetchedFilmStatus);
  const dispatch = useAppDispatch();
  const [isFullScreen, setFullScreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLProgressElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerPlayer = containerRef.current;
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleProgressClick,
    handleExitClick,
  } = useVideoPlayer(videoRef, progressBarRef);

  useEffect(() => {
    if (!containerPlayer) {
      return;
    }

    if (isFullScreen) {
      containerPlayer.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [containerPlayer, isFullScreen]);

  useEffect(() => {
    if (id) {
      dispatch(loadFilmByIdAction(id));
    }
  }, [dispatch, id]);

  if (error) {
    return <NotFoundPage />;
  }

  if (isFetching || !film) {
    return <Spinner />;
  }

  const {runTime, backgroundImage, videoLink, name} = film;
  const {videoDuration, progress, isPlaying} = playerState;

  const filmDuration = dayjs.duration(
    videoDuration || runTime,
    'seconds',
  );

  const formatedFilmDuration =
    filmDuration.asHours() >= 1
      ? filmDuration.format('-HH:mm:ss')
      : filmDuration.format('-mm:ss');

  return (
    <div className="player" ref={containerRef}>
      <video
        ref={videoRef}
        className="player__video"
        poster={backgroundImage}
        onTimeUpdate={handleOnTimeUpdate}
        muted
        autoPlay
      >
        <source src={videoLink} />
      </video>
      <button
        onClick={handleExitClick}
        type="button"
        className="player__exit"
      >
          Exit
      </button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              style={{cursor: 'pointer'}}
              onChange={handleVideoProgress}
              className="player__progress"
              value={progress}
              max="100"
              onClick={handleProgressClick}
              ref={progressBarRef}
            />
            <div
              className="player__toggler"
              style={{left: `${progress}%`}}
            >
                Toggler
            </div>
          </div>
          <div className="player__time-value">{formatedFilmDuration}</div>
        </div>
        <div className="player__controls-row">
          <button onClick={togglePlay} type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              {isPlaying ? (
                <use xlinkHref="#play-s" />
              ) : (
                <use xlinkHref="#pause"></use>
              )}
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{name}</div>
          <button
            onClick={() => setFullScreen(!isFullScreen)}
            type="button"
            className="player__full-screen"
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Player;
