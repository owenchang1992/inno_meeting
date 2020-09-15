import React from 'react';

export default ({ history }) => (
  <>
    <h5 className="nav-group-title">Events</h5>
    {
      history.map((value) => (
        <div
          className="list-group-item"
          style={{
            padding: '5px 10px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            marginTop: '5px',
          }}
        >
          <span className="icon icon-record" style={{ color: '#fdbc40', marginRight: '5px' }} />
          <strong>{value.action}</strong>
          {/* <br />
          Lorem ipsum dolor sit amet. */}
        </div>
      ))
    }
  </>
);
