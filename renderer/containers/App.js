import React, { useState, useReducer } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import '../assets/css/photon.css';

import { pageReducer } from '../reducers/page_reducer';
import { addNewPage } from '../reducers/page_actions';

import Main from './main_pane';
import Header from './header';
import SideBar from './sidebar';

const page1 = {
  name: 'page 1',
  type: 'image_editor',
  routingPath: '/page1',
  props: {
    imagePath: 'dev/icon.png',
  },
};

const App = () => {
  const [pages, setPages] = useState([page1]);
  const [newpages, dispatch] = useReducer(pageReducer, []);

  const addPage = (page) => {
    setPages(pages.concat([page]));
    dispatch(addNewPage(page));
  };

  const closePage = (removedPage) => {
    const rmPageIndex = pages.findIndex(
      (page) => removedPage.routingPath === page.routingPath,
    );
    pages.splice(rmPageIndex, 1);
    setPages(pages.concat([]));
  };

  return (
    <Router>
      <div className="window">
        <Header />
        <div className="window-content">
          <div className="pane-group">
            <SideBar addPage={addPage} />
            <Main pages={pages} newpages={newpages} closePage={closePage} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
