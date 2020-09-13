import React from 'react';
import { Route } from 'react-router-dom';

import PageLoader from '../components/page_loader';
import Tabs from '../components/tabs';

const main = ({ closePage, pages, store }) => {
  console.log('new page', pages);
  return (
    <div className="pane">
      <>
        <Route path="/" exact component={() => <h1>Home Page fsb</h1>} />
        {
          pages.map((page) => (
            <Route
              path={page.routingPath}
              render={(props) => (
                <>
                  <Tabs {...props} pages={pages} closePage={closePage} />
                  <PageLoader
                    {...props}
                    type={page.type}
                    properties={{ page, store, closePage }}
                  />
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
