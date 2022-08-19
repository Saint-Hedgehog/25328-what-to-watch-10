import {render, screen} from '@testing-library/react';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../hocs/history-router/history-router';
import userEvent from '@testing-library/user-event';
import Logo from './logo';

const history = createMemoryHistory();

describe('Компонент: Logo', () => {
  it('должен отображать правильно', () => {
    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>
    );
    expect(screen.getByTestId('logo-letter-1')).toHaveTextContent('W');
  });

  it('должен иметь класс isFooter', () => {
    render(
      <HistoryRouter history={history}>
        <Logo isFooter/>
      </HistoryRouter>
    );
    expect(screen.getByRole('link')).toHaveClass('logo__link logo__link--light');
  });

  it('должен перенаправлять на корневой URL-адрес, когда пользователь нажимает ссылку', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<h1>This is main page</h1>} />
          <Route path='*' element={<Logo />} />
        </Routes>
      </HistoryRouter>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
