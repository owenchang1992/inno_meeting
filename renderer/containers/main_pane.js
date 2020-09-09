import React from 'react';
import { Route } from 'react-router-dom';

import LoadPage from '../components/page_list';
import Tabs from '../components/tabs';

const main = ({ closePage, pages }) => {
  console.log('new page', pages);
  return (
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
};

export default main;
