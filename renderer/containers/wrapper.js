import React, { useReducer, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import '../assets/css/photon.css';

import tabReducer from '../reducers/tab_reducer';
import { addNewTab, closeTab } from '../reducers/tab_actions';

import Main from './main_pane';
// import Header from './header';
import SideBar from './sidebar';

const App = () => {
  const [tabs, dispatch] = useReducer(tabReducer, []);

  const addTab = (tab) => {
    dispatch(addNewTab(tab));
  };

  const onCloseTab = (removedTab) => {
    dispatch(closeTab(removedTab));
  };

  const checkTab = (midiaPath) => (
    tabs.findIndex((tab) => (
      tab.routingPath === midiaPath
    ))
  );

  useEffect(() => {
    window.api.receive('fromMain', (e, resp) => {
      if (resp === 'app-close') {
        window.api.send('toMain', 'close');
      }
    });
  }, []);

  return (
    <Router>
      <div className="window">
        {/* <Header /> */}
        <div className="window-content">
          <div className="pane-group">
            <SideBar addTab={addTab} checkTab={checkTab} />
            <Main tabs={tabs} closeTab={onCloseTab} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
