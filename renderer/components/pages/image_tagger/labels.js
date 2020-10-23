import React, { useState, useEffect } from 'react';

import EditBar from './edit_bar';

import { update, findOne, receive } from '../../../db_request';

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

export default ({ setTagConfig }) => {
  const [enteredLabel, setEnteredLabel] = useState(null);
  const [focusedLabel, setFocusLabel] = useState(defaultContainter.labels[0]);
  const [labelList, setLabelList] = useState(defaultContainter.labels); // get container labels
  const [currentInput, setCurrentInput] = useState('');
  const [editedLabel, setEditedLabel] = useState(null);

  const updateCurrentLabel = (selectedLabel) => {
    if (editedLabel === null) {
      setTagConfig(selectedLabel);
      setFocusLabel(selectedLabel);
    }
  };

  const saveLabel = (e, selectedLabel) => {
    const saveLabelToDB = (newList) => {
      update(
        'labels',
        {
          ...defaultContainter,
          labels: newList,
        },
      );
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
        setTagConfig({ ...selectedLabel, name: currentInput });
        const newLabelList = getNewLabelList();
        saveLabelToDB(newLabelList);
        setLabelList(newLabelList);
      }
      setEditedLabel(null);
    }
  };

  const editLabel = (e, selectedLabel) => {
    setCurrentInput(selectedLabel.name);
    if (e.target.className.includes('pencil')) {
      setEditedLabel(selectedLabel.name);
    } else if (e.button === 2) setEditedLabel(selectedLabel.name);
    else if (editedLabel !== selectedLabel.name) {
      setEditedLabel(null);
    }
  };

  const getEditBar = (label) => {
    if (enteredLabel && editedLabel === null) {
      return enteredLabel.name === label.name
        ? <EditBar name="pencil" />
        : null;
    }

    return null;
  };

  useEffect(() => {
    const getLabels = (e, resp) => {
      if (resp.contents) {
        if (resp.collection === 'labels' && resp.type === 'findOne') {
          setLabelList(resp.contents.labels);
          setFocusLabel(resp.contents.labels[0]);
          setTagConfig(resp.contents.labels[0]);
        }
      }
    };

    const getDBLabels = () => {
      findOne('labels', { key: 'default' });

      receive(getLabels);
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
              position: 'relative',
              display: 'flex',
              padding: '3px 10px',
              borderRadius: '5px',
              marginTop: '5px',
              // backgroundColor: pressedLabel === label.name ? '#ddd' : null,
              alignItems: 'center',
            }}
            onClick={() => updateCurrentLabel(label)}
            onMouseDown={(e) => editLabel(e, label)}
            onMouseEnter={() => setEnteredLabel(label)}
            onMouseLeave={() => setEnteredLabel(null)}
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
                    style={{ padding: '3px 7px' }}
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    type="text"
                    placeholder={label.name}
                  />
                )
                : <strong>{label.name}</strong>
            }
            { getEditBar(label) }
          </div>
        ))
      }
    </div>
  );
};
