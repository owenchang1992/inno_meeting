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
        <span
          className="icon icon-picture pull-left"
          style={{ marginRight: '10px' }}
        />
        <span
          className="icon icon-cancel-circled pull-right"
          style={{ marginLeft: '10px' }}
        />
        <strong>{media.name}</strong>
      </div>
    </li>
  );
};

const SideBar = ({ mediaList, closeTab }) => {
  const history = useHistory();
  const [focusMedia, setFocusMedia] = useState({
    routingPath: history.location.pathname,
  });

  const handleClick = (e, media) => {
    console.log(e.target.className);
    if (e.target.className.indexOf('icon-cancel-circled') !== -1) {
      closeTab(media);
      if (media.routingPath === history.location.pathname) {
        history.goBack();
      }
    } else if (history.location.pathname !== media.routingPath) {
      setFocusMedia(media);
      history.push(media.routingPath);
    }
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
        {/* <li className="list-group-header">
          <input
            className="form-control"
            type="text"
            placeholder="Search for image"
          />
        </li> */}
        {getList()}
      </ul>
    </div>
  );
};

export default SideBar;
