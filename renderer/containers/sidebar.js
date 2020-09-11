import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import path from 'path';

const createNewPage = (mediaPath) => {
  const getName = (splitedPath) => {
    const splitedName = splitedPath.split('/');
    return splitedName[splitedName.length - 1];
  };

  return ({
    name: getName(mediaPath),
    type: 'image_editor',
    routingPath: path.resolve(window.api.getHomeDir(), mediaPath),
    props: {
      imagePath: path.resolve(window.api.getHomeDir(), mediaPath),
    },
  });
};

const sideBar = ({ addPage, checkPage }) => {
  const [searchContents, setSearchContents] = useState('');
  const history = useHistory();

  const keyUpHandler = (e) => {
    if (e.keyCode === 13) {
      if (checkPage(searchContents) === -1) {
        const newPage = createNewPage(searchContents);
        addPage(newPage);
        history.push(newPage.routingPath);
      } else {
        history.push(path.resolve(
          window.api.getHomeDir(),
          searchContents,
        ));
      }
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
