import React from 'react';

export default function tabs({ pages }) {
  return (
    <div className="tab-group">
      {
        pages.map((page) => (
          <div className="tab-item">
            <span className="icon icon-cancel icon-close-tab" />
            {page.name}
          </div>
        ))
      }
    </div>
  );
}
