import React, { useState, useEffect } from 'react';

const tagList = [
  {
    name: 'default',
    color: 'gray',
    description: '',
  },
  {
    name: 'tag1',
    color: 'red',
    description: '',
  },
];

export default ({ setCurrentTag, currentTag }) => {
  const [tagDown, setTagDown] = useState(null);
  const [tags] = useState(tagList);

  const setTag = (key) => {
    setCurrentTag(tagList.find((tag) => (tag.name === key.name)));
  };

  useEffect(() => {
    setCurrentTag(tags[0]);
  }, []);

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
        tags.map((tag) => (
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
