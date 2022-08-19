import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../hocs/history-router/history-router';
import Footer from './footer';

const history = createMemoryHistory();

describe('Компонет: Footer', () => {
  it('должен отображать правильно', () => {
    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd/i)).toBeInTheDocument();
  });
});

