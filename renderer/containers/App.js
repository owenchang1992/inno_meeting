import React, { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import '../assets/css/photon.css';

import Main from './main_pane';
import Header from './header';
import SideBar from './sidebar';

/**
 * name: the name for listing at sideBar
 * type:
 */
const createNewPage = () => ({
  name: 'page 1',
  state: 'show',
  type: 'image_editor',
  routingPath: '/page1',
  path: '../conponents/image_editor',
  fileName: 'index.js',
  props: {},
});

const page2 = {
  name: 'page 2',
  state: 'show',
  type: 'image_editor',
  routingPath: '/page2',
  path: '../conponents/image_editor',
  fileName: 'index.js',
  props: {},
};

const App = () => {
  const [pages, setPages] = useState([createNewPage()]);
  const addPage = (page) => {
    setPages(pages.concat([page]));
  };

  return (
    <Router>
      <div className="window">
        <Header />
        <div className="window-content">
          <div className="pane-group">
            <SideBar addPage={() => addPage(page2)} />
            <Main pages={pages} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
