import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ContextStore from '../context_store';

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
  const { selectLabel } = useContext(ContextStore);
  const history = useHistory();
  console.log(tabs);

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

  // const filterPageByBucket = (page) => {
  //   if (!selectLabel) {
  //     return false;
  //   }

  //   console.log(page, selectLabel);
  //   return page.bucket === selectLabel.key;
  // };

  // .filter(filterPageByBucket)

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
      <h5 className="nav-group-title">
        {selectLabel ? selectLabel.title : null}
      </h5>
      <ul className="list-group">
        {getList()}
      </ul>
    </div>
  );
};

export default SideBar;
