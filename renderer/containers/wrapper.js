import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/css/photon.css';
import ContextStore from '../context_store';

import pageReducer from '../reducers/page_reducer';
import labelReducer from '../reducers/label_reducers';
import { initializeLabel } from '../reducers/label_actions';

import {
  addPage,
  closePage,
  pageCreater,
  updatePage,
} from '../reducers/page_actions';

import Main from './main_pane';
import Header from './header';

import {
  update,
  send2Local,
  receive,
  FIND,
  find,
  remove,
} from '../request';

import {
  TO_MAIN,
  PROJECT_NAME,
  SELECT_FILES,
  UPDATE,
  LABELS,
  TO_GENERAL,
  FROM_GENERAL,
  PAGES,
} from '../constants';

const App = () => {
  const history = useHistory();
  const [pages, dispatch] = useReducer(pageReducer, []);
  const [labels, ldispatch] = useReducer(labelReducer, []);

  const initPage = (dbPage) => {
    history.push(dbPage[0].key);
    dbPage.forEach((page) => {
      console.log(page);
      dispatch(addPage(page));
    });
  };

  const addNewPage = (src) => {
    if (Array.isArray(src)) {
      history.push(
        src.map((srcItem) => {
          const newPage = pageCreater(srcItem, PROJECT_NAME);
          console.log(newPage);
          dispatch(addPage(newPage));
          return newPage;
        })[0].key,
      );
    } else {
      dispatch(addPage(pageCreater(src, PROJECT_NAME)));
    }
  };

  const onUpdatePage = (targetPage) => {
    dispatch(updatePage(targetPage));
    send2Local(TO_GENERAL, update(PAGES, targetPage));
  };

  const removePage = (removedPage) => {
    dispatch(closePage(removedPage));
    send2Local(TO_GENERAL, remove(PAGES, { key: removedPage.key }));
  };

  const showOpenDialog = () => {
    send2Local(TO_GENERAL, {
      type: PAGES,
      name: SELECT_FILES,
    });
  };

  const getProject = () => {
    send2Local(TO_GENERAL, find(PAGES, {}));
  };

  // Initial Project
  useEffect(() => {
    // Get the preject information from DB
    getProject();

    // Add listener
    receive(FROM_GENERAL, (e, resp) => {
      if (resp.name === SELECT_FILES) {
        addNewPage(resp.contents);
      } else if (resp.name === FIND && resp.type === PAGES) {
        // TODO: ADD Initial page
        initPage(resp.contents);
      }
    });

    const getLabels = (e, resp) => {
      if (resp.contents !== null) {
        if (resp.type === LABELS) {
          if (resp.name === FIND) {
            ldispatch(initializeLabel(resp.contents));
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

  useEffect(() => {
    const checkUpdateCtn = (labelList) => {
      for (let i = 0; i < labelList.length; i += 1) {
        if (!labelList[i]) return false;
      }
      return true;
    };

    if (labels.length !== 0 && checkUpdateCtn(labels)) {
      send2Local(
        TO_GENERAL,
        update(
          LABELS,
          labels,
        ),
      );
    }
  }, [labels]);

  useEffect(() => {
    send2Local(TO_MAIN, {
      name: UPDATE,
      contents: {
        name: PROJECT_NAME,
        key: PROJECT_NAME,
      },
    });
  }, []);

  return (
    <ContextStore.Provider
      value={{
        projectName: PROJECT_NAME,
        labels,
        ldispatch,
        removePage,
        onUpdatePage,
      }}
    >
      <div className="window">
        <Header showOpenDialog={showOpenDialog} />
        <div className="window-content">
          <Main pages={pages} />
        </div>
      </div>
    </ContextStore.Provider>
  );
};

export default App;
