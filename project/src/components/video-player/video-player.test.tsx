

import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../hocs/history-router/history-router';
import {makeFakeFilm} from '../../utils/mocks';
import VideoPlayer from './video-player';

const VIDEO_WIDTH = '280';
const VIDEO_HEIGHT = '175';
const width = VIDEO_WIDTH;
const height = VIDEO_HEIGHT;
const fakeFilm = makeFakeFilm(1);
const history = createMemoryHistory();
const videoRef = jest.fn();

describe('Компонент: VideoPlayer', () => {
  it('должен отображать правильно', () => {
    render(
      <HistoryRouter history={history}>
        <VideoPlayer
          poster={fakeFilm.posterImage}
          width={width}
          height={height}
          src={fakeFilm.videoLink}
          videoRef={videoRef}
        />
      </HistoryRouter>
    );

    expect(screen.getByTestId('video')).toBeInTheDocument();
  });
});
