import React, { useState, useEffect } from 'react';

const labelList = [
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
  const [tags, setTags] = useState(labelList);
  const [currentInput, setCurrentInput] = useState('');
  const [focusedTag, setFocusedTag] = useState(null);

  const setTag = (label) => {
    if (focusedTag === null) {
      setCurrentTag(tags.find((tag) => (tag.name === label.name)));
    }
  };

  const saveLabel = (e, label) => {
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
      if (focusedTag !== null && currentInput.length !== 0) {
        setCurrentTag({
          ...label,
          name: currentInput,
        });
        const index = tags.findIndex((tag) => (tag.name === label.name));
        tags.splice(index, 1, {
          ...label,
          name: currentInput,
        });
        setTags([...tags]);
      }
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
            onClick={() => setTag(tag)}
            onMouseDown={(e) => {
              console.log(e.button);
              setCurrentInput(tag.name);
              if (e.button === 2) setFocusedTag(tag.name);
              else if (focusedTag !== tag.name) setFocusedTag(null);
              setTagDown(tag.name);
            }}
            onMouseUp={() => setTagDown(null)}
            onKeyDown={(e) => saveLabel(e, tag)}
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
