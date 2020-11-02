import React from 'react';

export default function () {
  return (
    <div
      style={{
        fontSize: '2rem',
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Please Click
      <span
        className="icon icon-archive"
        style={{
          margin: '0 1rem',
        }}
      />
      To Start
    </div>
  );
}
