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
  const [pages] = useState([createNewPage(), page2]);

  return (
    <Router>
      <div className="window">
        <Header />
        <div className="window-content">
          <div className="pane-group">
            <SideBar list={pages} />
            <Main pages={pages} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
