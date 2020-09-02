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

let counter = 1;

const createNewPage = () => {
  console.log(counter);
  counter += 1;
  return ({
    name: `Page ${counter}`,
    state: 'show',
    type: 'image_editor',
    routingPath: `/page${counter}`,
    path: '../conponents/image_editor',
    fileName: 'index.js',
    props: {
      imagePath: '67B70A8E-C389-4660-BEC3-8C39E8082287_1_105_c.jpeg',
    },
  });
};

const page1 = {
  name: 'page 1',
  state: 'show',
  type: 'image_editor',
  routingPath: '/page1',
  path: '../conponents/image_editor',
  fileName: 'index.js',
  props: {
    imagePath: '67B70A8E-C389-4660-BEC3-8C39E8082287_1_105_c.jpeg',
  },
};

const App = () => {
  const [pages, setPages] = useState([page1]);
  const addPage = (page) => {
    setPages(pages.concat([page]));
  };

  return (
    <Router>
      <div className="window">
        <Header />
        <div className="window-content">
          <div className="pane-group">
            <SideBar addPage={() => addPage(createNewPage())} />
            <Main pages={pages} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
