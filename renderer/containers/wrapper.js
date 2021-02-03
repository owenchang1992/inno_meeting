import React, { useReducer, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/css/photon.css';

import tabReducer from '../reducers/tab_reducer';
import { addNewTab, closeTab } from '../reducers/tab_actions';

import Main from './main_pane';
import Header from './header';
import {
  send2Local,
  removeListener,
  receive,
} from '../request';

import {
  TO_MAIN,
  FROM_MAIN,
  DEFAULT,
  FIND_ONE,
  SELECT_FILES,
  UPDATE,
  EXPORT_PROJECT,
} from '../constants';

const App = () => {
  const history = useHistory();
  const [tabs, dispatch] = useReducer(tabReducer, []);
  const [selectedTab, setSelectedTab] = useState([]);

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
        name: DEFAULT,
      },
    });
  };

  const addTabs = (newTabs) => {
    // Add tab to list
    newTabs.forEach((newTab) => addTab(newTab));
  };

  const getProject = () => {
    send2Local(TO_MAIN, {
      name: FIND_ONE,
      contents: {
        name: DEFAULT,
      },
    });
  };

  // Initial Project
  useEffect(() => {
    // Get the preject information from DB
    getProject();

    // Add listener
    receive(FROM_MAIN, (e, resp) => {
      if (resp.name === SELECT_FILES) {
        console.log(resp);
        addTabs(resp.contents.tabs);
        setSelectedTab(resp.contents.tabs);
        history.push(resp.contents.tabs[0].routingPath);
      } else if (resp.name === FIND_ONE) {
        addTabs(resp.contents.tabs);
      }
    });

    return () => removeListener(FROM_MAIN, addTabs);
  }, []);

  useEffect(() => {
    send2Local(TO_MAIN, {
      name: UPDATE,
      contents: {
        name: DEFAULT,
        key: DEFAULT,
        tabs,
      },
    });
  }, [tabs]);

  return (
    <div className="window">
      <Header
        showOpenDialog={showOpenDialog}
        showSaveDialog={showSaveDialog}
      />
      <div className="window-content">
        <Main tabs={tabs} selectedTab={selectedTab} closeTab={onCloseTab} />
      </div>
    </div>
  );
};

export default App;
