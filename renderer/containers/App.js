import React, { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import '../assets/css/photon.css';

import Main from './main_pane';
import Header from './header';
import SideBar from './sidebar';

const testPageList = ['page1', 'page2'];

const App = () => {
  const [pages] = useState(testPageList);

  return (
    <Router>
      <div className="window">
        <Header />
        <div className="window-content">
          <div className="pane-group">
            <SideBar list={pages} />
            <Main />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
