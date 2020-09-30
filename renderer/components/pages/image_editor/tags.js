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
  const [currentInput, setCurrentInput] = useState('');
  const [focusedTag, setFocusedTag] = useState(null);

  const setTag = (e, key) => {
    console.log(e.keyCode);
    setCurrentTag(tagList.find((tag) => (tag.name === key.name)));
  };

  const saveLabel = (e) => {
    if (e.keyCode === 13) {
      console.log('send');
      window.api.send('toCurrentPage', {
        name: 'local_db',
        collection: 'labels',
        type: 'update',
        contents: {
          name: currentInput,
          medias: [],
          description: '',
        },
      });
      setFocusedTag(null);
    }
  };

  useEffect(() => {
    setCurrentTag(tags[0]);
  }, []);

  return (
    <div>
      <h5 className="nav-group-title">
        Labels
        {/* <span
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
        /> */}
      </h5>
      {
        tags.map((tag) => (
          <div
            key={tag.name}
            role="button"
            style={{
              display: 'flex',
              padding: '3px 10px',
              borderRadius: '5px',
              marginTop: '5px',
              backgroundColor: tagDown === tag.name ? '#ddd' : null,
              alignItems: 'center',
            }}
            onClick={(e) => setTag(e, tag)}
            onMouseDown={(e) => {
              console.log(e.button);
              setCurrentInput(tag.name);
              if (e.button === 2) setFocusedTag(tag.name);
              else if (focusedTag !== tag.name) setFocusedTag(null);
              setTagDown(tag.name);
            }}
            onMouseUp={() => setTagDown(null)}
            onKeyDown={(e) => console.log(e.keyCode)}
            tabIndex={0}
          >
            <span
              className={`icon ${currentTag.name !== tag.name ? 'icon-record' : 'icon-play'}`}
              style={{ color: tag.color, marginRight: '5px' }}
            />
            {
              focusedTag === tag.name
                ? (
                  <input
                    className="form-control"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    type="text"
                    onKeyDown={(e) => saveLabel(e)}
                    placeholder={tag.name}
                  />
                )
                : <strong>{tag.name}</strong>
            }
          </div>
        ))
      }
    </div>
  );
};
