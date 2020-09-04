import React, { useState } from 'react';

const sideBar = ({ addPage }) => {
  const [searchContents, setSearchContents] = useState('adc');
  const handleClick = () => {
    addPage();
  };

  return (
    <div className="pane-sm sidebar">
      <nav className="nav-group">
        <h5 className="nav-group-title">Search Media</h5>
        <div className="list-group-header">
          <input
            className="form-control"
            value={searchContents}
            onChange={(e) => setSearchContents(e.target.value)}
            type="text"
            placeholder="path"
          />
        </div>
        <div className="list-group-header">
          <button type="button" className="btn btn-default">Add</button>
        </div>
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
