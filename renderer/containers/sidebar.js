import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import getFilter from '../filters/getFilter';
import { WORKING_FOLDER } from '../filters/constants';

import ContextStore from '../context_store';

const SideBarItem = ({ page, handleClick, focusTabName }) => {
  const getTab = () => (
    page.key === focusTabName
      ? 'active'
      : ''
  );

  return (
    <li className={`list-group-item ${getTab()}`}>
      <div
        className="tab-body"
        role="button"
        onClick={(e) => handleClick(e, page)}
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
        <strong>{page.name}</strong>
      </div>
    </li>
  );
};

const SideBar = ({ pages }) => {
  const history = useHistory();
  const { removePage, workingPath } = useContext(ContextStore);

  const handleClick = (e, page) => {
    if (e.target.className.indexOf('icon-cancel-circled') !== -1) {
      removePage(page);
    } else if (history.location.pathname !== page.key) {
      history.push(page.key);
    }
  };

  const getList = () => {
    if (pages) {
      return getFilter(WORKING_FOLDER, pages, workingPath).map((page) => (
        <SideBarItem
          page={page}
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
