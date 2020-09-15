import React from 'react';

export default ({ history }) => (
  <>
    <h5 className="nav-group-title">ROA</h5>
    {
      history.map((value) => {
        const { tag } = value.properties;
        return value.action === 'draw-image'
          ? null
          : (
            <div
              className="list-group-item"
              style={{
                padding: '5px 10px',
                border: '1px solid #ddd',
                borderRadius: '3px',
                marginTop: '5px',
              }}
            >
              <span className="icon icon-record" style={{ color: tag.color, marginRight: '5px' }} />
              <strong>{tag.name}</strong>
              <br />
              {value.action}
            </div>
          );
      })
    }
  </>
);
