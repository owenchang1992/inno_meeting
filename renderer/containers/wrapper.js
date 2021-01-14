import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/css/photon.css';
import LabelStore from '../label_store';

import tabReducer from '../reducers/tab_reducer';
import labelReducer from '../reducers/label_reducers';
import { initializeLabel } from '../reducers/label_actions';

import { addNewTab, closeTab } from '../reducers/tab_actions';

import Main from './main_pane';
import Header from './header';

import {
  update,
  send2Local,
  removeListener,
  receive,
  FIND,
  find,
} from '../request';

import {
  TO_MAIN,
  FROM_MAIN,
  PROJECT_NAME,
  FIND_ONE,
  SELECT_FILES,
  UPDATE,
  EXPORT_PROJECT,
  LABELS,
  TO_GENERAL,
  FROM_GENERAL,
} from '../constants';

const App = () => {
  const history = useHistory();
  const [tabs, dispatch] = useReducer(tabReducer, []);
  const [labels, ldispatch] = useReducer(labelReducer, []);

  const addTab = (tab) => {
    dispatch(addNewTab(tab));
  };

  const onCloseTab = (removedTab) => {
    dispatch(closeTab(removedTab));
  };

  const showOpenDialog = () => {
    send2Local(TO_MAIN, {
      name: SELECT_FILES,
      contents: { tabs },
    });
  };

  const showSaveDialog = () => {
    send2Local(TO_MAIN, {
      name: EXPORT_PROJECT,
      contents: {
        name: PROJECT_NAME,
      },
    });
  };

  const addTabs = (newTabs) => {
    // Add tab to list
    newTabs.forEach((newTab) => addTab(newTab));

    // Add tab to routing list
    history.push(newTabs[0].routingPath);
  };

  const getProject = () => {
    send2Local(TO_MAIN, {
      name: FIND_ONE,
      contents: {
        name: PROJECT_NAME,
      },
    });
  };

  // Initial Project
  useEffect(() => {
    // Get the preject information from DB
    getProject();

    // Add listener
    receive(FROM_MAIN, (e, resp) => {
      if (resp.name === SELECT_FILES || resp.name === FIND_ONE) {
        addTabs(resp.contents.tabs);
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

    return () => removeListener(FROM_MAIN, addTabs);
  }, []);

  useEffect(() => {
    console.log(labels);
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
        tabs,
      },
    });
  }, [tabs]);

  return (
    <LabelStore.Provider
      value={{
        projectName: PROJECT_NAME,
        labels,
        ldispatch,
      }}
    >
      <div className="window">
        <Header
          showOpenDialog={showOpenDialog}
          showSaveDialog={showSaveDialog}
        />
        <div className="window-content">
          <Main tabs={tabs} closeTab={onCloseTab} />
        </div>
      </div>
    </LabelStore.Provider>
  );
};

export default App;
