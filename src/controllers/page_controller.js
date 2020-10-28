const Datastore = require('nedb');
const path = require('path');
const config = require('../config');

const { app } = require('electron');

const { FROM_CURRENT_PAGE } = require("../const");

const db = new Datastore({
  filename: path.join(
    app.getPath('appData'),
    config.dbPath,
    'pages.db',
  ),
  autoload: true,
});

module.exports = ({win, props}) => {
  const sendResponse = (channel, msg) => {
    win.webContents.send(channel, msg)
  }

  switch(props.dest) {
    case 'local_db':
      require('../models/nedb')[props.type](db, props)
        .then((resp) => sendResponse(
          FROM_CURRENT_PAGE,
          {
            ...props,
            contents: resp,
          }
        ))
        .catch((err) => { console.log(err) })
      break;
  }
};