import React from 'react';
import { Route } from 'react-router-dom';

import LoadPage from '../components/page_list';
import Tabs from '../components/tabs';

const main = ({ closePage, newpages }) => {
  console.log('new page', newpages);
  return (
    <div className="pane">
      <Tabs pages={newpages} closePage={closePage} />
      <>
        <Route path="/" exact component={() => <h1>Home Page asb</h1>} />
        {
          newpages.map((page) => (
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
