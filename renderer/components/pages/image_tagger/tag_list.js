import React, { useState } from 'react';

const EditBar = () => (
  <div
    className="trash"
    style={{
      textAlign: 'center',
      borderRadius: '0 3px 3px 0',
      padding: '5px 10px',
      position: 'absolute',
      zIndex: '1',
      top: '0px',
      right: '0',
      display: 'flex',
      boxSizing: 'border-box',
    }}
  >
    <span
      className="icon icon-trash trash"
      style={{ color: '#888' }}
    />
  </div>
);

export default ({
  tagList,
  toggleTags,
  removeTag,
}) => {
  const [focusedTag, setFocusTag] = useState(null);

  const onTagPressed = (e, tag) => {
    if (e.target.className.includes('trash')) removeTag(tag);
  };

  const getEditBar = (tag) => {
    if (focusedTag && focusedTag.key === tag.key) {
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
        tagList !== null ? tagList.map((tag) => {
          const { label, key } = tag;

          return (
            <div
              className="list-group-item"
              role="button"
              key={key}
              style={{
                position: 'relative',
                padding: '5px 10px',
                border: `1px solid ${tag.hide ? '#ddd' : '#888'}`,
                borderRadius: '3px',
                marginTop: '5px',
                display: 'flex',
                boxSizing: 'border-box',
              }}
              tabIndex={0}
              onMouseDown={(e) => onTagPressed(e, tag)}
              onMouseEnter={() => setFocusTag(tag)}
              onMouseLeave={() => setFocusTag(null)}
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
        }) : null
      }
    </>
  );
};
