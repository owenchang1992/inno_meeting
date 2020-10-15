import React, { useState } from 'react';

const EditBar = () => (
  <div
    className="trash"
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
      className="icon icon-trash trash"
      style={{ color: '#fff' }}
    />
  </div>
);

export default ({
  tagList,
  toggleTags,
  removeTag,
}) => {
  const [focusedTag, setFocusTag] = useState(null);

  const getBorderColor = (tag) => (
    tag.hide ? '#ddd' : '#777'
  );

  const onTagPressed = (e, tag) => {
    console.log(e.target.className);
    if (e.button === 2) setFocusTag(tag);
    else {
      if (e.target.className.includes('trash')) removeTag(tag);
      setFocusTag(null);
    }
  };

  const getEditBar = (tag) => {
    if (focusedTag && focusedTag.key === tag.key) {
      return <EditBar />;
    }

    return null;
  };

  const handleClick = (e, tag) => {
    console.log(e.target.className);
    toggleTags(tag);
  };

  return (
    <>
      <h5 className="nav-group-title">
        Tags
      </h5>
      {
        tagList.map((tag) => {
          const { label, key } = tag;

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
