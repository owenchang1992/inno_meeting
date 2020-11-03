import React, {
  useEffect,
  useRef,
  useState,
  useReducer,
  useCallback,
} from 'react';

import { useHistory } from 'react-router-dom';

import {
  GET_TAGS_FROM_DB,
  DELETE_TAG,
  SHOW_TAG,
  HIDE_TAG,
  FIND_ONE,
  PAGES,
} from './constants';

import {
  loadImage,
  drawTagRectangle,
  drawPreviewingRectangle,
  drawInstructions,
} from './utils';

import tagListReducer from './tag_reducer';

import Labels from './labels';
import TagList from './tag_list';

import { MEDIA_TAGGER, FROM_CURRENT_PAGE, TO_CURRENT_PAGE } from '../../../constants';

import {
  findOne,
  update,
  removeListener,
  receive,
  send2LocalDB,
} from '../../../request';

const baseStyle = {
  borderRadius: '4px',
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
  marginRight: '5px',
};

const containerStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5px',
};

const initialPoint = { left: -1, top: -1 };

export default function imageTagger({ tab, closeTab }) {
  const canvasRef = useRef(null);
  const routeHistory = useHistory();
  const [snapshot, setSnapshot] = useState(null);
  const [tagConfig, setTagConfig] = useState({});
  const [tagList, dispatch] = useReducer(tagListReducer, null);
  const [content, setContent] = useState(<div>loading</div>);
  const [mouseDownPoint, setMouseDownPoint] = useState(initialPoint);
  const [currentMousePoint, setCurrentMousePoint] = useState(initialPoint);
  const [mouseUpPoint, setMouseUpPoint] = useState(initialPoint);
  const dpi = window.devicePixelRatio;

  const drawTags = (tags) => {
    if (content.type === 'canvas') {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      drawInstructions(context, snapshot, tags);
    }
  };

  const toggleTags = (selectedTag) => {
    if (selectedTag.hide) dispatch([SHOW_TAG, selectedTag]);
    else dispatch([HIDE_TAG, selectedTag]);
  };

  const removeTag = (selectedTag) => {
    dispatch([DELETE_TAG, selectedTag]);
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

    const drawImage = () => loadImage(tab.src)
      .then((img) => {
        setContent(
          createCanvas(
            img.naturalWidth * dpi,
            img.naturalHeight * dpi,
          ),
        );

        const initDraw = () => {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          const width = img.naturalWidth * dpi;
          const height = img.naturalHeight * dpi;

          context.drawImage(img, 0, 0, width, height);
          setSnapshot(context.getImageData(0, 0, width, height));
        };

        if (canvasRef.current) {
          initDraw();
        } else {
          setTimeout(() => initDraw(), 0);
        }
      })
      .catch((err) => {
        setContent(<div>Loading Media Error</div>);
        console.log(err);
        setTimeout(() => {
          routeHistory.goBack();
          closeTab(tab);
        }, 1000);
      });

    const dbRespHandler = (e, resp) => {
      if (resp.type === PAGES && resp.name === FIND_ONE) {
        if (resp.contents) {
          dispatch([GET_TAGS_FROM_DB, resp.contents.actions]);
        } else dispatch([GET_TAGS_FROM_DB, []]);
      }
    };

    const getDbTagList = () => {
      send2LocalDB(TO_CURRENT_PAGE, findOne(PAGES, { path: tab.src }));
      receive(FROM_CURRENT_PAGE, dbRespHandler);
    };

    drawImage()
      .then(() => getDbTagList())
      .catch(() => console.log('initial failed'));

    return () => removeListener(FROM_CURRENT_PAGE, dbRespHandler);
  }, []);

  useEffect(() => {
    if (tagList !== null) {
      send2LocalDB(
        TO_CURRENT_PAGE,
        update(
          PAGES,
          {
            key: tab.src,
            path: tab.src,
            type: MEDIA_TAGGER,
            actions: tagList,
          },
        ),
      );
      drawTags(tagList);
    }
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
          // Clean canvas
          drawTags(tagList);
          if (isArea(mouseDownPoint, mouseUpPoint)) {
            drawTagRectangle({
              left: Math.round(mouseDownPoint.left * scale().scaleX),
              top: Math.round(mouseDownPoint.top * scale().scaleY),
              width: Math.round((mouseUpPoint.left - mouseDownPoint.left) * scale().scaleX),
              height: Math.round((mouseUpPoint.top - mouseDownPoint.top) * scale().scaleY),
              color: tagConfig.color,
              label: tagConfig,
            }, dispatch);
          }
        } else if (checkPoint(currentMousePoint)) {
          // Clean canvas
          drawTags(tagList);
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
          <div style={{ height: '100%', width: '10em' }}>
            <h3 style={{ marginLeft: '10px' }}>
              {tab.name}
            </h3>
            <Labels setTagConfig={setTagConfig} />
            <TagList
              tagList={tagList}
              toggleTags={toggleTags}
              removeTag={removeTag}
            />
          </div>
        ) : null, [tagList, content])
      }
    </div>
  );
}
