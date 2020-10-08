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

export default ({ setCurrentLabel }) => {
  const [labelDown, setLabelDown] = useState(null);
  const [focusedLabel, setFocusLabel] = useState(testLabel[0]);
  const [labelList, setLabelList] = useState(testLabel); // get project labels
  const [currentInput, setCurrentInput] = useState('');
  const [editedLabel, setEditedLabel] = useState(null);

  const updateCurrentLabel = (selectedLabel) => {
    if (editedLabel === null) {
      setCurrentLabel(selectedLabel);
      setFocusLabel(selectedLabel);
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
      if (editedLabel !== null && currentInput.length !== 0) {
        setCurrentLabel({ ...selectedLabel, name: currentInput });
        updateLabelList();
      }
      setEditedLabel(null);
    }
  };

  const onMouseDown = (e, selectedLabel) => {
    setCurrentInput(selectedLabel.name);
    if (e.button === 2) setEditedLabel(selectedLabel.name);
    else if (editedLabel !== selectedLabel.name) setEditedLabel(null);
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
        labelList.map((label) => (
          <div
            key={label.name}
            role="button"
            style={{
              display: 'flex',
              padding: '3px 10px',
              borderRadius: '5px',
              marginTop: '5px',
              backgroundColor: labelDown === label.name ? '#ddd' : null,
              alignItems: 'center',
            }}
            onClick={() => updateCurrentLabel(label)}
            onMouseDown={(e) => onMouseDown(e, label)}
            onMouseUp={() => setLabelDown(null)}
            onKeyDown={(e) => saveLabel(e, label)}
            tabIndex={0}
          >
            <span
              className={`icon ${focusedLabel.name !== label.name ? 'icon-record' : 'icon-play'}`}
              style={{ color: label.color, marginRight: '5px' }}
            />
            {
              editedLabel === label.name
                ? (
                  <input
                    className="form-control"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    type="text"
                    placeholder={label.name}
                  />
                )
                : <strong>{label.name}</strong>
            }
          </div>
        ))
      }
    </div>
  );
};
