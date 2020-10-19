import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import Wrapper from './containers/wrapper';

ReactDom.render(
  <Router>
    <Wrapper />
  </Router>,
  document.getElementById('root'),
);
