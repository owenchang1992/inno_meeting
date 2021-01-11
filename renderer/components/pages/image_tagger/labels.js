import React, { useState, useEffect, useContext } from 'react';

import { FIND_ONE } from './constants';
import { FROM_GENERAL, TO_GENERAL } from '../../../constants';

import LabelStore from '../../../label_store';
import EditBar from './edit_bar';

import {
  update,
  findOne,
  receive,
  send2Local,
} from '../../../request';

const LABELS = 'labels';
const PENCIL = 'pencil';

export default ({ setTagConfig }) => {
  const [enteredLabel, setEnteredLabel] = useState(null);
  const [focusedLabel, setFocusLabel] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [editedLabel, setEditedLabel] = useState(null);
  const nLabelList = useContext(LabelStore);
  console.log(nLabelList);

  const updateCurrentLabel = (selectedLabel) => {
    if (editedLabel === null) {
      setTagConfig(selectedLabel);
      setFocusLabel(selectedLabel);
    }
  };

  const saveLabel = (e, selectedLabel) => {
    const saveLabelToDB = (newList) => {
      send2Local(
        TO_GENERAL,
        update(
          LABELS,
          {
            labels: newList,
          },
        ),
      );
    };

    const getNewLabelList = () => {
      const index = nLabelList.labels.findIndex((label) => (label.name === selectedLabel.name));
      nLabelList.labels.splice(index, 1, {
        ...selectedLabel,
        name: currentInput,
      });

      return [...nLabelList.labels];
    };

    if (e.keyCode === 13) {
      if (editedLabel !== null && currentInput.length !== 0) {
        setTagConfig({ ...selectedLabel, name: currentInput });
        const newLabelList = getNewLabelList();
        saveLabelToDB(newLabelList);
        nLabelList.ldispatch(newLabelList);
      }
      setEditedLabel(null);
    }
  };

  const editLabel = (e, selectedLabel) => {
    setCurrentInput(selectedLabel.name);
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

  useEffect(() => {
    const getLabels = (e, resp) => {
      if (resp.contents !== null) {
        if (resp.type === LABELS && resp.name === FIND_ONE) {
          nLabelList.ldispatch(resp.contents.labels);
          setFocusLabel(resp.contents.labels[0]);
          setTagConfig(resp.contents.labels[0]);
        }
      } else setTagConfig(focusedLabel);
    };

    const getDBLabels = () => {
      send2Local(TO_GENERAL, findOne(LABELS, { key: 'default' }));
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
        nLabelList.labels ? nLabelList.labels.map((label) => (
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
