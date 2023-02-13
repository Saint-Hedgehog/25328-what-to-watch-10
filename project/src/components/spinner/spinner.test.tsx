import {render, screen} from '@testing-library/react';
import Spinner from './spinner';


describe('Компонент: Spinner', () => {
  it('должен отображать правильно', () => {

    render(
      <Spinner />
    );

    expect(screen.getByTestId('spinner')).toHaveStyle({minHeight: '100vh'});
  });
});
