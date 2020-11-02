import React from 'react';
import { useHistory } from 'react-router-dom';

const SideBarItem = ({ tab, handleClick, focusTabName }) => {
  const getTab = () => (
    tab.routingPath === focusTabName
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
        style={{ padding: '10px' }}
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

  const handleClick = (e, tab) => {
    if (e.target.className.indexOf('icon-cancel-circled') !== -1) {
      closeTab(tab);
      if (tab.routingPath === history.location.pathname) {
        history.goBack();
      }
    } else if (history.location.pathname !== tab.routingPath) {
      history.push(tab.routingPath);
    }
  };

  const getList = () => {
    if (tabs) {
      return tabs.map((tab) => (
        <SideBarItem
          tab={tab}
          handleClick={handleClick}
          focusTabName={history.location.pathname}
        />
      ));
    }

    return null;
  };

  return (
    <div className="pane-sm sidebar">
      <ul className="list-group">
        {getList()}
      </ul>
    </div>
  );
};

export default SideBar;
