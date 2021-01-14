import React, { useState, useEffect, useContext } from 'react';

import LabelStore from '../../../label_store';
import EditBar from './edit_bar';

import { updateLabel, addNewlabel } from '../../../reducers/label_actions';
import defaultabel from '../../../reducers/default_label';

const PENCIL = 'pencil';

export default ({ setTagConfig }) => {
  const [enteredLabel, setEnteredLabel] = useState(null);
  const { labels, ldispatch } = useContext(LabelStore);
  const [focusedLabel, setFocusLabel] = useState(labels[0]);
  const [currentInput, setCurrentInput] = useState('');
  const [editedLabel, setEditedLabel] = useState(null);

  const updateCurrentLabel = (selectedLabel) => {
    if (editedLabel === null) {
      setTagConfig(selectedLabel);
      setFocusLabel(selectedLabel);
    }
  };

  const saveLabel = (e, selectedLabel) => {
    if (e.keyCode === 13) {
      if (editedLabel !== null && currentInput.length !== 0) {
        const newLabel = updateLabel(selectedLabel, { title: currentInput });
        setTagConfig(newLabel);
        ldispatch(newLabel);
      }
      setEditedLabel(null);
    }
  };

  const editLabel = (e, selectedLabel) => {
    setCurrentInput(selectedLabel.title);
    if (e.target.className.includes(PENCIL)) {
      setEditedLabel(selectedLabel.name);
    } else if (e.button === 2) setEditedLabel(selectedLabel.name);
    else if (editedLabel !== selectedLabel.name) {
      setEditedLabel(null);
    }
  };

  const getEditBar = (label) => {
    if (enteredLabel && editedLabel === null) {
      return enteredLabel.name === label.name
        ? <EditBar name={PENCIL} />
        : null;
    }

    return null;
  };

  const normalLabelFilter = (label) => label.type === 'normal';

  useEffect(() => {
    setTagConfig(focusedLabel);
  }, [focusedLabel]);

  useEffect(() => {
    if (labels.filter(normalLabelFilter).length !== 0) {
      setFocusLabel(labels[0]);
    } else {
      setFocusLabel(defaultabel[0]);
      ldispatch(addNewlabel(defaultabel));
    }
  }, []);

  return (
    <div>
      <h5 className="nav-group-title">
        Labels
      </h5>
      {
        labels.length !== 0 ? labels
          .filter(normalLabelFilter)
          .map((label) => (
            <div
              key={label.name}
              role="button"
              style={{
                position: 'relative',
                display: 'flex',
                padding: '3px 10px',
                borderRadius: '5px',
                marginTop: '5px',
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
                      placeholder={label.title}
                    />
                  )
                  : <strong>{label.title}</strong>
              }
              { getEditBar(label) }
            </div>
          )) : null
      }
    </div>
  );
};
