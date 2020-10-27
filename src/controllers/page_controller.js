const Datastore = require('nedb');
const path = require('path');
const config = require('../config');

const { app } = require('electron');

const { FROM_CURRENT_PAGE } = require("../const");

module.exports = ({win, props}) => {
  const sendResponse = (channel, msg) => {
    win.webContents.send(channel, msg)
  }

  const getCollection = (collectionName) => {
    // console.log(path.join(
    //   app.getPath('appData'),
    //   'media_tagger/db',
    //   `${collectionName}.db`,
    // ));
    return new Datastore({
      filename: path.join(
        app.getPath('appData'),
        config.dbPath,
        `${collectionName}.db`,
      ),
      autoload: true,
    })
  }

  console.log(props);

  switch(props.name) {
    case 'local_db':
      require('../models/nedb')[props.type](
        getCollection(props.collection),
        props,
      )
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