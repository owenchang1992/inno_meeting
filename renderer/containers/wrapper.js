import React, { useReducer, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import '../assets/css/photon.css';

import pageReducer from '../reducers/page_reducer';
import { addNewPage, closePage } from '../reducers/page_actions';

import Main from './main_pane';
import Header from './header';
import SideBar from './sidebar';

const reactStore = (() => {
  const store = {};

  const addStore = ({ name, contents }) => {
    store[name].actions = contents;
  };

  const getStore = (name) => store[name];

  const createStore = ({ name, type }) => {
    store[name] = {
      path: name,
      type,
      actions: [],
    };
  };

  const removeStore = (name) => {
    delete store[name];
  };

  const getAll = () => store;

  return {
    addStore,
    getStore,
    removeStore,
    getAll,
    createStore,
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
      page.routingPath === midiaPath
    ))
  );

  useEffect(() => {
    window.api.receive('fromMain', () => {
      console.log(JSON.stringify(reactStore.getAll()));
      window.api.send('toMain', JSON.stringify(reactStore.getAll()));
    });

    return () => window.api.removeListener('fromMain');
  }, []);

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
