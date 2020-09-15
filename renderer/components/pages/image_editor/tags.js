import React, { useState, useEffect } from 'react';

const tagList = [
  {
    name: 'Red',
    color: '#fc605b',
    description: '',
  },
  {
    name: 'Orange',
    color: '#fdbc40',
    description: '',
  },
  {
    name: 'Green',
    color: '#34c84a',
    description: '',
  },
  {
    name: 'Blue',
    color: '#57acf5',
    description: '',
  },
];

export default ({ setCurrentTag, currentTag }) => {
  const [tagDown, setTagDown] = useState(null);
  const [tags] = useState(tagList);
  const [newTagState, setNewTagState] = useState(null);

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
            border: `1px solid ${newTagState !== 'hover' ? '#ddd' : 'gray'}`,
            borderRadius: '3px',
            marginLeft: '5px',
            color: newTagState !== 'hover' ? '#ddd' : 'gray',
          }}
          onMouseOver={() => setNewTagState('hover')}
          onFocus={() => setNewTagState(null)}
          onMouseOut={() => setNewTagState(null)}
          onBlur={() => {}}
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
