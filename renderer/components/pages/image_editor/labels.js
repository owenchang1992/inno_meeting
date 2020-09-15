import React from 'react';

export default ({ history }) => {
  console.log(history);

  return (
    <div>
      <h5 className="nav-group-title">Tags</h5>
      <div
        // className="list-group-item"
        style={{
          padding: '5px 10px',
          // border: '1px solid gray',
          borderRadius: '15px',
          marginTop: '5px',
        }}
      >
        <span className="icon icon-record" style={{ color: '#fc605b', marginRight: '5px' }} />
        <strong>Tag1</strong>
        {/* <br />
        Lorem ipsum dolor sit amet. */}
      </div>
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
    </div>
  );
};
