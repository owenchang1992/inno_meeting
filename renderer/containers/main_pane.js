import React from 'react';
import { Route } from 'react-router-dom';

import ImageEditor from '../components/pages/image_editor/image_editor';
// import Page2 from '../components/page2';
import Tabs from '../components/tabs';

const main = ({ pages }) => (
  <div className="pane">
    <Tabs pages={pages} />
    <>
      <Route path="/" exact component={() => <h1>Home Page asb</h1>} />
      {
        pages.map((page) => (
          <Route
            path={page.routingPath}
            component={() => (
              <ImageEditor
                imagePath="67B70A8E-C389-4660-BEC3-8C39E8082287_1_105_c.jpeg"
              />
            )}
          />
        ))
      }
    </>
  </div>
);

export default main;
