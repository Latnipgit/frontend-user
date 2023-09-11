import React from 'react';

const Loader = () => {
  const spinnerStyle = {
    animation: 'spin 1s linear infinite',
    width: '50px',
    height: '50px',
    borderTop: '4px solid #0074E4', // Blue color
    borderBottom: '4px solid #0074E4', // Blue colorv
    borderLeft: '4px solid transparent',
    borderRight: '4px solid transparent',
    borderRadius: '50%',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  };

  return (
    <div style={containerStyle} className="spinner-container">
      <div style={spinnerStyle} className="loading-spinner"></div>
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
