import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function tabs({ pages, closePage }) {
  const history = useHistory();
  const [focusTab, setFocusTab] = useState();

  const handleClick = (e, page) => {
    if (e.target.className.indexOf('icon-cancel') !== -1) {
      closePage(page);
      if (page.name !== focusTab) {
        setFocusTab(focusTab);
      } else {
        history.push('/');
        setFocusTab(null);
      }
    } else {
      history.push(page.routingPath);
      setFocusTab(page.name);
    }
  };

  const getTab = (page) => (page.name === focusTab ? 'active' : '');

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
