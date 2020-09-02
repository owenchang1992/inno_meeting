import React from 'react';
import { Route } from 'react-router-dom';

// import ImageEditor from '../components/pages/image_editor/image_editor';
import LoadPage from '../components/page_list';
// import Page2 from '../components/page2';
import Tabs from '../components/tabs';

const main = ({ pages, closePage }) => (
  <div className="pane">
    <Tabs pages={pages} closePage={closePage} />
    <>
      <Route path="/" exact component={() => <h1>Home Page asb</h1>} />
      {
        pages.map((page) => (
          <Route
            path={page.routingPath}
            component={() => LoadPage(page)}
          />
        ))
      }
    </>
  </div>
);

export default main;
