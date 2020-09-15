import React, { useState } from 'react';

const tagList = [
  {
    name: 'tag1',
    color: 'red',
    description: '',
  },
];

export default ({ setCurrentTag, currentTag }) => {
  console.log('Labels');
  const [tagDown, setTagDown] = useState(null);

  const setTag = (key) => {
    console.log('setTag');
    setCurrentTag(tagList.find((tag) => (tag.name === key.name)));
  };

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
      {
        tagList.map((tag) => (
          <div
            key={tag.name}
            role="button"
            style={{
              padding: '3px 10px',
              borderRadius: '5px',
              marginTop: '5px',
              backgroundColor: tagDown === tag.name ? '#ddd' : null,
            }}
            onClick={() => setTag(tag)}
            onMouseDown={() => setTagDown(tag.name)}
            onMouseUp={() => setTagDown(null)}
            onKeyDown={() => (null)}
            tabIndex={0}
          >
            <span
              className={`icon ${currentTag.name !== tag.name ? 'icon-record' : 'icon-play'}`}
              style={{ color: tag.color, marginRight: '5px' }}
            />
            <strong>{tag.name}</strong>
          </div>
        ))
      }
    </div>
  );
};
