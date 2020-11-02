import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/css/photon.css';

import tabReducer from '../reducers/tab_reducer';
import { addNewTab, closeTab } from '../reducers/tab_actions';

import Main from './main_pane';
import Header from './header';
import SideBar from './sidebar';

import {
  TO_MAIN,
  FROM_MAIN,
  DEFAULT,
  FIND_PROJECT,
  SELECT_FILES,
  UPDATE_PROJECT,
} from '../constants';

const App = () => {
  const history = useHistory();
  const [tabs, dispatch] = useReducer(tabReducer, []);

  const addTab = (tab) => {
    dispatch(addNewTab(tab));
  };

  const onCloseTab = (removedTab) => {
    dispatch(closeTab(removedTab));
  };

  const openSelectFileDialog = () => {
    window.api.send(TO_MAIN, {
      name: SELECT_FILES,
      projectName: DEFAULT,
      contents: {
        preMediaList: tabs,
      },
    });
  };

  const addTabs = (newTabs) => {
    // Add tab to list
    newTabs.forEach((newTab) => addTab(newTab));

    // Add tab to routing list
    history.push(newTabs[newTabs.length - 1].routingPath);
  };

  const getProject = () => {
    window.api.send(TO_MAIN, {
      name: FIND_PROJECT,
      projectName: DEFAULT,
    });
  };

  // Initialize Project
  useEffect(() => {
    // Get the preject information from DB
    getProject();

    // Add listener
    window.api.receive(FROM_MAIN, (e, resp) => {
      if (resp.name === SELECT_FILES || resp.name === FIND_PROJECT) {
        addTabs(resp.contents);
      }
    });

    return () => window.api.removeListener(FROM_MAIN, addTabs);
  }, []);

  useEffect(() => {
    window.api.send(TO_MAIN, {
      name: UPDATE_PROJECT,
      projectName: DEFAULT,
      contents: tabs,
    });
  }, [tabs]);

  return (
    <div className="window">
      <Header openSelectFileDialog={openSelectFileDialog} />
      <div className="window-content">
        <div className="pane-group">
          <SideBar tabs={tabs} closeTab={onCloseTab} />
          <Main tabs={tabs} />
        </div>
      </div>
    </div>
  );
};

export default App;
