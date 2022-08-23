import {TailSpin} from 'react-loader-spinner';

export type Props = {
  show: boolean;
  children: React.ReactNode;
};

function Loader({ show = false, children }: Props) {
  const isFullScreen = children === undefined;
  return (
    <div
      style={{
        height: isFullScreen ? 'calc(100vh - 170px)' : '100%',
        width: '100%',
      }}
    >
      {show ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <TailSpin color="grey" ariaLabel="loading" />
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export default Loader;
