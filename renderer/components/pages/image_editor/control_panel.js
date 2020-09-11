import React from 'react';

export default () => {
  console.log('import control');
  return (
    <nav className="nav-group" style={{ height: '100%' }}>
      <h5 className="nav-group-title">Favorites</h5>
      <a href="/" className="nav-group-item active">
        <span className="icon icon-home" />
        connors
      </a>
      <span className="nav-group-item">
        <span className="icon icon-download" />
        Downloads
      </span>
      <span className="nav-group-item">
        <span className="icon icon-folder" />
        Documents
      </span>
      <span className="nav-group-item">
        <span className="icon icon-signal" />
        AirPlay
      </span>
      <span className="nav-group-item">
        <span className="icon icon-print" />
        Applications
      </span>
      <span className="nav-group-item">
        <span className="icon icon-cloud" />
        Desktop
      </span>
    </nav>
  );
};
