import React from 'react';
import { Route } from 'react-router-dom';

import PageLoader from '../components/page_loader';
import Home from '../components/pages/home/home';
import SideBar from './sidebar';

const MainContent = ({ pages, closeTab }) => (
  <div className="pane">
    <div className="pane-group">
      <Route path="/" exact component={() => <Home />} />
      {
        pages.map((page) => (
          <Route
            path={page.key}
            render={(props) => (
              <>
                <SideBar pages={pages} closeTab={closeTab} />
                <div className="pane">
                  <PageLoader
                    {...props}
                    properties={{ page, closeTab }}
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
