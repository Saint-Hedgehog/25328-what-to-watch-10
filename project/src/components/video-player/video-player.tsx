type Props = {
  width: string;
  height: string;
  poster: string;
  src: string;
  videoRef: React.LegacyRef<HTMLVideoElement>;
};

function VideoPlayer({width, height, poster, src, videoRef}: Props) {
  return (
    <video width={width} height={height} poster={poster} ref={videoRef} muted data-testid='video'>
      <source src={src} />
    </video>
  );
}
export default VideoPlayer;
