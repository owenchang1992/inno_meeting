const { dialog } = require('electron');
const path = require('path');
const { app } = require('electron');

const {
  TO_MAIN,
  FROM_MAIN,
  TO_GENERAL,
  FROM_GENERAL,
  PROJECT_COLLECTION
} = require("../const");

const config = require('../config');

const Datastore = require('nedb');

const SELECT_FILES = 'SELECT_FILES';
const FIND_ONE = 'FIND_ONE';
const UPDATE = 'UPDATE';

const db = new Datastore({
  filename: path.join(
    app.getPath('appData'),
    config.dbPath,
    PROJECT_COLLECTION,
  ),
  autoload: true,
});

module.exports = ({win, props, channel}) => {
  const sendResp = (message) => {
    const getRespChannel = (channel) => {
      switch(channel) {
        case TO_MAIN: 
          return FROM_MAIN;
        case TO_GENERAL:
          return FROM_GENERAL;
        default:
          console.log('Some thing error')
      }
    }

    win.webContents.send(getRespChannel(channel), message)
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
          return sendResp({
            ...props,
            contents: {
              tabs: checkTabsExisting(
                props.contents.tabs,
                parsePaths(resp.filePaths)
              )
            }
          })
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
    default:
      console.log('event not found', props);
  }
}