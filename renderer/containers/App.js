import React from 'react';
import { Route, Link, HashRouter as Router } from 'react-router-dom';
import '../sources/css/photon.css';

import Page1 from '../components/page1';
import Page2 from '../components/page2';

const App = () => (
  <Router>
    <div className="window">
      <div className="window-content">
        <div className="pane-group">
          <div className="pane-sm sidebar">
            <ul>
              {[1, 2].map((number) => (
                <li key={number}>
                  <Link to={`/page${number}`}>
                    {`Page ${number}`}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="pane">
            <>
              <Route path="/" exact component={() => <h1>Home Page asb</h1>} />
              <Route path="/page1" component={Page1} />
              <Route path="/page2" component={Page2} />
            </>
          </div>
        </div>
      </div>
    </div>
  </Router>
);

export default App;
