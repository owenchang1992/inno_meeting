import React from 'react';
import { Route } from 'react-router-dom';

import PageLoader from '../components/page_loader';
import Tabs from '../components/tabs';

const main = ({ closeTab, tabs }) => {
  console.log('new tab', tabs);
  return (
    <div className="pane">
      <>
        <Route path="/" exact component={() => <h1>Home Page fsb</h1>} />
        {
          tabs.map((tab) => (
            <Route
              path={tab.routingPath}
              render={(props) => (
                <>
                  <Tabs {...props} tabs={tabs} closeTab={closeTab} />
                  <PageLoader
                    {...props}
                    properties={{ tab, closeTab }}
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
