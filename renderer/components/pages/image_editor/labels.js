import React from 'react';

export default ({ history }) => {
  console.log(history);

  return (
    <div>
      <h5 className="nav-group-title">Events</h5>
      <div className="list-group-item" style={{ padding: '5px 10px', border: '1px solid #ddd', borderRadius: '3px' }}>
        <span className="icon icon-record" style={{ color: '#fdbc40', marginRight: '5px' }} />
        <strong>{history.length <= 1 ? 'fdf' : history[1].action}</strong>
        <br />
        Lorem ipsum dolor sit amet.
      </div>
    </div>
  );
};
