import React from 'react';

export default ({ page }) => {
  console.log('import control', page);
  return (
    <nav className="nav-group" style={{ height: '100%', width: '15em' }}>
      <h5 className="nav-group-title">Infomations</h5>
      <span className="nav-group-item">
        {page.name}
      </span>
      <h5 className="nav-group-title">Tags</h5>
      <span className="nav-group-item">
        <span className="icon icon-record" style={{ color: '#fc605b' }} />
        Red
      </span>
    </nav>
  );
};
