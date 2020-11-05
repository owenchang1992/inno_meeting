const { dialog } = require('electron');
const path = require('path');
const { app } = require('electron');

const {
  FROM_MAIN,
  PROJECT_COLLECTION
} = require("../const");

const {
  copyFiles,
  createFolder
} = require("../models/project_handler");

const config = require('../config');

const Datastore = require('nedb');

const SELECT_FILES = 'SELECT_FILES';
const FIND_ONE = 'FIND_ONE';
const UPDATE = 'UPDATE';
const EXPORT_PROJECT = 'EXPORT_PROJECT';

const db = new Datastore({
  filename: path.join(
    app.getPath('appData'),
    config.dbPath,
    PROJECT_COLLECTION,
  ),
  autoload: true,
});

module.exports = ({win, props}) => {
  const sendResp = (message) => {
    win.webContents.send(FROM_MAIN, message)
  }

  const parsePaths = (filePaths) => filePaths.map((filePath) => ({
    src: filePath,
    name: path.basename(filePath),
    routingPath: filePath.replace('C:', '').replace(/\\/g, '/'),
  }));

  const checkTabsExisting = (mainList, comparedList) => {
    const newList = comparedList.reduce(
      (accumulator, item) => {
        const index = mainList.findIndex(
          (main) => (main.src === item.src),
        );
  
        if (index === -1) accumulator.push(item);
        return accumulator;
      },
      []
    )

    return [
      ...mainList,
      ...newList,
    ]
  }

  switch(props.name) {
    case SELECT_FILES:
      dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
        filters: [
          { name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }
        ]
      })
        .then(resp => {
          if (!resp.canceled) {
            return sendResp({
              ...props,
              contents: {
                tabs: checkTabsExisting(
                  props.contents.tabs,
                  parsePaths(resp.filePaths)
                )
              }
            })
          }
        })
        .catch((err) => console.log(err));
      break;
    case FIND_ONE:
      require('../models/nedb').findOne(db, props)
        .then((resp) => {
          sendResp({
            ...props,
            contents: resp
          })
        })
        .catch((err) => console.log('findProject', err))
      break;
    case UPDATE:
      require('../models/nedb').update(db, props);
      break;
    case EXPORT_PROJECT:
      Promise.all([
        dialog.showSaveDialog({ title: 'Export Project' }),
        require('../models/nedb').findOne(db, props)
      ])
        .then((resp) => {
          if (!resp[0].canceled) {
            return createFolder(resp[0].filePath)
              .then(() => copyFiles(resp[1].tabs, resp[0].filePath))
              .catch((err) => console.log('Export error', err))
          }
        })
      break;
    default:
      console.log('event not found', props);
  }
}