import React, { useState, useEffect } from 'react';

const defaultContainter = {
  name: 'Default',
  key: 'default',
  type: 'container',
  description: '',
  labels: [
    {
      name: 'Red',
      color: '#fc605b',
    },
    {
      name: 'Orange',
      color: '#fdbc40',
    },
    {
      name: 'Green',
      color: '#34c84a',
    },
    {
      name: 'Blue',
      color: '#57acf5',
    },
  ],
};

export default ({ setCurrentLabel }) => {
  const [labelDown, setLabelDown] = useState(null);
  const [focusedLabel, setFocusLabel] = useState(defaultContainter.labels[0]);
  const [labelList, setLabelList] = useState(defaultContainter.labels); // get container labels
  const [currentInput, setCurrentInput] = useState('');
  const [editedLabel, setEditedLabel] = useState(null);

  const updateCurrentLabel = (selectedLabel) => {
    if (editedLabel === null) {
      setCurrentLabel(selectedLabel);
      setFocusLabel(selectedLabel);
    }
  };

  const saveLabel = (e, selectedLabel) => {
    const saveLabelToDB = (newList) => {
      window.api.send('toCurrentPage', {
        name: 'local_db',
        collection: 'labels',
        type: 'update',
        contents: {
          ...defaultContainter,
          labels: newList,
        },
      });
    };

    const getNewLabelList = () => {
      const index = labelList.findIndex((label) => (label.name === selectedLabel.name));
      labelList.splice(index, 1, {
        ...selectedLabel,
        name: currentInput,
      });

      return [...labelList];
    };

    if (e.keyCode === 13) {
      if (editedLabel !== null && currentInput.length !== 0) {
        setCurrentLabel({ ...selectedLabel, name: currentInput });
        const newLabelList = getNewLabelList();
        saveLabelToDB(newLabelList);
        setLabelList(newLabelList);
      }
      setEditedLabel(null);
    }
  };

  const editLabel = (e, selectedLabel) => {
    setCurrentInput(selectedLabel.name);
    if (e.button === 2) setEditedLabel(selectedLabel.name);
    else if (editedLabel !== selectedLabel.name) {
      setEditedLabel(null);
      setLabelDown(selectedLabel.name);
    }
  };

  useEffect(() => {
    const getLabels = (e, resp) => {
      if (resp.contents) {
        if (resp.collection === 'labels' && resp.type === 'findOne') {
          setLabelList(resp.contents.labels);
          setFocusLabel(resp.contents.labels[0]);
          setCurrentLabel(resp.contents.labels[0]);
        }
      }
    };

    const getDBLabels = () => {
      window.api.send('toCurrentPage', {
        name: 'local_db',
        collection: 'labels',
        type: 'findOne',
        contents: { key: 'default' },
      });

      window.api.receive('fromCurrentPage', getLabels);
    };

    getDBLabels();
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
            onMouseDown={(e) => editLabel(e, label)}
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
