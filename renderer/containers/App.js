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

// let counter = 1;

// const createNewPage = () => {
//   counter += 1;
//   return ({
//     name: `Page ${counter}`,
//     type: 'image_editor',
//     routingPath: `/page${counter}`,
//     props: {
//       imagePath: '67B70A8E-C389-4660-BEC3-8C39E8082287_1_105_c.jpeg',
//     },
//   });
// };

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
  const addPage = (page) => {
    setPages(pages.concat([page]));
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
            <Main pages={pages} closePage={closePage} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
