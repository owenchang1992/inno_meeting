const { dialog } = require('electron');
const path = require('path');

const { FROM_MAIN } = require("../const");

const SELECT_FILES = 'SELECT_FILES';

module.exports = ({win, props}) => {
  const sendResp = (message) => {
    win.webContents.send(FROM_MAIN, message)
  }

  const selectFiles = () => {
    const parsePaths = (filePaths) => filePaths.map((filePath) => ({
      fullPath: filePath,
      basePath: path.basename(filePath),
      routingPath: filePath.replace('C:', '').replace(/\\/g, '/'),
    }));
  
    const updateProject = () => {
    // TODO copy the file to temp folder
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }
      ]
    })
      .then(resp => {
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