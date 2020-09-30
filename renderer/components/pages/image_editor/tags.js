import React, { useState, useEffect } from 'react';

const testLabel = [
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
  const [labelDown, setLabelDown] = useState(null);
  const [labelList, setLabelList] = useState(testLabel); // get project labels
  const [currentInput, setCurrentInput] = useState('');
  const [focusedTag, setFocusedTag] = useState(null);

  const setTag = (label) => {
    if (focusedTag === null) {
      setCurrentTag(labelList.find((tag) => (tag.name === label.name)));
    }
  };

  const saveLabel = (e, label) => {
    const saveToDB = () => {
      window.api.send('toCurrentPage', {
        name: 'local_db',
        collection: 'labels',
        type: 'update',
        contents: {
          name: currentInput,
          description: '',
        },
      });
    };

    const updateTags = () => {
      const index = labelList.findIndex((tag) => (tag.name === label.name));
      labelList.splice(index, 1, {
        ...label,
        name: currentInput,
      });
      setLabelList([...labelList]);
    };

    if (e.keyCode === 13) {
      console.log('send');
      saveToDB();
      if (focusedTag !== null && currentInput.length !== 0) {
        setCurrentTag({ ...label, name: currentInput });
        updateTags();
      }
      setFocusedTag(null);
    }
  };

  const onMouseDown = (e, tag) => {
    console.log(e.button);
    setCurrentInput(tag.name);
    if (e.button === 2) setFocusedTag(tag.name);
    else if (focusedTag !== tag.name) setFocusedTag(null);
    setLabelDown(tag.name);
  };

  useEffect(() => {
    setCurrentTag(labelList[0]);
  }, []);

  return (
    <div>
      <h5 className="nav-group-title">
        Labels
      </h5>
      {
        labelList.map((tag) => (
          <div
            key={tag.name}
            role="button"
            style={{
              display: 'flex',
              padding: '3px 10px',
              borderRadius: '5px',
              marginTop: '5px',
              backgroundColor: labelDown === tag.name ? '#ddd' : null,
              alignItems: 'center',
            }}
            onClick={() => setTag(tag)}
            onMouseDown={(e) => onMouseDown(e, tag)}
            onMouseUp={() => setLabelDown(null)}
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
