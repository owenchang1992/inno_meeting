import React from 'react';
import { useHistory } from 'react-router-dom';

const sideBar = ({ list }) => {
  const history = useHistory();

  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <div className="pane-sm sidebar">
      <nav className="nav-group">
        <h5 className="nav-group-title">Pages</h5>
        {list.map((page) => (
          <span
            role="button"
            onClick={() => handleClick(page.routingPath)}
            onKeyDown={() => { console.log('key down'); }}
            tabIndex={0}
            className="nav-group-item"
          >
            <span className="icon icon-doc-text-inv" />
            {page.name}
          </span>
        ))}
      </nav>
    </div>
  );
};

export default sideBar;
