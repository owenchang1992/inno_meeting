import React, { useState } from 'react';
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

export default ({
  tagList,
  selectedTags,
  toggleTags,
}) => {
  const [focusedTag, setFocusTag] = useState(null);

  const getBorderColor = (tag) => (
    findTagIndex(tag, selectedTags) === -1 ? '#ddd' : '#777'
  );

  const onTagPressed = (e, tag) => {
    console.log(e.target);
    if (e.button === 2) setFocusTag(tag);
    else setFocusTag(null);
  };

  const getEditBar = (tag) => {
    if (focusedTag && focusedTag.properties.key === tag.properties.key) {
      console.log('getEditBar');
      return <EditBar />;
    }

    return null;
  };

  const handleClick = (e, tag) => {
    toggleTags(tag);
  };

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
              onMouseDown={(e) => onTagPressed(e, tag)}
              onClick={(e) => handleClick(e, tag)}
              onKeyDown={() => (null)}
            >
              <span
                className="icon icon-record"
                style={{ color: label.color, marginRight: '5px' }}
              />
              <strong>{label.name}</strong>
              {getEditBar(tag)}
            </div>
          );
        })
      }
    </>
  );
};
