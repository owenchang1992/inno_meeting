import React from 'react';
import { Route } from 'react-router-dom';

import PageLoader from '../components/page_loader';
import Home from '../components/pages/home/home';
import SideBar from './sidebar';

const main = ({ closeTab, tabs }) => {
  console.log('new tab', tabs);
  return (
    <div className="pane">
      <>
        <Route path="/" exact component={() => <Home />} />
        {
          tabs.map((tab) => (
            <Route
              path={tab.routingPath}
              render={(props) => (
                <>
                  <div className="pane-group">
                    <SideBar tabs={tabs} closeTab={closeTab} />
                    <div className="pane">
                      <PageLoader
                        {...props}
                        properties={{ tab, closeTab }}
                      />
                    </div>
                  </div>
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
