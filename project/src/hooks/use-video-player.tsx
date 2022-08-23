import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CURSOR_OFFSET_TO_CENTER, KEY_ESCAPE} from '../const';

const useVideoPlayer = (videoElement: React.RefObject<HTMLVideoElement>, progressBarRef: React.RefObject<HTMLProgressElement>) => {
  const navigate = useNavigate();
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    videoDuration: videoElement.current?.duration,
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  useEffect(() => {
    if (videoElement && videoElement.current) {
      playerState.isPlaying
        ? videoElement.current.pause()
        : setTimeout(() => {
          videoElement.current?.play();
        }, 150);
    }
  }, [playerState.isPlaying, videoElement]);

  const changeProgress = (progress: number) => {
    setPlayerState({
      ...playerState,
      progress,
    });
  };

  const handleOnTimeUpdate = () => {
    if (videoElement && videoElement.current) {
      const progress =
        (videoElement.current.currentTime / videoElement.current.duration) *
        100;
      setPlayerState({
        ...playerState,
        videoDuration:
          videoElement.current.duration - videoElement.current.currentTime,
        progress,
      });
    }

    playerState.isPlaying = true;
  };

  useEffect(() => {
    const onKeyDownEsc = (evt: KeyboardEvent) => {
      if (evt.key === KEY_ESCAPE) {
        evt.preventDefault();
        navigate(-1);
      }
    };

    document.addEventListener('keydown', onKeyDownEsc);
    return () => {
      document.removeEventListener('keydown', onKeyDownEsc);
    };
  });

  const handleExitClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    navigate(-1);
  };

  const handleVideoProgress = (evt: React.FormEvent<HTMLProgressElement>) => {
    if (videoElement && videoElement.current) {
      const target = evt.target as HTMLProgressElement;
      const manualChange = Number(target.value);

      videoElement.current.currentTime =
        (videoElement.current.duration / 100) * manualChange;
      setPlayerState({
        ...playerState,
        progress: manualChange,
      });
    }
  };

  const handleProgressClick = (evt: React.MouseEvent<HTMLProgressElement>)=> {
    const progressBar = progressBarRef.current;
    const videoPlayer = videoElement.current;

    if(!progressBar || !videoPlayer) {
      return;
    }

    const mouseX = Math.floor(evt.pageX - CURSOR_OFFSET_TO_CENTER - progressBar.offsetLeft);

    const newProgress = mouseX / (progressBar.offsetWidth / 100);
    videoPlayer.currentTime = videoPlayer.duration * (newProgress / 100);
    changeProgress(newProgress);
  };

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleProgressClick,
    handleExitClick,
    changeProgress,
  };
};

export default useVideoPlayer;
