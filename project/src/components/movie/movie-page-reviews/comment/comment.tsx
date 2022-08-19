import dayjs from 'dayjs';

type Props = {
  comment: string;
  date: string;
  rating: number;
  user: {
    id: number;
    name: string;
  };
};

function Comment({comment, rating, date, user }: Props) {
  const formattedDate = dayjs(date).format('MMMM DD, YYYY');

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>
        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={formattedDate}>
            {formattedDate}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

export default Comment;
