import React, { useReducer, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/css/photon.css';

import tabReducer from '../reducers/tab_reducer';
import { addNewTab, closeTab } from '../reducers/tab_actions';

import Main from './main_pane';
import Header from './header';
import SideBar from './new_sidebar';

import {
  TO_MAIN,
  FROM_MAIN,
  DEFAULT,
  FIND_PROJECT,
  SELECT_FILES,
} from '../constants';

const App = () => {
  const history = useHistory();
  const [tabs, dispatch] = useReducer(tabReducer, []);
  const [mediaList, setMediaList] = useState([]);

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
        preMediaList: mediaList,
      },
    });
  };

  const mainRespHandler = (filePaths) => {
    filePaths.forEach((filePath) => addTab({
      name: filePath.basePath,
      src: filePath.fullPath,
      routingPath: filePath.routingPath,
    }));

    history.push(filePaths[filePaths.length - 1].routingPath);
  };

  useEffect(() => {
    const getProject = () => {
      window.api.send(TO_MAIN, {
        name: FIND_PROJECT,
        projectName: DEFAULT,
      });
    };

    // Get Project
    getProject();

    // Add listener
    window.api.receive(FROM_MAIN, (e, resp) => {
      // Need refactory
      if (resp === 'app-close') {
        window.api.send(TO_MAIN, 'close');
      } else if (resp.name === SELECT_FILES) {
        console.log(SELECT_FILES, resp);
        mainRespHandler(resp.filePaths);
      } else if (resp.name === FIND_PROJECT) {
        console.log(resp);
        setMediaList(resp.content);
      }
    });

    return () => window.api.removeListener(FROM_MAIN, mainRespHandler);
  }, []);

  return (
    <div className="window">
      <Header openSelectFileDialog={openSelectFileDialog} />
      <div className="window-content">
        <div className="pane-group">
          <SideBar mediaList={mediaList} />
          <Main tabs={tabs} closeTab={onCloseTab} />
        </div>
      </div>
    </div>
  );
};

export default App;
