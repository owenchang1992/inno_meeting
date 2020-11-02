import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SideBarItem = ({ tab, handleClick, focusMedia }) => {
  const getTab = () => (
    tab.routingPath === focusMedia.routingPath
      ? 'active'
      : ''
  );

  return (
    <li className={`list-group-item ${getTab()}`}>
      <div
        className="tab-body"
        role="button"
        onClick={(e) => handleClick(e, tab)}
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
        <strong>{tab.name}</strong>
      </div>
    </li>
  );
};

const SideBar = ({ tabs, closeTab }) => {
  const history = useHistory();
  const [focusMedia, setFocusMedia] = useState({
    routingPath: history.location.pathname,
  });

  const handleClick = (e, tab) => {
    console.log(e.target.className);
    if (e.target.className.indexOf('icon-cancel-circled') !== -1) {
      closeTab(tab);
      if (tab.routingPath === history.location.pathname) {
        history.goBack();
      }
    } else if (history.location.pathname !== tab.routingPath) {
      setFocusMedia(tab);
      history.push(tab.routingPath);
    }
  };

  const getList = () => {
    if (tabs) {
      return tabs.map((tab) => (
        <SideBarItem
          tab={tab}
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
