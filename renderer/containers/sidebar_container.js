import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => (
  <div className="pane-sm sidebar">
    <ul>
      {[1, 2].map((number) => (
        <li key={number}>
          <Link to={`/page${number}`}>
            {`Page ${number}`}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default SideBar;
