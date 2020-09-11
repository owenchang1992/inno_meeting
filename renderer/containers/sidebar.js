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
    routingPath: mediaPath,
    props: {
      imagePath: mediaPath,
    },
  });
};

const sideBar = ({ addPage, checkPage }) => {
  const [searchContents, setSearchContents] = useState('dev/icon.png');
  const [workingPath] = useState(window.api.getHomeDir());
  const history = useHistory();

  const keyUpHandler = (e) => {
    if (e.keyCode === 13) {
      const mediaPath = path.resolve(
        workingPath,
        searchContents,
      );

      if (checkPage(mediaPath) === -1) {
        addPage(createNewPage(mediaPath));
        history.push(mediaPath);
      } else if (mediaPath !== history.location.pathname) {
        history.push(mediaPath);
      }
    }
  };

  return (
    <div className="pane-sm sidebar">
      <nav className="nav-group">
        <h5 className="nav-group-title">Working Path</h5>
        <span
          role="button"
          onKeyDown={() => { console.log('key down'); }}
          tabIndex={0}
          className="nav-group-item"
        >
          {workingPath}
        </span>
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
      </nav>
    </div>
  );
};

export default sideBar;
