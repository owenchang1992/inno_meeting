import React from 'react';
import { findRecordIndex } from './editor_utils';

export default ({
  history,
  selectedRecords,
  toggleRecords,
  drawAllRecords,
  setSelectedRecords,
}) => {
  console.log('record history');
  return (
    <>
      <h5 className="nav-group-title">
        ROAs
      </h5>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ border: '1px solid #ddd' }}>
          <span
            className="icon icon-doc-text-inv"
            role="button"
            aria-label="Mute volume"
            style={{
              // border: `1px solid ${newTagState !== 'hover' ? '#ddd' : 'gray'}`,
              // borderRadius: '3px',
              padding: '0px 4px',
              // width: '10px',
              // color: newTagState !== 'hover' ? '#ddd' : 'gray',
            }}
            // onMouseOver={() => setNewTagState('hover')}
            // onFocus={() => setNewTagState(null)}
            // onMouseOut={() => setNewTagState(null)}
            // onBlur={() => {}}
            tabIndex={0}
            onClick={() => { drawAllRecords(); }}
            onKeyDown={() => (null)}
          />
          <span
            className="icon icon-doc-text"
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
            onClick={() => { setSelectedRecords([]); }}
            onKeyDown={() => (null)}
          />
        </div>
        <div>
          <span
            className="icon icon-trash"
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
            onClick={() => { }}
            onKeyDown={() => (null)}
          />
        </div>
      </div>
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
                  position: 'relative',
                  padding: '5px 0px 5px 10px',
                  border: `1px solid ${findRecordIndex(value, selectedRecords) === -1 ? '#ddd' : '#777'}`,
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
