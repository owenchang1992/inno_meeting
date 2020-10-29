import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SideBarItem = ({ media, handleClick, focusMedia }) => {
  const getTab = () => (
    media.routingPath === focusMedia.routingPath
      ? 'active'
      : ''
  );

  return (
    <li className={`list-group-item ${getTab()}`}>
      <div
        className="media-body"
        role="button"
        onClick={(e) => handleClick(e, media)}
        onKeyDown={() => {}}
        tabIndex={0}
      >
        <strong>{media.name}</strong>
      </div>
    </li>
  );
};

const SideBar = ({ mediaList }) => {
  const history = useHistory();
  const [focusMedia, setFocusMedia] = useState({
    routingPath: history.location.pathname,
  });

  const handleClick = (e, media) => {
    setFocusMedia(media);
    history.push(media.routingPath);
    // if (e.target.className.indexOf('icon-cancel') !== -1) {
    //   closeTab(tab);
    //   if (tab.routingPath === history.location.pathname) {
    //     history.goBack();
    //   }
    // } else if (history.location.pathname !== tab.routingPath) {
    //   history.push(tab.routingPath);
    // }
  };

  const getList = () => {
    if (mediaList) {
      return mediaList.map((media) => (
        <SideBarItem
          media={media}
          handleClick={handleClick}
          focusMedia={focusMedia}
        />
      ));
    }

    return null;
  };

  return (
    <div className="pane-sm sidebar">
      <ul className="list-group">
        <li className="list-group-header">
          <input
            className="form-control"
            type="text"
            placeholder="Search for image"
          />
        </li>
        {getList()}
      </ul>
    </div>
  );
};

export default SideBar;
