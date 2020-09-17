import React, { useState, useEffect } from 'react';

export default ({ history, drawRecord }) => {
  // console.log(history);
  const [showRecords, setShowRecords] = useState([]);

  const findRecordIndex = (value) => showRecords.findIndex(
    (record) => (record.properties.key === value.properties.key),
  );

  const toggleRecords = (value) => {
    const index = findRecordIndex(value);
    if (index === -1) {
      setShowRecords([...showRecords, value]);
    } else {
      showRecords.splice(index, 1);
      setShowRecords([...showRecords]);
    }
  };

  useEffect(() => {
    if (history.length !== 0) {
      drawRecord(showRecords);
    }
  }, [showRecords]);

  return (
    <>
      <h5 className="nav-group-title">
        ROAs
        <span
          className="icon icon-arrows-ccw"
          role="button"
          aria-label="Mute volume"
          style={{
            padding: '0px 4px',
            // border: `1px solid ${newTagState !== 'hover' ? '#ddd' : 'gray'}`,
            borderRadius: '3px',
            marginLeft: '5px',
            // color: newTagState !== 'hover' ? '#ddd' : 'gray',
          }}
          // onMouseOver={() => setNewTagState('hover')}
          // onFocus={() => setNewTagState(null)}
          // onMouseOut={() => setNewTagState(null)}
          // onBlur={() => {}}
          tabIndex={0}
          onClick={() => { drawRecord(history); }}
          onKeyDown={() => (null)}
        />
      </h5>
      {
        history.map((value) => {
          const { tag, key } = value.properties;

          const getContent = () => {
            const {
              left, top, width, height,
            } = value.properties;
            const { round } = Math;

            return `(${round(left)}, ${round(top)}, ${round(width)}, ${round(height)})`;
          };

          return value.action === 'draw-image'
            ? null
            : (
              <div
                className="list-group-item"
                role="button"
                key={key}
                style={{
                  padding: '5px 10px',
                  border: `1px solid ${findRecordIndex(value) === -1 ? '#ddd' : '#333333'}`,
                  borderRadius: '3px',
                  marginTop: '5px',
                }}
                tabIndex={0}
                onClick={() => { toggleRecords(value); }}
                onKeyDown={() => (null)}
              >
                <span className="icon icon-record" style={{ color: tag.color, marginRight: '5px' }} />
                <strong>{tag.name}</strong>
                <br />
                { getContent() }
              </div>
            );
        })
      }
    </>
  );
};
