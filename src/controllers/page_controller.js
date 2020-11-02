const Datastore = require('nedb');
const path = require('path');
const config = require('../config');

const { app } = require('electron');

const { FROM_CURRENT_PAGE, PAGE_COLLECTION, LABEL_COLLECTION } = require("../const");

const db = {};
db.page = new Datastore({
  filename: path.join(
    app.getPath('appData'),
    config.dbPath,
    PAGE_COLLECTION,
  ),
  autoload: true,
});

db.label = new Datastore({
  filename: path.join(
    app.getPath('appData'),
    config.dbPath,
    LABEL_COLLECTION,
  ),
  autoload: true,
});

module.exports = ({win, props}) => {
  const sendResponse = (channel, msg) => {
    win.webContents.send(channel, msg)
  }

  const getDB = (props) => (
    props.collection === 'pages'
      ? db.page
      : db.label
  )

  switch(props.dest) {
    case 'local_db':
      require('../models/nedb')[props.type](getDB(props), props)
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