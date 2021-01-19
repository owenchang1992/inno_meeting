import React from 'react';
import { Route } from 'react-router-dom';

import PageLoader from '../components/page_loader';
import Home from '../components/pages/home/home';
import SideBar from './sidebar';

const MainContent = ({ tabs, closeTab, sideBarTab }) => (
  <div className="pane">
    <div className="pane-group">
      <Route path="/" exact component={() => <Home />} />
      {
        tabs.map((tab) => (
          <Route
            path={tab.routingPath}
            render={(props) => (
              <>
                <SideBar tabs={sideBarTab} closeTab={closeTab} />
                <div className="pane">
                  <PageLoader
                    {...props}
                    properties={{ tab, closeTab }}
                  />
                </div>
              </>
            )}
          />
        ))
      }
    </div>
  </div>
);

export default MainContent;
