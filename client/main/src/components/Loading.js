// Importing necessary React components
import React from 'react';

// Importing components from Reactstrap
import { Spinner } from 'reactstrap';

const Loading = () => {
  return (
    <div
      style={{
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999, // A high value to ensure it's on top of other elements
      }}
    >
      <Spinner style={{ width: '5rem', height: '5rem' }} color="primary" />
    </div>
  );
};

export default Loading;
