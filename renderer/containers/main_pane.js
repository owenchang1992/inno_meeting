import React from 'react';
import { Route } from 'react-router-dom';

import Page1 from '../components/page1';
import Page2 from '../components/page2';

const Main = () => (
  <div className="pane">
    <>
      <Route path="/" exact component={() => <h1>Home Page asb</h1>} />
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />
    </>
  </div>
);

export default Main;
