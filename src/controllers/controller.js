const Datastore = require('nedb');
const path = require('path');
const config = require('../config');
const { dialog } = require('electron');
const fs_handler = require('../models/fs_handler');

const { app } = require('electron');

const {
  FROM_GENERAL,
  PAGE_COLLECTION,
  LABEL_COLLECTION,
} = require("../const");

const SELECT_FILES = 'SELECT_FILES';

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
    win.webContents.send(channel, msg);
  }

  const getDB = (props) => (
    props.type === 'pages'
      ? db.page
      : db.label
  )

  const selectFiles = (props) => {
    return dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }]
    })
      .then(resp => {
        if (!resp.canceled) {
          return sendResponse(
            FROM_GENERAL, 
            {
              ...props,
              contents: resp.filePaths
            }
          );
        }
      })
      .catch((err) => console.log(err));
  }

  if (props.name === SELECT_FILES) {
    selectFiles(props);
  } else {
    require('../models/nedb')[props.name](getDB(props), props)
      .then((resp) => {
        const mediaStorePath = path.join(
          app.getPath('appData'),
          config.appPath,
          'media_store'
        );

        if (props.type === 'pages' && props.name === 'update' && resp.src) {
          if (resp.src.length !== 0) {
            return fs_handler.copyFiles(resp.src, mediaStorePath);
          };
        } else if (props.type === 'pages' && props.name === 'find') {
          return fs_handler.copyFiles(resp.map((page) => page.src), mediaStorePath);
        }

        sendResponse(
          FROM_GENERAL,
          {
            ...props,
            contents: resp,
          }
        );
      })
      .catch((err) => { console.log(err) })
  }
};