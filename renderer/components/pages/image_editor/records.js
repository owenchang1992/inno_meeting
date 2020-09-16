import React from 'react';

export default ({ history, drawRecord }) => {
  console.log(history);
  // const [showRecord, setShowRecord] = useState([]);

  // useEffect(() => {
  //   drawRecord(showRecord);
  // }, [showRecord]);

  return (
    <>
      <h5
        className="nav-group-title"
      >
        ROAs
        <span
          className="icon icon-arrows-ccw"
          role="button"
          aria-label="Mute volume"
          style={{
            padding: '0px 4px',
            // border: `1px solid ${newTagState !== 'hover' ? '#ddd' : 'gray'}`,
            borderRadius: '3px',
            marginLeft: '5px',
            // color: newTagState !== 'hover' ? '#ddd' : 'gray',
          }}
          // onMouseOver={() => setNewTagState('hover')}
          // onFocus={() => setNewTagState(null)}
          // onMouseOut={() => setNewTagState(null)}
          // onBlur={() => {}}
          tabIndex={0}
          onClick={() => { drawRecord(history); }}
          onKeyDown={() => (null)}
        />
      </h5>
      {
        history.map((value) => {
          const { tag } = value.properties;
          const getKey = () => {
            const {
              left, top, width, height, color,
            } = value.properties;
            const { round } = Math;

            return `${round(left)}${round(top)}${round(width)}${round(height)}${color}`;
          };

          return value.action === 'draw-image'
            ? null
            : (
              <div
                className="list-group-item"
                role="button"
                key={getKey()}
                style={{
                  padding: '5px 10px',
                  border: '1px solid #ddd',
                  borderRadius: '3px',
                  marginTop: '5px',
                }}
                tabIndex={0}
                onClick={() => { drawRecord([value]); }}
                onKeyDown={() => (null)}
              >
                <span className="icon icon-record" style={{ color: tag.color, marginRight: '5px' }} />
                <strong>{tag.name}</strong>
                <br />
                {value.action}
              </div>
            );
        })
      }
    </>
  );
};
