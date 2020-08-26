import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import '../sources/css/photon.css';

import Main from './main_pane';
import SideBar from './sidebar';

const App = () => (
  <Router>
    <div className="window">
      <div className="window-content">
        <div className="pane-group">
          <SideBar />
          <Main />
        </div>
      </div>
    </div>
  </Router>
);

export default App;
