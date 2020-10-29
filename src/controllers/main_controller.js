const { dialog } = require('electron');
const path = require('path');
const { app } = require('electron');

const { FROM_MAIN } = require("../const");
const config = require('../config');

const Datastore = require('nedb');

const SELECT_FILES = 'SELECT_FILES';
const COLLECTION_NAME = 'projects.db';
const FIND_PROJECT = 'FIND_PROJECT';

const db = new Datastore({
  filename: path.join(
    app.getPath('appData'),
    config.dbPath,
    COLLECTION_NAME,
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

  const checkMediaExisting = (mainList, comparedList) => {
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
    const addImages2Project = (props) => {
      require('../models/nedb')[props.type](db, props)
    }

    // TODO copy the file to temp folder
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }
      ]
    })
      .then(resp => {
        const newList = checkMediaExisting(
          contents.preMediaList,
          parsePaths(resp.filePaths)
        )

        addImages2Project({
          type: 'update',
          collection: COLLECTION_NAME,
          contents: {
            name: props.projectName,
            key:  props.projectName,
            media: newList
          }
        });

        return sendResp({
          ...resp,
          name: SELECT_FILES,
          contents: newList
        })
      })
      .catch((err) => console.log(err));
  }

  const findProject = (props) => {
    console.log('findProject aaa', props);
    require('../models/nedb')[props.type](
      db,
      props
    )
      .then((resp) => {
        console.log('findProject result', resp);
        if (resp !== null) {
          sendResp({
            name: FIND_PROJECT,
            contents: resp.media
          })
        }
      })
      .catch((err) => console.log('findProject', err))
  }

  switch(props.name) {
    case SELECT_FILES:
      selectFiles(props.contents);
      break;
    case FIND_PROJECT:
      findProject({
        type: 'findOne',
        collection: COLLECTION_NAME,
        contents: { name: props.projectName }
      });
      break;
    default:
      console.log('event not found', props);
  }
}