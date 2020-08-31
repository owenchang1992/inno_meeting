import React from 'react';
import { useHistory } from 'react-router-dom';

export default function tabs({ pages }) {
  const history = useHistory();

  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <div className="tab-group">
      {
        pages.map((page) => (
          <div
            className="tab-item"
            role="button"
            onClick={() => handleClick(page.routingPath)}
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
