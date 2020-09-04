import React, { useState } from 'react';

const createNewPage = (path) => {
  const getName = (splitedPath) => {
    const splitedName = splitedPath.split('/');
    return splitedName[splitedName.length - 1];
  };

  return ({
    name: getName(path),
    type: 'image_editor',
    routingPath: `/${getName(path)}`,
    props: {
      imagePath: path,
    },
  });
};

const sideBar = ({ addPage }) => {
  const [searchContents, setSearchContents] = useState('');

  const keyUpHandler = (e) => {
    if (e.keyCode === 13) {
      addPage(createNewPage(searchContents));
    }
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
            onKeyUp={(e) => keyUpHandler(e)}
            placeholder="path"
          />
        </div>
        <h5 className="nav-group-title">Working Path</h5>
        {/* <span
          role="button"
          onClick={handleClick}
          onKeyDown={() => { console.log('key down'); }}
          tabIndex={0}
          className="nav-group-item"
        >
          <span className="icon icon-doc-text-inv" />
          Add
        </span> */}
      </nav>
    </div>
  );
};

export default sideBar;
