import React from 'react';

const sideBar = ({ addPage }) => {
  const handleClick = () => {
    addPage();
  };

  return (
    <div className="pane-sm sidebar">
      <nav className="nav-group">
        <h5 className="nav-group-title">Pages</h5>
        <span
          role="button"
          onClick={handleClick}
          onKeyDown={() => { console.log('key down'); }}
          tabIndex={0}
          className="nav-group-item"
        >
          <span className="icon icon-doc-text-inv" />
          Add
        </span>
      </nav>
    </div>
  );
};

export default sideBar;
