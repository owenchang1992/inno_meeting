import React from 'react';

export default ({ name }) => (
  <div
    className={name}
    style={{
      textAlign: 'center',
      borderRadius: '0 3px 3px 0',
      padding: '5px 10px',
      position: 'absolute',
      zIndex: '1',
      top: '0px',
      right: '0',
      display: 'flex',
      boxSizing: 'border-box',
    }}
  >
    <span
      className={`icon icon-trash ${name}`}
      style={{ color: '#888' }}
    />
  </div>
);
