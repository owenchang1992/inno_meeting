import React, { useState, useEffect, useContext } from 'react';

import { FROM_GENERAL, TO_GENERAL } from '../../../constants';

import LabelStore from '../../../label_store';
import EditBar from './edit_bar';

import {
  find,
  receive,
  send2Local,
  FIND,
} from '../../../request';

import { updatelabels } from '../../../reducers/label_actions';
import defaultabel from '../../../reducers/default_label';

const LABELS = 'labels';
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
    const getNewLabelList = () => {
      const index = labels.findIndex((label) => (label.name === selectedLabel.name));
      labels.splice(index, 1, {
        ...selectedLabel,
        title: currentInput,
      });

      return [...labels];
    };

    if (e.keyCode === 13) {
      if (editedLabel !== null && currentInput.length !== 0) {
        setTagConfig({ ...selectedLabel, title: currentInput });
        const newLabelList = getNewLabelList();
        ldispatch(updatelabels(newLabelList));
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
    const getLabels = (e, resp) => {
      if (resp.type === LABELS) {
        if (resp.name === FIND) {
          if (resp.contents !== null && resp.contents.length !== 0) {
            setFocusLabel(resp.contents[0]);
            ldispatch(updatelabels(resp.contents));
          } else {
            setFocusLabel(defaultabel[0]);
            ldispatch(updatelabels(defaultabel));
          }
        }
      }
    };

    const getDBLabels = () => {
      send2Local(TO_GENERAL, find(LABELS, {}));
      receive(FROM_GENERAL, getLabels);
    };

    getDBLabels();
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
