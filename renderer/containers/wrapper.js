import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/css/photon.css';

import tabReducer from '../reducers/tab_reducer';
import { addNewTab, closeTab } from '../reducers/tab_actions';

import Main from './main_pane';
import Header from './header';
// import SideBar from './sidebar';

const App = () => {
  const history = useHistory();
  const [tabs, dispatch] = useReducer(tabReducer, []);

  const addTab = (tab) => {
    dispatch(addNewTab(tab));
  };

  const onCloseTab = (removedTab) => {
    dispatch(closeTab(removedTab));
  };

  const mainRespHandler = (resp) => {
    const filePath = resp.filePaths[0];

    addTab({
      name: filePath.basePath,
      src: filePath.fullPath,
      routingPath: filePath.routingPath,
    });
    history.push(filePath.routingPath);
  };

  useEffect(() => {
    window.api.receive('fromMain', (e, resp) => {
      if (resp === 'app-close') {
        window.api.send('toMain', 'close');
      } else {
        mainRespHandler(resp);
      }
    });

    return () => window.api.removeListener('fromMain', mainRespHandler);
  }, []);

  return (
    <div className="window">
      <Header />
      <div className="window-content">
        <div className="pane-group">
          {/* <SideBar addTab={addTab} checkTab={checkTab} /> */}
          <Main tabs={tabs} closeTab={onCloseTab} />
        </div>
      </div>
    </div>
  );
};

export default App;
