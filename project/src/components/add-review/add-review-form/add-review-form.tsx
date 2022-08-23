import React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {sendCommentAction} from '../../../store/api-actions';
import {getLoadedSendingCommentData} from '../../../store/sending-comment-process/selectors';
import {getCommentSendingStatus} from '../../../store/sending-comment-process/selectors';
import {AppRoute, CommentSendingStatus, MAX_MESSAGE_LENGTH, MIN_MESSAGE_LENGTH, RATING_STARS} from '../../../const';
import {store} from '../../../store/store';
import {resetCommentSendingStatus} from '../../../store/sending-comment-process/sending-comment-process';

function AddReviewForm() {
  const {id} = useParams();
  const [reviewMessage, setReviewMessage] = useState('');
  const [rating, setRating] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFetching = useAppSelector(getLoadedSendingCommentData);
  const commentSendingStatus = useAppSelector(getCommentSendingStatus);
  const isMessageEntered =
    reviewMessage.length >= MIN_MESSAGE_LENGTH &&
    reviewMessage.length <= MAX_MESSAGE_LENGTH;
  const isRatingSelected = rating.length !== 0;
  const isValidForm = isMessageEntered && isRatingSelected;

  useEffect(() => {
    if (commentSendingStatus === CommentSendingStatus.Success) {
      navigate(`${AppRoute.Film}/${id}${AppRoute.Overview}`);
    }

    return () => {
      store.dispatch(resetCommentSendingStatus());
    };
  }, [id, navigate, commentSendingStatus]);

  const handleReviewChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setReviewMessage(value);
  };

  const handleRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  };

  const handleSubmitButtonClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (id) {
      dispatch(sendCommentAction({reviewMessage, rating, id}));
    }
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className='rating'>
          <div
            style={{
              pointerEvents: isFetching ? 'none' : 'auto',
            }}
            onChange={handleRatingChange}
            className='rating__stars'
          >
            {RATING_STARS.map((star) => (
              <React.Fragment key={star}>
                <input
                  className='rating__input'
                  id={`star-${star}`}
                  type='radio' name='rating'
                  value={star}
                  data-testid="rating"
                />
                <label
                  className='rating__label'
                  htmlFor={`star-${star}`}
                >Rating {star}
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            style={{
              pointerEvents: isFetching ? 'none' : 'auto',
            }}
            onChange={handleReviewChange}
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            value={reviewMessage}
            maxLength={MAX_MESSAGE_LENGTH}
            minLength={MIN_MESSAGE_LENGTH}
          />
          <div className="add-review__submit">
            <button
              style={{
                opacity: isValidForm ? '1' : '0.3',
                pointerEvents: isValidForm && !isFetching ? 'auto' : 'none',
              }}
              onClick={handleSubmitButtonClick}
              className="add-review__btn"
              type="submit"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
