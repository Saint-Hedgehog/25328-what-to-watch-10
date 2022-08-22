import {useRef} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import VideoPlayer from '../video-player/video-player';

type Props = {
  name: string;
  posterImage: string;
  id: number;
  videoLink: string;
};

function SmallFilmCard({name, posterImage, id, videoLink}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  let timer: ReturnType<typeof setTimeout>;

  const handleMouseEnter = () => {
    timer = setTimeout(() => {
      videoRef.current?.play();
    }, 1000);
  };

  const handleMouseLeave = () => {
    videoRef.current?.load();
    clearTimeout(timer);
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="small-film-card catalog__films-card"
      data-testid="film-card"
    >
      <Link
        className="small-film-card__link"
        to={`${AppRoute.Film}/${id}${AppRoute.Overview}`}
        title={`${AppRoute.Film}/${id}${AppRoute.Overview}`}
      >
        <div className="small-film-card__image">
          <VideoPlayer
            poster={posterImage}
            width="280"
            height="175"
            src={videoLink}
            videoRef={videoRef}
          />
        </div>

        <h3 className="small-film-card__title">
          {name}
        </h3>
      </Link>
    </article>
  );
}

export default SmallFilmCard;
