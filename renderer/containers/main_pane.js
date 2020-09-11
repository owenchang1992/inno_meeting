import React from 'react';
import { Route } from 'react-router-dom';

import LoadPage from '../components/page_list';
import Tabs from '../components/tabs';

const main = ({ closePage, pages, store }) => {
  console.log('new page', pages);
  return (
    <div className="pane">
      <>
        <Route path="/" exact component={() => <h1>Home Page asb</h1>} />
        {
          pages.map((page) => (
            <Route
              path={page.routingPath}
              component={() => (
                <>
                  <Tabs pages={pages} closePage={closePage} />
                  {LoadPage(page, store)}
                </>
              )}
            />
          ))
        }
      </>
    </div>
  );
};

export default main;
