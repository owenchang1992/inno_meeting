const { dialog } = require('electron');
const path = require('path');
const { app } = require('electron');

const { FROM_MAIN } = require("../const");
const config = require('../config');

const Datastore = require('nedb');

const SELECT_FILES = 'SELECT_FILES';
const COLLECTION_NAME = 'projects.db';

module.exports = ({win, props}) => {
  const sendResp = (message) => {
    win.webContents.send(FROM_MAIN, message)
  }

  const getCollection = (collectionName) => {
    return new Datastore({
      filename: path.join(
        app.getPath('appData'),
        config.dbPath,
        collectionName,
      ),
      autoload: true,
    })
  }

  const selectFiles = () => {
    const parsePaths = (filePaths) => filePaths.map((filePath) => ({
      fullPath: filePath,
      basePath: path.basename(filePath),
      routingPath: filePath.replace('C:', '').replace(/\\/g, '/'),
    }));
  
    const updateProject = (props) => {
      require('../models/nedb')[props.type](
        getCollection(props.collection),
        props
      )
    }

    // TODO copy the file to temp folder
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }
      ]
    })
      .then(resp => {
        updateProject({
          type: 'update',
          collection: COLLECTION_NAME,
          contents: {
            name: props.projectName,
            key:  props.projectName,
            media: resp.filePaths
          }
        });
        sendResp({
          ...resp,
          name: SELECT_FILES,
          filePaths: parsePaths(resp.filePaths)
        })
      })
      .catch((err) => console.log(err));
  }

  switch(props.name) {
    case SELECT_FILES:
      selectFiles();
      break;
    default:
      console.log('event not found');
  }
}