const Datastore = require('nedb');
const path = require('path');
const config = require('../config');

const { app } = require('electron');

const { FROM_GENERAL, PAGE_COLLECTION, LABEL_COLLECTION } = require("../const");

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
    props.type === 'pages'
      ? db.page
      : db.label
  )

  require('../models/nedb')[props.name](getDB(props), props)
    .then((resp) => sendResponse(
      FROM_GENERAL,
      {
        ...props,
        contents: resp,
      }
    ))
    .catch((err) => { console.log(err) })
};