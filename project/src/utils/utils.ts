import {RatingLevel, RatingLevelCountValue} from '../const';

export const generateRating = (ratingCount: number): string => {
  switch (true) {
    case (RatingLevelCountValue.Zero <= ratingCount && ratingCount < RatingLevelCountValue.Three): return RatingLevel.Bad;
    case (RatingLevelCountValue.Three <= ratingCount && ratingCount < RatingLevelCountValue.Five): return RatingLevel.Normal;
    case (RatingLevelCountValue.Five <= ratingCount && ratingCount < RatingLevelCountValue.Eight): return RatingLevel.Good;
    case (RatingLevelCountValue.Eight <= ratingCount && ratingCount < RatingLevelCountValue.Ten): return RatingLevel.VeryGood;
    case (ratingCount === RatingLevelCountValue.Ten): return RatingLevel.Awesome;
    default: throw new Error('ERROR');
  }
};
