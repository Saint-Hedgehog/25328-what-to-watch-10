import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {MAX_FILM_RATING, MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH} from '../../const';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../../hocs/history-router/history-router';
import AddReviewForm from './add-review-form';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Компонент: AddReviewForm', () => {
  it('должен отображать правильно', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewForm />
        </HistoryRouter>
      </Provider>,
    );

    // expect(screen.getAllByTestId('rating').length).toEqual(MAX_FILM_RATING);
    // expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(/Post/i);
  });

  // it('should check 2 stars for review', () => {
  //   const store = mockStore();

  //   render(
  //     <Provider store={store}>
  //       <HistoryRouter history={history}>
  //         <ReviewForm/>
  //       </HistoryRouter>
  //     </Provider>,
  //   );

  //   const secondRatingStar = screen.getAllByTestId('rating')[1];
  //   userEvent.click(secondRatingStar);
  //   expect(secondRatingStar).toBeChecked();
  // });

  // it('form button should be disabled while length is less than 50', () => {
  //   const store = mockStore();

  //   const fakeReview = 'a'.repeat(MIN_REVIEW_LENGTH - 1);

  //   render(
  //     <Provider store={store}>
  //       <HistoryRouter history={history}>
  //         <ReviewForm/>
  //       </HistoryRouter>
  //     </Provider>,
  //   );

  //   userEvent.type(screen.getByPlaceholderText(/Review text/i), fakeReview);
  //   expect(screen.getByRole('button')).toBeDisabled();
  // });

  // it('form button should be disabled while length is bigger than 400', () => {
  //   const store = mockStore();

  //   const fakeReview = 'a'.repeat(MAX_REVIEW_LENGTH + 1);

  //   render(
  //     <Provider store={store}>
  //       <HistoryRouter history={history}>
  //         <ReviewForm/>
  //       </HistoryRouter>
  //     </Provider>,
  //   );

  //   userEvent.type(screen.getByPlaceholderText(/Review text/i), fakeReview);
  //   expect(screen.getByRole('button')).toBeDisabled();
  // });
});
