import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {loadCommentsAction} from '../../../store/api-actions';
import {getComments} from '../../../store/comments-process/selectors';
import {getFetchedCommentsStatus} from '../../../store/comments-process/selectors';
import Comment from './comment/comment';
import Spinner from '../../spinner/spinner';

function MoviePageReviews() {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(getFetchedCommentsStatus);
  const comments = useAppSelector(getComments);

  useEffect(() => {
    if (id) {
      dispatch(loadCommentsAction(id));
    }
  }, [dispatch, id]);

  if (isFetching) {
    return <Spinner />;
  }

  const countCommentsInRightColumn =
    comments.length % 2 === 0
      ? comments.length / 2
      : Math.ceil(comments.length / 2);

  const leftColumnComments = comments.slice(0, countCommentsInRightColumn);
  const rightColumnComments = comments.slice(countCommentsInRightColumn);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {leftColumnComments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>
      <div className="film-card__reviews-col">
        {rightColumnComments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  );
}

export default MoviePageReviews;
