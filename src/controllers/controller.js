const Datastore = require('nedb');
const path = require('path');
const config = require('../config');
const { dialog } = require('electron');
const {
  syncMediaStore,
  copyFiles,
  createFolder,
  writeFile,
} = require('../models/fs_handler');

const { app } = require('electron');

const {
  FROM_GENERAL,
  PAGE_COLLECTION,
  LABEL_COLLECTION,
} = require("../const");

const SELECT_FILES = 'SELECT_FILES';
const EXPORT_PROJECT = 'EXPORT_PROJECT';

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

  const exportProject = async () => {
    try {
      let dest = await dialog.showSaveDialog({
        title: 'Export Destination',
        buttonLabel: 'Export',
        properties: ['openDirectory']
      })

      if (dest.canceled === false) {
        let dbPage = await require('../models/nedb').find(db.page, {})
        await createFolder(dest.filePath);
        await syncMediaStore(dbPage, dest.filePath);
        let dblabel = await require('../models/nedb').find(db.label, {});
    
        writeFile(path.join(dest.filePath, 'pages.json'), JSON.stringify(dbPage));
        writeFile(path.join(dest.filePath, 'labels.json'), JSON.stringify(dblabel));
      }
    } catch (error) {
      console.log('dest', dest.filePath);
      console.log('dbPage', JSON.stringify(dbPage));
      console.log('dblabel', JSON.stringify(dblabel));
      throw error;
    }
  }

  switch(props.name) {
    case SELECT_FILES:
      return selectFiles(props);
    case EXPORT_PROJECT:
      return exportProject();
    default:
      require('../models/nedb')[props.name](getDB(props), props)
        .then((resp) => {
          const mediaStorePath = path.join(
            app.getPath('appData'),
            config.appPath,
            'media_store',
          );
          
          sendResponse(
            FROM_GENERAL,
            {
              ...props,
              contents: resp,
            }
          );

          if (props.type === 'pages' && props.name === 'update' && resp.src) {
            if (resp.src.length !== 0) {
              copyFiles(resp.src, mediaStorePath);
            };
          } else if (props.type === 'pages' && props.name === 'find') {
            syncMediaStore(resp, mediaStorePath);
          }
        })
        .catch((err) => { console.log(err) })
  }
};