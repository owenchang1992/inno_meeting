const { dialog } = require('electron');
const path = require('path');

const { FROM_MAIN } = require("../const");

const FROM_SELECT_FILE_DIALOG = 'select-file-dialog';

module.exports = ({win, props}) => {
  const sendResp = (message) => {
    win.webContents.send(FROM_MAIN, message)
  }

  const selectFiles = () => {
    const parsePaths = (filePaths) => {
      return filePaths.map((filePath) => ({
        fullPath: filePath,
        basePath: path.basename(filePath),
        routingPath: filePath.replace('C:', '').replace(/\\/g, '/'),
      }))
    };

    // TODO copy the file to temp folder
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }
      ]
    })
      .then(resp => sendResp({
        ...resp,
        name: FROM_SELECT_FILE_DIALOG,
        filePaths: parsePaths(resp.filePaths)
      }))
      .catch((err) => console.log(err));
  }

  switch(props) {
    case FROM_SELECT_FILE_DIALOG:
      selectFiles();
      break;
    default:
      console.log('event not found');
  }
}