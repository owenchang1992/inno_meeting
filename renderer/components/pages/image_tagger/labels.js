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
      labelID: 'LD3WVmBk5UaVeey1',
    },
    {
      name: 'Orange',
      color: '#fdbc40',
      labelID: 'n11BSySlzrkkgtLy',
    },
    {
      name: 'Green',
      color: '#34c84a',
      labelID: 'NmbFa1lovbl0Inyu',
    },
    {
      name: 'Blue',
      color: '#57acf5',
      labelID: 'hYsFaP1GUKfNQ9Rh',
    },
  ],
};

// const testLabel = [
//   {
//     labelID: 'LD3WVmBk5UaVeey1',
//     name: 'Red',
//     type: 'text',
//     description: '',
//   },
//   {
//     labelID: 'n11BSySlzrkkgtLy',
//     name: 'Orange',
//     type: 'text',
//     description: '',
//   },
//   {
//     labelID: 'NmbFa1lovbl0Inyu',
//     name: 'Green',
//     type: 'text',
//     description: '',
//   },
//   {
//     labelID: 'hYsFaP1GUKfNQ9Rh',
//     name: 'Blue',
//     type: 'text',
//     description: '',
//   },
// ];

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
    const saveLabelToDB = () => {
      window.api.send('toCurrentPage', {
        name: 'local_db',
        collection: 'labels',
        type: 'update',
        contents: defaultContainter,
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
    // const getLabels = (e, resp) => {
    //   if (resp.contents) {
    //     const newLabels = resp.contents.labels.map(
    //       (content) => {
    //         const foundLabel = testLabel.find((label) => (
    //           label.labelID === content.labelID
    //         ));

    //         return {
    //           ...content,
    //           ...foundLabel,
    //         };
    //       },
    //     );

    //     if (resp.collection === 'labels' && resp.type === 'findOne') {
    //       setLabelList(newLabels);
    //     }
    // //     console.log('getLabels', resp);
    // //   }
    // // };

    const getDBLabels = () => {
      // window.api.send('toCurrentPage', {
      //   name: 'local_db',
      //   collection: 'labels',
      //   type: 'findOne',
      //   contents: { _id: 'UoNuSbZeUVhBOzYf' },
      // });

      // window.api.receive('fromCurrentPage', getLabels);
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
