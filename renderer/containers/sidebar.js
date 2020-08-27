import React from 'react';
import { useHistory } from 'react-router-dom';

const SideBar = () => {
  const history = useHistory();

  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <div className="pane-sm sidebar">
      <nav className="nav-group">
        <h5 className="nav-group-title">Pages</h5>
        {[1, 2].map((number) => (
          <span
            role="button"
            onClick={() => handleClick(`Page${number}`)}
            onKeyDown={() => { console.log('key down'); }}
            tabIndex={0}
            className="nav-group-item"
          >
            <span className="icon icon-doc-text-inv" />
            {`Page ${number}`}
          </span>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
