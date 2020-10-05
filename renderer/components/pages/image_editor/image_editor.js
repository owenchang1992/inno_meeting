import React, {
  useEffect,
  useRef,
  useState,
  useReducer,
  useCallback,
} from 'react';

import { useHistory } from 'react-router-dom';

import {
  loadImage,
  drawTagRectangle,
  drawPreviewingRectangle,
  drawInstructions,
  findRecordIndex,
} from './editor_utils';

import Labels from './labels';
import TagList from './tag_list';

const baseStyle = {
  borderRadius: '4px',
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
  marginRight: '5px',
};

const containerStyle = {
  width: '100%',
  height: 'calc(100% - 25px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5px',
};

const tagListReducer = (state, [type, payload]) => {
  switch (type) {
    case 'draw-rectangle':
      return [...state, {
        action: type,
        properties: payload,
      }];
    case 'get-record-from-db':
      return payload;
    default:
      return state;
  }
};

const initialPoint = { left: -1, top: -1 };

export default function imageEditor({ page, store, closePage }) {
  const canvasRef = useRef(null);
  const routeHistory = useHistory();
  const [snapshot, setSnapshot] = useState(null);
  const [currentLabel, setCurrentLabel] = useState({});
  const [tagList, dispatch] = useReducer(
    tagListReducer,
    store.getStore(page.routingPath)
      ? store.getStore(page.routingPath).actions
      : [],
  );
  const [content, setContent] = useState(<div>loading</div>);
  const [mouseDownPoint, setMouseDownPoint] = useState(initialPoint);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [currentMousePoint, setCurrentMousePoint] = useState(initialPoint);
  const [mouseUpPoint, setMouseUpPoint] = useState(initialPoint);
  const dpi = window.devicePixelRatio;

  const drawRecord = (record) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawInstructions(context, snapshot, record);
  };

  const toggleRecords = useCallback(
    (value) => {
      const index = findRecordIndex(value, selectedRecords);
      if (index === -1) {
        setSelectedRecords([...selectedRecords, value]);
      } else {
        selectedRecords.splice(index, 1);
        setSelectedRecords([...selectedRecords]);
      }
    },
  );

  const drawAllRecords = () => {
    setSelectedRecords([...tagList]);
  };

  // Initial content
  useEffect(() => {
    const onMouseDown = (e) => {
      setMouseUpPoint(initialPoint);
      setMouseDownPoint({
        left: e.nativeEvent.offsetX,
        top: e.nativeEvent.offsetY,
      });

      // Add mouse move event
      canvasRef.current.onmousemove = (event) => {
        setCurrentMousePoint({
          left: event.offsetX,
          top: event.offsetY,
        });
      };
    };

    const onMouseUp = (e) => {
      setMouseUpPoint({
        left: e.nativeEvent.offsetX,
        top: e.nativeEvent.offsetY,
      });

      // remove mouse move event
      canvasRef.current.onmousemove = null;
      setCurrentMousePoint(initialPoint);
    };

    const createCanvas = (width, height) => (
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={
          width < height + 50
            ? { ...baseStyle, height: '100%' }
            : { ...baseStyle, width: 'calc(100% - 11em)' }
        }
        onMouseDown={(e) => onMouseDown(e)}
        onMouseUp={(e) => onMouseUp(e)}
      />
    );

    const drawImage = () => loadImage(page.props.imagePath)
      .then((img) => {
        setContent(
          createCanvas(
            img.naturalWidth * dpi,
            img.naturalHeight * dpi,
          ),
        );

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const width = img.naturalWidth * dpi;
        const height = img.naturalHeight * dpi;
        context.drawImage(img, 0, 0, width, height);
        setSnapshot(context.getImageData(0, 0, width, height));
        if (tagList.length !== 0) drawAllRecords();
      })
      .catch((err) => {
        setContent(<div>Loading Media Error</div>);
        console.log(err);
        setTimeout(() => {
          routeHistory.goBack();
          closePage(page);
        }, 1000);
      });

    const getRecord = (e, resp) => {
      if (resp.type === 'findOne') {
        console.log('fromCurrentPage', resp.contents.actions);
        dispatch(['get-record-from-db', resp.contents.actions]);
      }
    };

    const getDbRecords = () => {
      if (tagList.length === 0) {
        window.api.send('toCurrentPage', {
          name: 'local_db',
          collection: 'images',
          type: 'findOne',
          contents: { path: page.routingPath },
        });

        window.api.receive('fromCurrentPage', getRecord);
      }
    };

    drawImage()
      .then(() => getDbRecords())
      .catch(() => console.log('initial failed'));

    store.createStore({
      name: page.routingPath,
      type: page.type,
    });

    return () => window.api.removeListener('fromCurrentPage', getRecord);
  }, []);

  useEffect(() => {
    if (content.type === 'canvas' && tagList.length !== 0) {
      console.log('selectedRecords');
      drawRecord(selectedRecords);
    }
  }, [selectedRecords]);

  // Cache tagList after tagList updated
  useEffect(() => {
    if (tagList.length !== 0) {
      store.addStore({
        name: page.routingPath,
        contents: tagList,
      });
    }
    drawAllRecords();
  }, [tagList]);

  // handle mouse events
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      const scale = () => ({
        scaleX: canvas.width / context.canvas.offsetWidth,
        scaleY: canvas.height / context.canvas.offsetHeight,
      });

      // Check the point isn't in initial state
      const checkPoint = (point) => (point.left !== -1 && point.top !== -1);

      // Check the scope in point1 and point2 isn't a line or a point
      const isArea = (point1, point2) => (
        point1.left !== point2.left && point1.top !== point2.top
      );

      if (checkPoint(mouseDownPoint) && content !== null) {
        if (checkPoint(mouseUpPoint)) {
          drawRecord(tagList);
          if (isArea(mouseDownPoint, mouseUpPoint)) {
            drawTagRectangle({
              left: Math.round(mouseDownPoint.left * scale().scaleX),
              top: Math.round(mouseDownPoint.top * scale().scaleY),
              width: Math.round((mouseUpPoint.left - mouseDownPoint.left) * scale().scaleX),
              height: Math.round((mouseUpPoint.top - mouseDownPoint.top) * scale().scaleY),
              color: currentLabel.color,
              label: currentLabel,
            }, context, dispatch);
          }
        } else if (checkPoint(currentMousePoint)) {
          // console.log(tagList);
          drawRecord(tagList);
          drawPreviewingRectangle({
            left: mouseDownPoint.left * scale().scaleX,
            top: mouseDownPoint.top * scale().scaleY,
            width: (currentMousePoint.left - mouseDownPoint.left) * scale().scaleX,
            height: (currentMousePoint.top - mouseDownPoint.top) * scale().scaleY,
          }, context);
        }
      }
    }
  }, [mouseDownPoint, mouseUpPoint, currentMousePoint]);

  return (
    <div
      id="canvas-container"
      style={containerStyle}
    >
      { content }
      {
        useCallback(content.type === 'canvas' ? (
          <div style={{ height: '100%', width: '11em' }}>
            <Labels setCurrentLabel={setCurrentLabel} currentLabel={currentLabel} />
            <TagList
              tagList={tagList}
              toggleRecords={toggleRecords}
              selectedRecords={selectedRecords}
            />
          </div>
        ) : null, [tagList, currentLabel, selectedRecords, content])
      }
    </div>
  );
}
