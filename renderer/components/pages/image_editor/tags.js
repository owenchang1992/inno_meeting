import React from 'react';

export default () => {
  console.log('Labels');

  return (
    <div>
      <h5 className="nav-group-title">
        Tags
        <span
          className="icon icon-plus"
          style={{
            padding: '0px 4px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            marginLeft: '5px',
          }}
        />
      </h5>
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
    </div>
  );
};
