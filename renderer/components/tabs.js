import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Tab({ tabs, closeTab }) {
  const history = useHistory();

  const handleClick = (e, tab) => {
    if (e.target.className.indexOf('icon-cancel') !== -1) {
      closeTab(tab);
      if (tab.routingPath === history.location.pathname) {
        history.goBack();
      }
    } else if (history.location.pathname !== tab.routingPath) {
      history.push(tab.routingPath);
    }
  };

  const getTab = (tab) => (tab.routingPath === history.location.pathname ? 'active' : '');

  return (
    <div className="tab-group">
      {
        tabs.map((tab) => (
          <div
            className={`tab-item ${getTab(tab)}`}
            role="button"
            onClick={(e) => handleClick(e, tab)}
            onKeyDown={() => {}}
            tabIndex={0}
          >
            <span className="icon icon-cancel icon-close-tab" />
            {tab.name}
          </div>
        ))
      }
    </div>
  );
}
