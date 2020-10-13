import React from 'react';
import { findTagIndex } from './utils';

const EditBar = () => (
  <div
    style={{
      backgroundColor: '#ff6666',
      color: '#fff',
      textAlign: 'center',
      borderRadius: '6px',
      padding: '5px 10px',
      position: 'absolute',
      zIndex: '1',
      top: '0px',
      left: 'calc(100% + 5px)',
      display: 'flex',
    }}
  >
    <span
      className="icon icon-trash"
      style={{ color: '#fff' }}
    />
  </div>
);

export default ({ tagList, selectedTags, toggleTags }) => {
  const getBorderColor = (tag) => (
    findTagIndex(tag, selectedTags) === -1 ? '#ddd' : '#777'
  );

  // const getContent = (tag) => {
  //   const {
  //     left, top, width, height,
  //   } = tag.properties;

  //   return `(${left}, ${top}, ${width}, ${height})`;
  // };

  return (
    <>
      <h5 className="nav-group-title">
        Tags
      </h5>
      {
        tagList.map((tag) => {
          const { label, key } = tag.properties;

          return (
            <div
              className="list-group-item"
              role="button"
              key={key}
              style={{
                position: 'relative',
                padding: '5px 10px',
                border: `1px solid ${getBorderColor(tag)}`,
                borderRadius: '3px',
                marginTop: '5px',
                display: 'flex',
              }}
              tabIndex={0}
              onClick={() => { toggleTags(tag); }}
              onKeyDown={() => (null)}
            >
              <span
                className="icon icon-record"
                style={{ color: label.color, marginRight: '5px' }}
              />
              <strong>{label.name}</strong>
              <EditBar />
            </div>
          );
        })
      }
    </>
  );
};
