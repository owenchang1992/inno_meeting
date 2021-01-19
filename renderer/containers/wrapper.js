import React, { useReducer, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/css/photon.css';
import ContextStore from '../context_store';

import tabReducer from '../reducers/tab_reducer';
import labelReducer from '../reducers/label_reducers';
import { initializeLabel } from '../reducers/label_actions';

import { addNewPage, closeTab, pageCreater } from '../reducers/tab_actions';

import Main from './main_pane';
import Header from './header';

import {
  update,
  send2Local,
  receive,
  FIND,
  find,
} from '../request';

import {
  TO_MAIN,
  PROJECT_NAME,
  SELECT_FILES,
  UPDATE,
  // EXPORT_PROJECT,
  LABELS,
  TO_GENERAL,
  FROM_GENERAL,
  PAGES,
} from '../constants';

const App = () => {
  const history = useHistory();
  const [pages, dispatch] = useReducer(tabReducer, []);
  const [labels, ldispatch] = useReducer(labelReducer, []);
  const [selectLabel, setSelectLabel] = useState(null);

  const addPage = (src) => {
    let newPage;
    if (Array.isArray(src)) {
      newPage = src.map((srcItem) => pageCreater(srcItem, PROJECT_NAME));
      history.push(newPage[0].key);
    } else {
      newPage = pageCreater(src, PROJECT_NAME);
    }

    dispatch(addNewPage(newPage));
  };

  const onCloseTab = (removedTab) => {
    dispatch(closeTab(removedTab));
  };

  const showOpenDialog = () => {
    send2Local(TO_GENERAL, {
      type: PAGES,
      name: SELECT_FILES,
    });
  };

  // const showSaveDialog = () => {
  //   send2Local(TO_MAIN, {
  //     name: EXPORT_PROJECT,
  //     contents: {
  //       name: PROJECT_NAME,
  //     },
  //   });
  // };

  const getProject = () => {
    send2Local(TO_GENERAL, find(PAGES, {}));
  };

  // Initial Project
  useEffect(() => {
    // Get the preject information from DB
    getProject();

    // Add listener
    receive(FROM_GENERAL, (e, resp) => {
      console.log(resp);
      if (resp.name === SELECT_FILES) {
        addPage(resp.contents);
      } else if (resp.name === FIND && resp.type === PAGES) {
        // TODO: ADD Initial page
        // addPage(resp.contents);
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
    if (labels.length !== 0) {
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
        selectLabel,
        setSelectLabel,
        labels,
        ldispatch,
      }}
    >
      <div className="window">
        <Header
          showOpenDialog={showOpenDialog}
          // showSaveDialog={showSaveDialog}
        />
        <div className="window-content">
          <Main tabs={pages} closeTab={onCloseTab} />
        </div>
      </div>
    </ContextStore.Provider>
  );
};

export default App;
