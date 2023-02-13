import { render, screen } from '@testing-library/react';
import { makeFakeFilmComment } from '../../../../utils/mocks';
import Comment from '../comment/comment';

const fakeComments = makeFakeFilmComment(1);

describe('Компонент: MoviePageOverview', () => {
  it('должен отображать правильно', () => {
    render(
      <Comment
        comment={fakeComments.comment}
        rating={fakeComments.rating}
        date={fakeComments.date}
        user={fakeComments.user}
      />
    );

    expect(screen.getByText(fakeComments.comment)).toBeInTheDocument();
    expect(screen.getByText(fakeComments.user.name)).toBeInTheDocument();
    expect(screen.getByText(fakeComments.rating)).toBeInTheDocument();
  });
});
