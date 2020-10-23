const Datastore = require('nedb');
const path = require('path');
const config = require('../config');

const { app } = require('electron');

module.exports = ({win, props}) => {
  const sendResponse = (channel, msg) => {
    win.webContents.send(channel, msg)
  }

  const getCollection = (collectionName) => {
    return new Datastore({
      filename: path.join(
        app.getPath('appData'),
        config.dbPath,
        `${collectionName}.db`,
      ),
      autoload: true,
    })
  }

  switch(props.name) {
    case 'local_db':
      require('../models/nedb')[props.type](
        getCollection(props.collection),
        props,
      )
        .then((resp) => sendResponse(
          'fromCurrentPage',
          {
            ...props,
            contents: resp,
          }
        ))
        .catch((err) => { console.log(err) })
      break;
  }
};