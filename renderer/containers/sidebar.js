import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
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
        style={{
          padding: '5px 10px',
          color: page.actions.length > 0 ? '#414142' : '#737475',
        }}
      >
        {
          page.actions.length > 0 ? (
            <span
              className="icon icon-cancel-circled pull-right"
              style={{ marginLeft: '15px' }}
            />
          ) : null
        }
        { page.name }
      </div>
    </li>
  );
};

const SideBar = ({ pages }) => {
  const history = useHistory();
  const [sidebarExpand, setSidebarExpand] = useState(false);
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
    <div className={`${sidebarExpand ? '' : 'pane-sm'} sidebar`} style={{ overflowY: 'scroll' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '4px 5px',
          alignItems: 'center',
          backgroundColor: '#f5f5f4',
        }}
      >
        <h5
          style={{
            margin: '0',
            padding: '5px 10px',
          }}
        >
          {workingPath.split('/')[workingPath.split('/').length - 1]}
        </h5>
        <div>
          {
            sidebarExpand ? (
              <IconButton
                aria-label="expand"
                size="small"
                onClick={() => setSidebarExpand(false)}
              >
                <ChevronLeftIcon fontSize="inherit" />
              </IconButton>
            ) : (
              <IconButton
                aria-label="expand"
                size="small"
                onClick={() => setSidebarExpand(true)}
              >
                <ChevronRightIcon fontSize="inherit" />
              </IconButton>
            )
          }
        </div>
      </div>
      <ul className="list-group">
        {/* <li className="list-group-header">
          <input className="form-control" type="text" placeholder="Search for media" />
        </li> */}
        {getList()}
      </ul>
    </div>
  );
};

export default SideBar;
