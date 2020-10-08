import React, { useReducer, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import '../assets/css/photon.css';

import pageReducer from '../reducers/page_reducer';
import { addNewPage, closePage } from '../reducers/page_actions';

import Main from './main_pane';
import Header from './header';
import SideBar from './sidebar';

const App = () => {
  const [pages, dispatch] = useReducer(pageReducer, []);

  const addPage = (page) => {
    dispatch(addNewPage(page));
  };

  const onClosePage = (removedPage) => {
    dispatch(closePage(removedPage));
  };

  const checkPage = (midiaPath) => (
    pages.findIndex((page) => (
      page.routingPath === midiaPath
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
        <Header />
        <div className="window-content">
          <div className="pane-group">
            <SideBar addPage={addPage} checkPage={checkPage} />
            <Main pages={pages} closePage={onClosePage} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
