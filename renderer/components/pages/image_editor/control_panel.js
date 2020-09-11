import React from 'react';

export default () => {
  console.log('import control');
  return (
    <nav className="nav-group" style={{ height: '100%', width: '15em' }}>
      <h5 className="nav-group-title">Infomations</h5>
      <span className="nav-group-item">
        Media Name
      </span>
      <h5 className="nav-group-title">Tags</h5>
      <span className="nav-group-item">
        <span className="icon icon-record" style={{ color: '#fc605b' }} />
        Red
      </span>
    </nav>
  );
};
