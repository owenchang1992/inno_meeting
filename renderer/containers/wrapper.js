import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/css/photon.css';

import tabReducer from '../reducers/tab_reducer';
import { addNewTab, closeTab } from '../reducers/tab_actions';

import Main from './main_pane';
import Header from './header';
import SideBar from './new_sidebar';

import { TO_MAIN, FROM_MAIN } from '../constants';

const App = () => {
  const history = useHistory();
  const [tabs, dispatch] = useReducer(tabReducer, []);

  const addTab = (tab) => {
    dispatch(addNewTab(tab));
  };

  const onCloseTab = (removedTab) => {
    dispatch(closeTab(removedTab));
  };

  const mainRespHandler = (filePaths) => {
    filePaths.forEach((filePath) => addTab({
      name: filePath.basePath,
      src: filePath.fullPath,
      routingPath: filePath.routingPath,
    }));

    history.push(filePaths[0].routingPath);
  };

  useEffect(() => {
    window.api.receive(FROM_MAIN, (e, resp) => {
      // Need refactory
      if (resp === 'app-close') {
        window.api.send(TO_MAIN, 'close');
      } else if (!resp.canceled) {
        mainRespHandler(resp.filePaths);
      }
    });

    return () => window.api.removeListener(FROM_MAIN, mainRespHandler);
  }, []);

  return (
    <div className="window">
      <Header />
      <div className="window-content">
        <div className="pane-group">
          <SideBar />
          <Main tabs={tabs} closeTab={onCloseTab} />
        </div>
      </div>
    </div>
  );
};

export default App;
