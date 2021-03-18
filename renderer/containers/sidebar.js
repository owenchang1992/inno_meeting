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
        { page.actions.length > 0 ? <strong>{page.name}</strong> : page.name }
      </div>
    </li>
  );
};

const ExpandIcon = ({ sidebarExpand, setSidebarExpand }) => {
  if (sidebarExpand) {
    return (
      <ChevronLeftIcon
        fontSize="inherit"
        onClick={() => setSidebarExpand(!sidebarExpand)}
      />
    );
  }
  return (
    <ChevronRightIcon
      fontSize="inherit"
      onClick={() => setSidebarExpand(!sidebarExpand)}
    />
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
    <div
      className={`${sidebarExpand === true ? '' : 'pane-sm '}sidebar`}
      style={{
        overflowY: 'scroll',
        minWidth: '170px',
      }}
    >
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
          Images
        </h5>
        <div>
          <IconButton
            aria-label="expand"
            size="small"
            // onClick={() => setSidebarExpand(!sidebarExpand)}
          >
            <ExpandIcon sidebarExpand={sidebarExpand} setSidebarExpand={setSidebarExpand} />
          </IconButton>
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
