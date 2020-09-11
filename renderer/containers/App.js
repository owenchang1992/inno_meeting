import React, { useReducer } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import '../assets/css/photon.css';
import path from 'path';

import pageReducer from '../reducers/page_reducer';
import { addNewPage, closePage } from '../reducers/page_actions';

import Main from './main_pane';
import Header from './header';
import SideBar from './sidebar';

const reactStore = (() => {
  const store = {};

  const addStore = ({ name, content }) => {
    store[name] = content;
  };

  const getStore = (name) => store[name];

  const removeStore = (name) => {
    delete store[name];
    console.log(store);
  };

  return {
    addStore,
    getStore,
    removeStore,
  };
})();

const App = () => {
  const [pages, dispatch] = useReducer(pageReducer, []);

  const addPage = (page) => {
    dispatch(addNewPage(page));
  };

  const onClosePage = (removedPage) => {
    dispatch(closePage(removedPage));
    reactStore.removeStore(removedPage.routingPath);
  };

  const checkPage = (midiaPath) => (
    pages.findIndex((page) => (
      page.routingPath === path.resolve(
        window.api.getHomeDir(),
        midiaPath,
      )
    ))
  );

  return (
    <Router>
      <div className="window">
        <Header />
        <div className="window-content">
          <div className="pane-group">
            <SideBar addPage={addPage} checkPage={checkPage} />
            <Main pages={pages} closePage={onClosePage} store={reactStore} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
