import React from 'react';
import { Route, Link, HashRouter } from 'react-router-dom';

import Page1 from '../components/page1';
import Page2 from '../components/page2';

const App = () => (
  <HashRouter>
    <>
      <Route path="/" exact component={() => <h1>Home Page asb</h1>} />
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />
    </>

    <ul>
      {[1, 2].map((number) => (
        <li key={number}>
          <Link to={`/page${number}`}>
            {`Page ${number}`}
          </Link>
        </li>
      ))}
    </ul>
  </HashRouter>
);

export default App;
