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

export default ({ setCurrentLabel, currentLabel }) => {
  const [labelDown, setLabelDown] = useState(null);
  const [labelList, setLabelList] = useState(testLabel); // get project labels
  const [currentInput, setCurrentInput] = useState('');
  const [focusedLabel, setFocusedLabel] = useState(null);

  const updateCurrentLabel = (selectedLabel) => {
    if (focusedLabel === null) {
      setCurrentLabel(labelList.find((label) => (label.name === selectedLabel.name)));
    }
  };

  const saveLabel = (e, selectedLabel) => {
    const saveLabelToDB = () => {
      window.api.send('toCurrentPage', {
        name: 'local_db',
        collection: 'labels',
        type: 'update',
        contents: {
          name: currentInput,
        },
      });
    };

    const updateLabelList = () => {
      const index = labelList.findIndex((label) => (label.name === selectedLabel.name));
      labelList.splice(index, 1, {
        ...selectedLabel,
        name: currentInput,
      });
      setLabelList([...labelList]);
    };

    if (e.keyCode === 13) {
      saveLabelToDB();
      if (focusedLabel !== null && currentInput.length !== 0) {
        setCurrentLabel({ ...selectedLabel, name: currentInput });
        updateLabelList();
      }
      setFocusedLabel(null);
    }
  };

  const onMouseDown = (e, selectedLabel) => {
    setCurrentInput(selectedLabel.name);
    if (e.button === 2) setFocusedLabel(selectedLabel.name);
    else if (focusedLabel !== selectedLabel.name) setFocusedLabel(null);
    setLabelDown(selectedLabel.name);
  };

  useEffect(() => {
    setCurrentLabel(labelList[0]);
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
            onClick={() => updateCurrentLabel(tag)}
            onMouseDown={(e) => onMouseDown(e, tag)}
            onMouseUp={() => setLabelDown(null)}
            onKeyDown={(e) => saveLabel(e, tag)}
            tabIndex={0}
          >
            <span
              className={`icon ${currentLabel.name !== tag.name ? 'icon-record' : 'icon-play'}`}
              style={{ color: tag.color, marginRight: '5px' }}
            />
            {
              focusedLabel === tag.name
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
