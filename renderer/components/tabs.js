import React from 'react';
import { useHistory } from 'react-router-dom';

export default function tabs({ pages, closePage }) {
  const history = useHistory();

  const handleClick = (e, page) => {
    if (e.target.className.indexOf('icon-cancel') !== -1) {
      closePage(page);
      if (page.routingPath === history.location.pathname) {
        history.goBack();
      }
    } else if (history.location.pathname !== page.routingPath) {
      history.push(page.routingPath);
    }
  };

  const getTab = (page) => (page.routingPath === history.location.pathname ? 'active' : '');

  return (
    <div className="tab-group">
      {
        pages.map((page) => (
          <div
            className={`tab-item ${getTab(page)}`}
            role="button"
            onClick={(e) => handleClick(e, page)}
            onKeyDown={() => { console.log('key down'); }}
            tabIndex={0}
          >
            <span className="icon icon-cancel icon-close-tab" />
            {page.name}
          </div>
        ))
      }
    </div>
  );
}
