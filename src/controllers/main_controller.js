const { dialog } = require('electron');
const path = require('path');
const { app } = require('electron');

const { FROM_MAIN, PROJECT_COLLECTION} = require("../const");
const config = require('../config');

const Datastore = require('nedb');

const SELECT_FILES = 'SELECT_FILES';
const FIND_PROJECT = 'FIND_PROJECT';
const UPDATE_PROJECT = 'UPDATE_PROJECT';

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

  const selectFiles = (contents) => {
    // TODO copy the file to temp folder
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }
      ]
    })
      .then(resp => {
        return sendResp({
          ...resp,
          name: SELECT_FILES,
          contents: checkTabsExisting(
            contents.tabs,
            parsePaths(resp.filePaths)
          )
        })
      })
      .catch((err) => console.log(err));
  }

  switch(props.name) {
    case SELECT_FILES:
      selectFiles(props.contents);
      break;
    case FIND_PROJECT:
      require('../models/nedb').findOne(db, props)
        .then((resp) => {
          if (resp !== null) {
            sendResp({
              name: FIND_PROJECT,
              contents: resp.tabs
            })
          }
        })
        .catch((err) => console.log('findProject', err))
      break;
    case UPDATE_PROJECT:
      require('../models/nedb').update(db, {
        type: 'update',
        contents: props.contents
      });
      break;
    default:
      console.log('event not found', props);
  }
}