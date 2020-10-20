const Datastore = require('nedb');
const path = require('path');
const { app } = require('electron');


module.exports = ({win, props}) => {
  const sendResponse = (msg) => {
    // console.log('msg', msg);
    win.webContents.send('fromCurrentPage', msg)
  }

  const getCollection = (collectionName) => {
    return new Datastore({
      filename: path.join(
        app.getPath('appData'),
        'media_tagger/db',
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
        .then((resp) => sendResponse({
          ...props,
          contents: resp
        }))
        .catch((err) => { console.log(err) })
      break;
  }
};