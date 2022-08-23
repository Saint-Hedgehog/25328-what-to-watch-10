import {TailSpin} from 'react-loader-spinner';

function Spinner() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <TailSpin height="100" width="100" color="grey" ariaLabel="loading" />
    </div>
  );
}

export default Spinner;
