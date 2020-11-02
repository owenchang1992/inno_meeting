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

        return sendResp({
          ...resp,
          name: SELECT_FILES,
          contents: newList
        })
      })
      .catch((err) => console.log(err));
  }

  const findProject = (props) => {
    require('../models/nedb')[props.type](
      db,
      props
    )
      .then((resp) => {
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
        collection: PROJECT_COLLECTION,
        contents: { name: props.projectName }
      });
      break;
    case UPDATE_PROJECT:
      require('../models/nedb').update(db, {
        type: 'update',
        collection: PROJECT_COLLECTION,
        contents: {
          name: props.projectName,
          key:  props.projectName,
          media: props.contents
        }
      });
      break;
    default:
      console.log('event not found', props);
  }
}