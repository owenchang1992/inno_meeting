import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => (
  <div className="pane-sm sidebar">
    <nav className="nav-group">
      <h5 className="nav-group-title">Pages</h5>
      {[1, 2].map((number) => (
        <span className="nav-group-item">
          <span className="icon icon-doc-text-inv" />
          <Link to={`/page${number}`} style={{ textDecoration: 'none', color: '#333' }}>
            {`Page ${number}`}
          </Link>
        </span>
      ))}
    </nav>
  </div>
);

export default SideBar;
